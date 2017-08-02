import React from 'react';


class UserName extends React.Component {
    constructor(props) {
        super(props);

        //this.state = { name: 'Your Name Here'};

        this.handleUserInput = this.handleUserInput.bind(this);
    }


    handleUserInput = (e) => {
        e.preventDefault();
        const name = e.target.value;
        this.props.onChange(name);
        //this.setState({ name: e.target.value });
    };

    render() {
        return (
            <div>

                <input
                    onChange={this.handleUserInput}
                    type="text"
                />
                <input type="submit" />
                <h3>Signed in as: {this.props.name}</h3>
            </div>
        );
    }
}




export default UserName;