"use strict";

var React = require('react');

var Actions = require('../Actions');

class LoginForm extends React.Component {

    render () {
        var username = "test";
        var password = "test";
        return null;
    }

    submitLogin () {
        var user = this.username;
        var pass = this.password;
        if (this.props.action == 'register') {
            Actions.user.register(user, pass);
        } else {
            Actions.user.login(user, pass);
        }
    }


    submitLogin (e) {
        e.preventDefault();
        e.stopPropagation();
        var user = this.username.value;
        var pass = this.password.value;
        if (this.props.action == 'register') {
            Actions.user.register(user, pass);
        } else {
            Actions.user.login(user, pass);
        }
    }

};

module.exports = LoginForm;
