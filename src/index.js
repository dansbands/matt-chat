import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { fire } from './fire';
import { logUser } from './actions';
import reducer from './reducers';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';




const history = createHistory();

const store = createStore(reducer);

fire.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user has signed in or up', user);
        const { email } = user;
        store.dispatch(logUser(email));
        history.push('/app');
    } else {
        console.log('user has signed out or still needs to sign in.');
        history.replace('/signin');
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={history}>
            <div>
                <Route path="/app" component={App} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
            </div>

        </Router>
    </Provider>, document.getElementById('root'));