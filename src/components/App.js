/*

Next steps:

Hide hamburger on sign in
Animate hamburger and slide-in menu
Add profile, ability to add name, picture/ avatar


x Margins on sign-in/up

x Create uniform style on all pages

x Add Auth
x Add Routing



*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import fire from '../fire';
import Status from './Status';
import JoinChat from './JoinChat';
import ChatList from './ChatList';
import Header from './Header';

import '../css/App.css'

let setNumber = 1;
let date = (new Date()).toString();




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatroom: 'MattChat',
            name: (fire.auth().currentUser && fire.auth().currentUser.email) || '',
            messages: []
        }; // <- set up react state

        if (!fire.auth().currentUser) {
                        fire.auth().onAuthStateChanged(user => user && this.updateName(user.email));
                }

        this.changeName = this.changeName.bind(this);
        this.changeChatRoom = this.changeChatRoom.bind(this);
    }


    updateName(name) {
            this.setState({name});
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

    changeChatRoom(newChatRoom) {
        this.setState({
            chatroom: newChatRoom
        });
    }



    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( [setNumber, this.inputOne.value, this.state.name, this.state.chatroom, date] );
        this.inputOne.value = ''; // <- clear the input
    }

    render() {
        return (
            <div>
                <div className="App">

                    <Header
                        onClick={this.signOut}
                        name={this.state.name}
                    />

                    <Status
                        name = {this.state.name}
                        chatroom = {this.state.chatroom}
                    />

                    <div className="signIn">
                        <JoinChat
                            onChange = {this.changeChatRoom}
                        />

                        <ChatList
                            onChange = {this.changeChatRoom}
                            messages = {this.state.messages}
                        />
                    </div>


                    <div className="window">
                        <div className="conversation" >
                            <div className="spacer" />
                            <ul className="messageList">
                                { /* Render the list of messages */
                                    this.state.messages.map( message =>
                                        <li className={ this.state.name.toLowerCase() === message.text[2].toLowerCase() ? "messageItemHome" : "messageItemAway" }
                                            style={ this.state.chatroom.toLowerCase() === message.text[3].toLowerCase() ? null : { display: "none"}}
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
                                <input className="typeMessage" type="text" placeholder="Type your text here..." ref={ el => this.inputOne = el } />
                                <input className="send" type="submit" value="Send"/>
                            </form>


                        </div>

                        <div className="footer">
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return {}
}

export default connect(mapStateToProps, null)(App);


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