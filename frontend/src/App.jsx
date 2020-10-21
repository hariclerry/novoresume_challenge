import React, { Fragment } from 'react';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/nav_bar/navbar';
import Home from './pages/home/home';
import Offers from './pages/offers/offers';
import Modal from './components/modal/modal.jsx';

import LoginForm from './components/login_form/login-form.jsx';
import RegistrationForm from './components/registration_form/registration-form.jsx';

export default class App extends Component {
    state = { show: 'none', isLoggedIn: false };
    componentDidMount = () => {
        this.setIsLoggedIn('token' in localStorage && localStorage.token !== 'undefined');
    };
    showModal = form => {
        this.setState({ show: form });
    };

    hideModal = () => {
        this.setState({ show: 'none' });
    };

    setIsLoggedIn = isLoggedIn => {
        this.setState({ isLoggedIn });
    };

    render() {
        const { show, isLoggedIn } = this.state;

        const form = () => {
            if (show === 'registration') return <RegistrationForm showModal={this.showModal} hideModal={this.hideModal} />;
            else if (show === 'login')
                return <LoginForm showModal={this.showModal} hideModal={this.hideModal} setIsLoggedIn={this.setIsLoggedIn} />;
        };

        return (
            <Fragment>
                <ToastContainer draggable={false} hideProgressBar={true} autoClose={3000} bodyStyle={{ fontSize: '1.5rem' }} />
                <Router>
                    <header>
                        <Navbar showModal={this.showModal} isLoggedIn={isLoggedIn} setIsLoggedIn={this.setIsLoggedIn} />
                    </header>
                    <Modal show={show} handleClose={this.hideModal}>
                        {form()}
                    </Modal>
                    <main>
                        <Switch>
                            <Route path="/" exact>
                                {isLoggedIn ? <Redirect to="/offers" /> : <Home showModal={() => this.showModal('registration')} />}
                            </Route>
                            <Route path="/offers" exact>
                                {isLoggedIn ? <Offers isLoggedIn={isLoggedIn} /> : <Redirect to="/" />}
                            </Route>
                        </Switch>
                    </main>
                </Router>
            </Fragment>
        );
    }
}
