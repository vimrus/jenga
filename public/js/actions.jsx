var c = {
  PROJECT: {
    ADD: "PROJECT:ADD",
    EDIT: "PROJECT:EDIT",
    REMOVE: "PROJECT:REMOVE",
  },
};

var methods = {
  project: {
    add: function(name, desc, ingredients, directions, preventTransition) {
      this.dispatch(c.RECIPE.ADD, {
        name: name,
        description: desc,
        ingredients: ingredients,
        directions: directions,
        preventTransition: preventTransition
      });
    },

    edit: function(id, name, desc, ingredients, directions) {
      this.dispatch(c.RECIPE.EDIT, {
        id: id,
        name: name,
        description: desc,
        ingredients: ingredients,
        directions: directions
      });
    },

    remove: function(id) {
      this.dispatch(c.RECIPE.REMOVE, id);
    }
  },
};

module.exports = {
  methods: methods,
  constants: c
};
