import React, { useState } from 'react';
import MultipleValueTextInput from 'react-multivalue-text-input';

import ColorPicker from './ColorPicker';
import EmailEditor from './EmailEditor';

import './SenditForm.css';

function SenditForm() {
    // is this how I want to implement this form?
    // isn't there some email thingy I can use
    // button state 'discard' is submitted whenever enter is pressed
    // either save after refresh or make a warning box before refreshing

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [to, setTo] = useState(['songk@mit.edu']);
    const [cc, setCC] = useState([]);
    const [tag, setTag] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [bodyHTML, setBodyHTML] = useState('');
    const [bctalk, setBCTalk] = useState('');
    const [color, setColor] = useState('#000000');
    const [button, setButton] = useState('none');
    const tagOptions = [
        'club',
        'course',
        'event',
        'job',
        'advertisement',
        'survey',
        'other'
    ]

    /*
    current dummy mailing lists:
     * dormit-devtest-next (I'm a member)
     * dormit-devtest-sponge
     * dormit-devtest-maseeh -- send separately
     * dormit-sender
    */

    function handleToAdd(newEmail, allItems) {
        // email validation, required fields, etc.
        setTo(allItems);
    }

    function handleToDel(delEmail, allItems) {
        setTo(allItems);
    }

    function handleCCAdd(newEmail, allItems) {
        // email validation, required fields, etc.
        setCC(allItems);
    }

    function handleCCDel(delEmail, allItems) {
        setCC(allItems);
    }

    function handleBodyChange(html) {
        setBodyHTML(html);
        setBodyText(html);
    }
    
    function handleSubmit(event) {
        console.log(button);
        // submit
        if (button === 'send') {
            // default subject
            if (subject === '') {
                setSubject(title);
            }
            // default recepients
            
            // placeholder until I figure out how to send emails
            // also I think the time it takes to change subject is more than the time it takes to do all these console.logs
            console.log(title);
            console.log(subject);
            console.log(cc);
            console.log(tag);
            console.log(bodyText);
            console.log(bodyHTML);
            console.log(bctalk);
            console.log(color);
        }
        else if (button === 'discard') {
            if (confirm('are you sure you want to discard?')) {
                console.log('discarded');
            }
        }
        
        event.preventDefault();
    }

    if (window.innerWidth <= 480) {
        return (
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-column-container'>
                <div className='form-column'>
                    <label className='form-field'>
                        title
                        <input
                            className='form-input' 
                            name='title' 
                            type='text' 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className='form-field'>
                        subject (set to title if blank)
                        <input 
                            className='form-input' 
                            name='subject' 
                            type='text' 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} />
                    </label>
                    <label className='form-field'>
                        to
                        <MultipleValueTextInput
                            className='form-input'
                            onItemAdded={(item, allItems) => handleToAdd(item, allItems)}
                            onItemDeleted={(item, allItems) => handleToDel(item, allItems)}
                            name='to'
                            charCodes={[32]}
                            placeholder="separate emails with SPACE"
                            values={['songk@mit.edu']}
                        />
                    </label>
                    
                    <label className='form-field'>
                        cc
                        <MultipleValueTextInput
                            className='form-input'
                            onItemAdded={(item, allItems) => handleCCAdd(item, allItems)}
                            onItemDeleted={(item, allItems) => handleCCDel(item, allItems)}
                            name='cc'
                            charCodes={[32]}
                            placeholder="separate emails with SPACE"
                        />
                    </label>
                    <label className='form-field'>
                        type of dormspam
                        {tagOptions.map(tag => {
                            return (
                            <div id={`sendit-tag-${tag}`} className='form-radio'>
                                <input
                                    className='form-input'
                                    key={tag}
                                    name='tag' 
                                    type='radio' 
                                    value={tag}
                                    checked={tag === tag}
                                    onChange={e => setTag(e.target.value)} />
                                {tag}
                            </div>
                            )
                        })}
                    </label>
                    <label className='form-field'>
                        color name for bc-talk
                            <input 
                                className='form-input' 
                                name='bctalk' 
                                type='text' 
                                value={bctalk} 
                                onChange={e => setBCTalk(e.target.value)} />
                    </label>
                    <label className='form-field'>
                        color of bc-talk text
                        <ColorPicker 
                            colors={['#000', '#023bff', '#f821ff', '#8011dd', '#999999', '#ee0000', '#17901c', '#ff8000', '#ffee00']}
                            color={color}
                            onChange={e => setColor(e.hex)}/>
                    </label>
                    {/* <label className='form-field'>
                        attach file
                        <input id='sendit-file' 
                        name='file' 
                        type='file' />
                    </label> */}
                </div>
                </div>
                <div className='sendit-body-container'>
                    <label className='form-field'>
                            body
                            <EmailEditor 
                                className='sendit-body-editor'
                                onChange={html => handleBodyChange(html)} />
                    </label>
                </div>
                <div className='sendit-action-buttons'>
                    <button 
                        className='action-button sendit-discard' 
                        name='discard'
                        type='submit'
                        onClick={() => setButton('discard')}>
                        discard</button>
                    <button 
                        className='action-button sendit-savedraft' 
                        name='savedraft'
                        type='submit'
                        onClick={e => setButton('savedraft')}>
                        save draft</button>
                    <button 
                        className='action-button sendit-submit' 
                        name='send'
                        type='submit'
                        onClick={e => setButton('send')}>
                        send dormspam</button>
                </div>
            </form>
            </div>
        );
    }
    return (
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div className='form-column-container sendit-column-container-desktop'>
            <div id='sendit-col1' className='form-column'>
                <label className='form-field'>
                    title
                    <input
                        className='form-input' 
                        name='title' 
                        type='text' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} />
                </label>
                <label className='form-field'>
                    subject (set to title if blank)
                    <input 
                        className='form-input' 
                        name='subject' 
                        type='text' 
                        value={subject} 
                        onChange={e => setSubject(e.target.value)} />
                </label>
                <label className='form-field'>
                    to
                    <MultipleValueTextInput
                        className='form-input'
                        onItemAdded={(item, allItems) => handleToAdd(item, allItems)}
                        onItemDeleted={(item, allItems) => handleToDel(item, allItems)}
                        name='to'
                        charCodes={[32]}
                        placeholder="separate emails with SPACE"
                        values={['songk@mit.edu']}
                    />
                </label>
                
                <label className='form-field'>
                    cc
                    <MultipleValueTextInput
                        className='form-input'
                        onItemAdded={(item, allItems) => handleCCAdd(item, allItems)}
                        onItemDeleted={(item, allItems) => handleCCDel(item, allItems)}
                        name='cc'
                        charCodes={[32]}
                        placeholder="separate emails with SPACE"
                    />
                </label>
            </div>
            <div id='sendit-col2' className='form-column'>
                <label className='form-field'>
                    type of dormspam
                    {tagOptions.map(tag => {
                        return (
                        <div id={`sendit-tag-${tag}`} className='form-radio'>
                            <input
                                className='form-input'
                                key={tag}
                                name='tag' 
                                type='radio' 
                                value={tag}
                                checked={tag === tag}
                                onChange={e => setTag(e.target.value)} />
                            {tag}
                        </div>
                        )
                    })}
                </label>
                <label className='form-field'>
                    color name for bc-talk
                        <input 
                            className='form-input' 
                            name='bctalk' 
                            type='text' 
                            value={bctalk} 
                            onChange={e => setBCTalk(e.target.value)} />
                </label>
                <label className='form-field form-field-color'>
                    color of bc-talk text
                    <ColorPicker 
                        colors={['#000', '#023bff', '#f821ff', '#8011dd', '#999999', '#ee0000', '#17901c', '#ff8000', '#ffee00']}
                        color={color}
                        onChange={e => setColor(e.hex)}/>
                </label>
                {/* <label className='form-field'>
                    attach file
                    <input id='sendit-file' 
                    name='file' 
                    type='file' />
                </label> */}
            </div>
            </div>
            <div className='sendit-body-container'>
                <label className='form-field'>
                        body
                        <EmailEditor 
                            className='sendit-body-editor'
                            onChange={html => handleBodyChange(html)} />
                </label>
            </div>
            <div className='sendit-action-buttons'>
                <button 
                    className='action-button sendit-discard' 
                    name='discard'
                    type='submit'
                    onClick={() => setButton('discard')}>
                    discard</button>
                <button 
                    className='action-button sendit-savedraft' 
                    name='savedraft'
                    type='submit'
                    onClick={e => setButton('savedraft')}>
                    save draft</button>
                <button 
                    className='action-button sendit-submit' 
                    name='send'
                    type='submit'
                    onClick={e => setButton('send')}>
                    send dormspam</button>
            </div>
        </form>
        </div>
    );
}

export default SenditForm;