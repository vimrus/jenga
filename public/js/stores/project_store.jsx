var Fluxxor = require("fluxxor");

var actions = require("../actions.jsx");

var NOT_FOUND_TOKEN = {};

var ProjectStore = Fluxxor.createStore({
  initialize: function() {
    this.recipeId = 0;
    this.recipes = {};

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
    return this.recipes[id] || NOT_FOUND_TOKEN;
  },

  handleAddRecipe: function(payload) {
    var recipe = {
      name: payload.name,
      description: payload.description,
      ingredients: payload.ingredients,
      directions: payload.directions
    };
    recipe.id = ++this.recipeId;
    this.recipes[recipe.id] = recipe;

    // Normally an API call to save a new item would be asynchronous,
    // but we're faking a back-end store here, so we'll fake the
    // asynchrony too.
    setTimeout(function() {
      if (!payload.preventTransition) {
        this.flux.actions.routes.transition("recipe", {id: recipe.id});
      }
    }.bind(this));

    this.emit("change");
  },

  handleEditRecipe: function(payload) {
    this.recipes[payload.id] = {
      id: payload.id,
      name: payload.name,
      description: payload.description,
      ingredients: payload.ingredients,
      directions: payload.directions
    };

    this.emit("change");
  },

  handleRemoveRecipe: function(id) {
    delete this.recipes[id];
    this.emit("change");
  }
});

ProjectStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

module.exports = ProjectStore;
