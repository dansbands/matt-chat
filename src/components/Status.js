import React from 'react';
import '../css/App.css';

class Status extends React.Component {


    render() {
        return (
            <div >

                <div className="status">
                    <div className="userNameLeft">
                        <p><span className="lightgrey"> Signed in as:</span> {this.props.name}</p>
                    </div>
                    <div className="userNameRight">
                        <p><span className="lightgrey">In conversation:</span> {this.props.chatroom}</p>
                    </div>
                </div>

            </div>
        );
    }
}




export default Status;