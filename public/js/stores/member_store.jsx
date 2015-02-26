var Fluxxor = require("fluxxor");

var actions = require("../actions.jsx");

var NOT_FOUND_TOKEN = {};

var ProjectStore = Fluxxor.createStore({
  initialize: function() {
    this.projectId  = 0;
    this.projects  = {};

    this.bindActions(
      actions.constants.PROJECT.ADD, this.handleAddProject,
      actions.constants.PROJECT.EDIT, this.handleEditProject,
      actions.constants.PROJECT.REMOVE, this.handleRemoveProject
    );
  },

  getProjects: function() {
    return Object.keys(this.projects).map(function(key) {
      return this.projects[key];
    }.bind(this));
  },

  getProject: function(id) {
    return this.projects[id] || NOT_FOUND_TOKEN;
  },

  handleAddProject: function(payload) {
    var project = {
      name: payload.name,
      description: payload.desc,
    };
    project.id = ++this.projectId;
    this.projects[project.id] = project;

    // Normally an API call to save a new item would be asynchronous,
    // but we're faking a back-end store here, so we'll fake the
    // asynchrony too.
    setTimeout(function() {
      if (!payload.preventTransition) {
        this.flux.actions.routes.transition("project", {id: project.id});
      }
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
