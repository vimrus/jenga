var c = {
    PROJECT: {
        LIST: "PROJECT:LIST",
        LOAD: "PROJECT:LOAD",
        ADD: "PROJECT:ADD",
        EDIT: "PROJECT:EDIT",
        REMOVE: "PROJECT:REMOVE",
    },
    ROUTE: {
        TRANSITION: "ROUTE:TRANSITION"
    },
    AUTH: {
        AUTH: "AUTH:AUTH",
        LOGIN: "AUTH:LOGIN",
        LOGOUT: "AUTH:LOGOUT",
    }
};

var methods = {
    project: {
        list: function() {
            this.dispatch(c.PROJECT.LIST);
        },
        load: function(projectId) {
            this.dispatch(c.PROJECT.LOAD, projectId);
        },
        add: function(name, desc) {
            this.dispatch(c.PROJECT.ADD, {
                name: name,
                desc: desc,
            });
        },

        edit: function(id, name, desc) {
            this.dispatch(c.RECIPE.EDIT, {
                id: id,
                name: name,
                desc: desc,
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
        },
        auth: function() {
            this.dispatch(c.AUTH.AUTH);
        }
    },
};

module.exports = {
    methods: methods,
    constants: c
};
