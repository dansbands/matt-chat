import React from 'react';
import fire from '../fire';
import duleone from '../img/duleone.jpg';
import Menu from '../img/Menu.svg';

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
                <div className="App-header-background" ></div>
                <div className="App-header-left">
                    <img src={duleone} />
                </div>
                <div className="App-header-center">
                    <h2 style={{ display: "inline-block", align: "top", top: "0" }}>MattChat</h2>
                </div>



                <div className="App-header-right">

                    <div className="hamburgerContainer">
                        <div
                            className="hamburger"
                            onClick={this.toggleMenu}
                        >

                            <img src={Menu}/>
                        </div>
                    </div>


                    <div className={this.state.menuClass}>
                        <div className="profilePic"></div>
                        <div className="profileInfo">
                            <img className="profile" src={duleone} style={{height: "30px", borderRadius: "15px" }}/>
                            <p className="profile" >{this.props.name}</p>
                        </div>


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

