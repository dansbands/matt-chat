import React from 'react';
import fire from '../fire';

let click = 1;


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClass: 'menuContainer hide'
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }



    toggleMenu() {
        click = click + 1;

        this.setState({
            menuClass: (click/2)% 1 === 0 ? 'menuContainer show' : 'menuContainer hide'
        });
    }

    signOut() {
        fire.auth().signOut();
    }

    render () {
        return (
            <div className="App-header">
                <div className="App-header-left">
                    <img src={'https://matt.dule.one/images/duleone.jpg'} />
                </div>
                <div className="App-header-center">
                    <h2 style={{ display: "inline-block", align: "top", top: "0" }}>Welcome to MattChat</h2>
                </div>



                <div className="App-header-right">

                    <div className="hamburgerContainer">
                        <div
                            className="hamburger"
                            onClick={this.toggleMenu}
                        >
                            <p>______</p>
                            <p>______</p>
                            <p>______</p>
                        </div>
                    </div>


                    <div className={this.state.menuClass}>
                        <div className="menu">
                            <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li>Invite Friends!</li>

                            </ul>


                            <div
                                className="signOut"
                            >
                                <button
                                    className="signOutBtn"
                                    onClick={() => this.signOut()}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>






                </div>
            </div>
        )
    }
}

export default Header;

