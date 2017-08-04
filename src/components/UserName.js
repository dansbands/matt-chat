import React from 'react';
import '../css/App.css';

class UserName extends React.Component {
    constructor(props) {
        super(props);

        //this.state = { name: 'Your Name Here'};

        this.handleUserName = this.handleUserName.bind(this);
    }


    handleUserName = (e) => {
        e.preventDefault();
        const name = e.target.value;
        this.props.onChange(name);
        //this.setState({ name: e.target.value });
    };


    render() {
        return (
            <div >

                <div className="userName">
                    <label className="item">
                        Enter User Name
                    </label>
                    <input
                        className="signInInput"
                        onChange={this.handleUserName}
                        type="text"
                    />
                </div>

            </div>
        );
    }
}




export default UserName;