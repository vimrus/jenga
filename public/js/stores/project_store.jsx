var Fluxxor = require("fluxxor");
var actions = require("../actions.jsx");
var client = require('../client.js');

var NOT_FOUND_TOKEN = {};

var ProjectStore = Fluxxor.createStore({
    initialize: function() {
        this.error     = false;
        this.projectId = 0;
        this.projects  = [];
        this.project   = {
            tasks: {},
            topics: {},
            docs: {},
        };

        this.bindActions(
            actions.constants.PROJECT.LIST, this.handleListProject,
            actions.constants.PROJECT.LOAD, this.handleLoadProject,
            actions.constants.PROJECT.ADD, this.handleAddProject,
            actions.constants.PROJECT.EDIT, this.handleEditProject,
            actions.constants.PROJECT.REMOVE, this.handleRemoveProject
            );
    },

    getProjects: function() {
        return this.projects;
    },

    getProject: function() {
        return this.project;
    },

    getEntries: function() {
        return this.project.entries;
    },

    handleListProject: function(payload) {
        client.projects.read().done(function(data){
            this.projects = data;
        }.bind(this));

        this.emit("change");
    },

    handleLoadProject: function(payload) {
        client.projects.read(payload).done(function(data){
            this.project = data;
        }.bind(this));

        this.emit("change");
    },

    handleAddProject: function(payload) {
        var project = {
            name: payload.name,
            desc: payload.desc,
        };
        client.projects.create(project).done(function(data){
            this.flux.actions.routes.transition("project", {projectId: data});
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

ProjectStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = ProjectStore;
