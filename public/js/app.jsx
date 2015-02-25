var React = require("react"),
    Router = require("react-router"),
    Fluxxor = require("fluxxor");

var actions = require("./actions.jsx"),
    routes = require("./routes.jsx"),
    ProjectStore = require("./stores/project_store.jsx");

var router = Router.create({routes: routes});

var client = new $.RestClient('/api/', {token: localStorage.token});
client.add('members');
client.add('tokens');
client.add('projects');

var stores = {
  project: new ProjectStore(),
};

var flux = new Fluxxor.Flux(stores, actions.methods);
flux.on("dispatch", function(type, payload) {
  console.log("Dispatch:", type, payload);
});

router.run(function(Handler) {
  React.render(<Handler flux={flux}/>, document.body);
});
