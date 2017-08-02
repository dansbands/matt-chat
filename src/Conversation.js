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
                    <label className="item" style={{fontSize: '10px'}}>Enter Name of Conversation</label>
                    <input
                        className="item"
                        onChange={this.handleConversation}
                        type="text"
                    />
                    <input
                        className="item"
                        type="submit"
                    />
                </div>


            </div>
        );
    }
}




export default Conversation;