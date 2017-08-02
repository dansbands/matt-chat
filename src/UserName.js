import React from 'react';
import './App.css';

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

                <div className="signIn">
                    <label
                        className="item"
                        style={{fontSize: '10px'}}>Enter User Name
                    </label>
                    <input
                        className="item"
                        onChange={this.handleUserName}
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




export default UserName;