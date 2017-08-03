import React from 'react';
import './App.css';

class Conversation extends React.Component {
    constructor(props) {
        super(props);

        //this.state = { name: 'Your Name Here'};

        this.handleConversation = this.handleConversation.bind(this);
    }


    handleConversation = (e) => {
        e.preventDefault();
        const conversation = e.target.value;
        this.props.onChange(conversation);
    };

    render() {
        return (
            <div >

                <div className="joinRoom">
                    <label className="item" >Enter Name of Conversation</label>
                    <input
                        className="signInInput"
                        onChange={this.handleConversation}
                        type="text"
                    />

                </div>


            </div>
        );
    }
}




export default Conversation;