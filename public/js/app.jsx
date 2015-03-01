var React = require("react"),
    Router = require("react-router"),
    Fluxxor = require("fluxxor");

var actions = require("./actions.jsx"),
    routes  = require("./routes.jsx"),
    ProjectStore = require("./stores/project_store.jsx"),
    MemberStore  = require("./stores/member_store.jsx"),
    RouteStore  = require("./stores/route_store.jsx"),
    AuthStore  = require("./stores/auth_store.jsx");

var router = Router.create({routes: routes});

var stores = {
    project: new ProjectStore(),
    member: new MemberStore(),
    auth: new AuthStore(),
    route: new RouteStore({router: router}),
};

var flux = new Fluxxor.Flux(stores, actions.methods);
flux.on("dispatch", function(type, payload) {
    console.log("Dispatch:", type, payload);
});

router.run(function(Handler) {
    React.render(<Handler flux={flux}/>, document.body);
});
