var c = {
    PROJECT: {
        ADD: "PROJECT:ADD",
        EDIT: "PROJECT:EDIT",
        REMOVE: "PROJECT:REMOVE",
    },
    ROUTE: {
        TRANSITION: "ROUTE:TRANSITION"
    },
    AUTH: {
        LOGIN: "AUTH:LOGIN",
        LOGOUT: "AUTH:LOGOUT",
    }
};

var methods = {
  project: {
    add: function(name, desc) {
      this.dispatch(c.PROJECT.ADD, {
        name: name,
        desc: desc,
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
  routes: {
      transition: function(path, params) {
          this.dispatch(c.ROUTE.TRANSITION, {path: path, params: params});
      }   
  },
  auth: {
    login: function(account, password) {
      this.dispatch(c.AUTH.LOGIN, {
        account: account,
        password: password,
      });
    },

    logout: function() {
      this.dispatch(c.AUTH.LOGOUT);
    }
  },
};

module.exports = {
  methods: methods,
  constants: c
};
