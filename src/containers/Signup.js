import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signup as signupRequisition } from '../api/signup';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Panel, Input, Col } from 'muicss/react';
import Loader from '../components/Loader';

export default class Signup extends Component {
    constructor() {
        super();

        this.state = {
            email:"",
            logged: false,
            loading: false
        };

        this.handleEnter = this.handleEnter.bind(this);
        this.setLoaderState = this.setLoaderState.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    setLoaderState(state) {
        this.setState({ loading: state });
    }

    login(form) {
        //E-mail fixed in api "your@email.com"

        this.setLoaderState(true);
        signupRequisition(this.state.email)
            .then(logged => {
                this.setLoaderState(false);
                this.setState({ logged });
            })
            .catch(err => {
                this.setLoaderState(false);
                toast.error(err.message);
            });
    }


    handleEnter(event) {
        if (event.key === 'Enter') this.login();
    }

    handleForm(ev){
        this.setState({[ev.target.name]: ev.target.value});
    }

    loginPage() {
        return (
            <Container className="signup__container animated fadeInUp">
                <Col md="4" md-offset="4">
                    <Panel>
                        {this.state.loading
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
        return !this.state.logged ? this.loginPage() : this.redirectToSignup()
    }
}