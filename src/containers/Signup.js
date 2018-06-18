import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signup as signupRequisition } from '../api/signup';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Panel, Input, Col } from 'muicss/react';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { setLogged } from '../actions/signup';
import PropTypes from 'prop-types';

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            email: ''
        };

        this.handleEnter = this.handleEnter.bind(this);
        this.setLoaderState = this.setLoaderState.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.login = this.login.bind(this);
    }

    setLoaderState(state) {
        this.setState({ loading: state });
    }

    login() {
        //E-mail fixed in api "your@email.com"
        this.setLoaderState(true);

        return this.props.login(this.state.email)
            .then(res => {
                this.setLoaderState(false);
                return res;
            })
            .catch(err => {
                this.setLoaderState(false);
                toast.error(err.message);
                return err;
            });
    }


    handleEnter(event) {
        if (event.key === 'Enter') this.login();
    }

    handleForm(ev) {
        this.setState({ [ev.target.name]: ev.target.value });
    }

    loginPage() {
        let { loading } = this.state;
        return (
            <Container className="signup__container animated fadeInUp">
                <Col md="4" md-offset="4">
                    <Panel>
                        {loading
                            ? <Loader />
                            : <Input label="E-mail Address" type="email" placeholder="Enter with your e-mail" name="email" onChange={this.handleForm} onKeyPress={this.handleEnter} />}
                        <ToastContainer />
                    </Panel>
                </Col>
            </Container>
        );
    }

    redirectToSignup() {
        return (<Redirect to="/feed" />);
    }

    render() {
        let { logged } = this.props;
        return !logged ? this.loginPage() : this.redirectToSignup();
    }
}

Signup.contextTypes = { store: PropTypes.object };

const mapStateToProps = state => {
    return ({
        logged: state.signup.logged
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        login: (email) => dispatch(signupRequisition(email))
    });
};

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;