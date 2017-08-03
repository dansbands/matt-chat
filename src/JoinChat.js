import React from 'react';
import './App.css';

class JoinChat extends React.Component {
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
            <div >

                <div className="joinRoom">
                    <label className="item" >Enter Name of Chat Room</label>
                    <input
                        className="signInInput"
                        onChange={this.handleJoinChat}
                        type="text"
                    />

                </div>


            </div>
        );
    }
}




export default JoinChat;