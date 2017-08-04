import React, { Component } from 'react';


class ChatList extends Component {
    constructor(props) {
        super(props);

        //this.state = { name: 'Your Name Here'};

        this.handleJoinChat = this.handleJoinChat.bind(this);
    }


    handleJoinChat = (e) => {
        e.preventDefault();
        const conversation = e.target.value;
        this.props.onChange(conversation);
    };

    render() {
        return (
            <div className="chatList">
                <label className="item">Choose an Existing Chat</label>
                <select
                    id="great-names"
                    onChange={this.handleJoinChat}>
                    {

                        this.props.messages.map( message =>
                            <option key={message.id}>
                                {message.text[3]}
                            </option>)
                    }


                    <option value="MattChat">MattChat</option>
                    <option value="Chat">Chat</option>
                    <option value="Chit Chat">Chit Chat</option>
                </select>

            </div>
        );
    }
}

export default ChatList;