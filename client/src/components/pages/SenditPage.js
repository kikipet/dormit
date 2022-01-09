import React, { Component } from 'react';

import SenditForm from '../modules/SenditForm';

class SenditPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='sendit' className='page-container'>
                <h1 id='findit-title' className='page-title'>sendit</h1>
                <SenditForm />
            </div>
        );
    }
}

export default SenditPage;
