import imaplib
import email
from email.header import decode_header
import re
import html2text
import datetime as dt
import pymongo
import markdown
import os
from dotenv import load_dotenv

# get env variables
load_dotenv()

# login to email account, get emails in bulk
imap = imaplib.IMAP4_SSL("imap.gmail.com")
imap.login(os.environ.get('GET_USER'), os.environ.get('GET_PASS'))

imap.select('Dormspam')
retcode, messages = imap.search(None, '(UNSEEN)')
numMessages = len(messages[0].split())

h = html2text.HTML2Text()
h.ignore_links = False

if numMessages > 0:
    # get emails
    dataInput = []
    for i in range(numMessages, 0, -1):
        res, message = imap.fetch(str(i), '(RFC822)')
        textHTML = ""
        body = ""
        for response in message:
            if isinstance(response, tuple):
                msg = email.message_from_bytes(response[1])
                subject, encoding = decode_header(msg["Subject"])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode('cp437')
                sender, encoding = decode_header(msg.get("From"))[0]
                dateSent, encoding = decode_header(msg.get('Date'))[0]
                if isinstance(sender, bytes):
                    sender = sender.decode('cp437')
                if msg.is_multipart():
                    for part in msg.walk():
                        try:
                            body = part.get_payload(decode=True).decode()
                        except:
                            pass
                else:
                    body = msg.get_payload(
                        decode=True).decode(encoding='cp437')

        try:
            authorEmailString = re.search(' <.*$', sender)[0]
            authorEmail = authorEmailString[2:-1]
            sender = sender[:sender.find(authorEmailString)]
        except:
            authorEmail = ''
        plaintext = h.handle(body)
        plaintext = re.sub('(\\n>)+', '\\n', plaintext)
        plaintext = re.sub('(\\n)+', '\\n', plaintext)
        textHTML = markdown.markdown(plaintext)
        textHTML = re.sub('\\n', ' ', textHTML)
        dateSent = dt.datetime.strptime(dateSent, '%a, %d %b %Y %H:%M:%S %z')
        try:
            # this isn't perfect but it's close
            bctalkString = re.search(
                '(,|;|(<br />)|dorms)(?!.*(,|;|(<br />)|dorms)) .*\\b( for bc-talk)', plaintext)[0]
            bctalk = bctalkString[2:bctalkString.find(' for bc-talk')]
        except:
            bctalk = ''

        dataDict = {}
        dataDict['title'] = subject
        dataDict['author'] = sender
        dataDict['address'] = authorEmail
        dataDict['date'] = dateSent
        dataDict['body'] = textHTML
        dataDict['bctalk'] = bctalk
        dataDict['tag'] = ''
        dataInput.append(dataDict)

    # connect to mongodb
    myclient = pymongo.MongoClient(os.environ.get('DB_CONNECT_URL'))
    mydb = myclient["dormit"]
    mycol = mydb["dormspams"]
    x = mycol.insert_many(dataInput)

# logout
imap.close()
imap.logout()
