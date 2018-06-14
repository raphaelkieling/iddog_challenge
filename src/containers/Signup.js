import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Signup as signupRequisition } from '../api/signup';

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            logged: false,
            msg: null
        }

        this.submit = this.submit.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
    }

    login(form) {
        //Email utilizado => your@email.com
        signupRequisition(form.email)
            .then(logged => this.setState({ logged }))
            .catch(err => {
                this.setState({
                    msg: {
                        message: err.message,
                        type: 'error'
                    }
                })
            })
    }

    submit() {
        const form = {
            email: this.email.value
        }

        this.login(form)
    }

    handleEnter(event) {
        if (event.key === 'Enter') this.submit()
    }

    loginPage() {
        return (
            <div className="mui-row">
                <div className="mui-col-md-4 mui-col-md-offset-4">
                    <div className="mui-panel">
                        <div className="mui-textfield">
                            <input type="text" ref={(input) => this.email = input} onKeyPress={this.handleEnter} />
                            <label>Email</label>
                        </div>
                        {this.state.msg ? <p>{this.state.msg.message}</p> : null}
                    </div>
                </div>
            </div>
        )
    }

    redirectToSignup() {
        return (<Redirect to="/feed" />)
    }

    render() {
        return !this.state.logged ? this.loginPage() : this.redirectToSignup()
    }
}