var Fluxxor = require("fluxxor");
var actions = require("../actions.jsx");
var client = require('../client.js');

var AuthStore = Fluxxor.createStore({
    initialize: function() {
        this.error = false;

        this.bindActions(
            actions.constants.AUTH.LOGIN, this.handleLogin,
            actions.constants.AUTH.LOGOUT, this.handleLogout,
            );
    },

    loggedIn: function() {
        return !!localStorage.token;
    },

    logout: function (cb) {
        delete localStorage.token;
        if (cb) cb();
    },

    handleLogin: function(payload) {
        var project = {
            name: payload.name.name,
            desc: payload.name.desc,
        };
        client.tokens.create(user).done(function(data){
            this.flux.actions.routes.transition("dashboard");
        }.bind(this));

        this.emit("change");
    },

    handleEditProject: function(payload) {
        this.projects[payload.id] = {
            id: payload.id,
            name: payload.name,
            desc: payload.desc,
        };

        this.emit("change");
    },

    handleRemoveProject: function(id) {
        delete this.projects[id];
        this.emit("change");
    }
});

module.exports = AuthStore;
