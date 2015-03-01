var Fluxxor = require("fluxxor");
var actions = require("../actions.jsx");
var client = require('../client.js');

var NOT_FOUND_TOKEN = {};

var ProjectStore = Fluxxor.createStore({
    initialize: function() {
        this.projectId = 0;
        this.error     = false;
        this.projects  = false;
        this.project   = {
            tasks: {},
            topics: {},
            docs: {},
        };

        this.bindActions(
            actions.constants.PROJECT.ADD, this.handleAddProject,
            actions.constants.PROJECT.EDIT, this.handleEditProject,
            actions.constants.PROJECT.REMOVE, this.handleRemoveProject
            );
    },

    getProjects: function() {
        client.projects.read().done(function(data){
            this.projects = data;
        }.bind(this));
    },

    getProject: function(projectId) {
        return this.projects[projectId];
    },

    getTasks: function(projectId) {
        client.projects.tasks.read(projectId).done(function(data){
            this.project.tasks = data;
        }.bind(this));
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
