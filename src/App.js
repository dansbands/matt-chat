/*

Next steps:

Separate messages in to Divs



*/
import React, { Component } from 'react';
import fire from './fire';
import UserName from './UserName';

import './App.css'

let setNumber = 1;
let date = (new Date()).toString();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Sign In',
            messages: []
        }; // <- set up react state

        this.changeName = this.changeName.bind(this);
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

    componentDidUpdate(){
        setNumber = setNumber+1
    }

    changeName(newName) {
        this.setState({
            name: newName
        });
    }

    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( [setNumber, this.inputOne.value, this.state.name, date] );
        this.inputOne.value = ''; // <- clear the input
    }

    render() {
        return (
            <div>

                <div className="App">
                    <div className="App-header">
                        <h2>Welcome to MattChat</h2>
                    </div>

                    <UserName
                        name = {this.state.name}
                        onChange = {this.changeName}
                    />

                    <div className="window">
                        <div className="conversation">
                            <ul className="messageList">
                                { /* Render the list of messages */
                                    this.state.messages.map( message => <li className="messageItem" key={message.id}>{message.text[2]}: {message.text[1]} ........{message.text[3]}</li> )
                                }
                            </ul>


                        </div>
                        <div className="input">
                            <form onSubmit={this.addMessage.bind(this)}>
                                <input className="typeMessage" type="text" ref={ ela => this.inputOne = ela } />
                                <input className="send" type="submit" value="Send"/>

                            </form>


                            <div className="signOutDiv">
                                <button
                                    className="signOut"
                                    onClick={() => this.signOut()}
                                >
                                    Sign Out
                                </button>
                            </div>
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