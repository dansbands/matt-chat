import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../fire';
import Header from './Header';

class SignIn extends Component {
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

    signIn() {
        console.log('this.state', this.state);
        const { email, password } = this.state;
        fire.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({error})
            })
    }

    render() {
        return (
            <div>

                <Header />

                <div className="form-inline">
                    <h2>Sign In</h2>
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
                        <p
                            className="signLink1"
                            type="button"
                            onClick={() => this.signIn()}
                        >
                            Sign In
                        </p>
                        <div>{this.state.error.message}</div>
                    </div>
                    <div className="ready" ><Link className="signLink" to={'/signup'}>Sign up instead</Link></div>
                </div>

            </div>

        )
    }
}

export default SignIn;