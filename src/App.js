/*

Next steps:

Add Auth
Add Routing



*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from './fire';
import UserName from './UserName';
import Status from './Status';
import Conversation from './Conversation';


import './App.css'

let setNumber = 1;
let date = (new Date()).toString();




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: 'Join a Conversation',
            name: 'Sign In',
            messages: []
        }; // <- set up react state

        this.changeName = this.changeName.bind(this);
        this.changeConversation = this.changeConversation.bind(this);
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(){
        setNumber = setNumber+1;
        this.scrollToBottom();

    }

    changeName(newName) {
        this.setState({
            name: newName
        });
    }

    changeConversation(newConversation) {
        this.setState({
            conversation: newConversation
        });
    }



    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( [setNumber, this.inputOne.value, this.state.name, this.state.conversation, date] );
        this.inputOne.value = ''; // <- clear the input
    }

    render() {
        return (
            <div>

                <div className="App">
                    <div className="App-header">
                        <div className="App-header-left">
                            <img src={'https://matt.dule.one/images/duleone.jpg'} />
                        </div>
                        <div className="App-header-center">
                            <h2 style={{ display: "inline-block", marginLeft: "50px", align: "top", top: "0" }}>Welcome to MattChat</h2>
                        </div>
                    </div>

                    <Status
                        name = {this.state.name}
                        conversation = {this.state.conversation}
                    />
                    <div className="signIn">
                        <UserName
                            onChange = {this.changeName}
                        />

                        <Conversation
                            onChange = {this.changeConversation}
                        />
                    </div>


                    <div className="window">
                        <div className="conversation" >
                            <ul className="messageList">
                                { /* Render the list of messages */
                                    this.state.messages.map( message =>
                                        <li className={ this.state.name.toLowerCase() === message.text[2].toLowerCase() ? "messageItemHome" : "messageItemAway" }
                                            style={ this.state.conversation.toLowerCase() === message.text[3].toLowerCase() ? null : { display: "none"}}
                                            key={message.id}>
                                            <div style={{ marginBottom: "10px", fontSize: "12px" }}>{message.text[2]}:</div>
                                            <div>{message.text[1]}</div> _______________
                                            <div style={{ fontSize: "10px" }}>{message.text[4]}</div>
                                        </li> ).reverse()
                                }
                            </ul>
                            <div style={{ float:"left", clear: "both" }}
                                 ref={(el) => { this.messagesEnd = el; }} />
                        </div>
                        <div className="input">
                            <form onSubmit={this.addMessage.bind(this)}>
                                <input className="typeMessage" type="text" ref={ el => this.inputOne = el } />
                                <input className="send" type="submit" value="Send"/>

                            </form>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;


/*
 //bind in constructor
 this.handleUserName = this.handleUserName.bind(this);


 //event handler for JSX below
 handleUserName(event) {
 this.setState({ name: event.target.value });
 console.log(event.target.value)
 }

 <form onSubmit={this.handleUserName}>
 <input type="text" onSubmit={this.handleUserName}/>
 <input type="submit"/>
 <div>Signed in as: {this.state.name}</div>

 </form>
 */