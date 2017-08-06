import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../fire';
import Header from "./Header";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            error: {
                message: ''
            }
        }
    }

    signUp() {
        console.log('this.state', this.state);
        const { email, password } = this.state;
        fire.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({error})
            })
    }

    render() {
        return (
            <div>

                <Header />

                <div className="form-inline">
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="email"
                            onChange={event => this.setState({email: event.target.value})}
                        />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                            onChange={event => this.setState({password: event.target.value})}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.signUp()}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div>{this.state.error.message}</div>
                    <div className="already"><Link className="signLink" to={'/signin'}>Already a user? Sign in instead</Link></div>
                </div>

            </div>
        )
    }
}

export default SignUp;