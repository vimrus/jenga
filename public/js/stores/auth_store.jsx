var Fluxxor = require("fluxxor");
var actions = require("../actions.jsx");
var client = require('../client.js');

var AuthStore = Fluxxor.createStore({
    initialize: function() {
        this.error = false;

        this.bindActions(
            actions.constants.AUTH.AUTH, this.handleAuth,
            actions.constants.AUTH.LOGIN, this.handleLogin,
            actions.constants.AUTH.LOGOUT, this.handleLogout
            );
        this.me = false;
    },

    getError: function() {
        return this.error;
    },

    getMe: function() {
        if(!this.me) {
            client.members.read('me').done(function(data){
                this.me = data;
                this.emit("change");
            }.bind(this))
        }
        return this.me;
    },

    loggedIn: function() {
        return !!localStorage.token;
    },

    handleAuth: function () {
        if(!this.loggedIn()) {
            setTimeout(function() {
                this.flux.actions.routes.transition("login");
            }.bind(this));
        }
    },

    handleLogout: function () {
        delete localStorage.token;
        setTimeout(function() {
            this.flux.actions.routes.transition("dashboard");
        }.bind(this));
    },

    handleLogin: function(payload) {
        var user = {
            account: payload.account,
            password: payload.password,
        };
        client.tokens.create(user).done(function(data){
            localStorage.token = data;
            this.flux.actions.routes.transition("dashboard");
        }.bind(this));

        this.emit("change");
    },
});

module.exports = AuthStore;
