var React = require("react"),
    Router = require("react-router"),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var App       = require("./components/app.jsx"),
    Auth      = require("./components/auth.jsx"),
    Header    = require("./components/header.jsx"),
    Dashboard = require("./components/dashboard.jsx"),
    Project   = require("./components/project.jsx"),
    New       = require("./components/new.jsx"),
    Task      = require("./components/task.jsx"),
    Doc       = require("./components/doc.jsx"),
    Topic     = require("./components/topic.jsx");

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="login" handler={Auth.Login}/>
        <Route name="logout" handler={Auth.Logout}/>
        <Route name="project" path="/project/:projectId" handler={Project}/>
        <Route name="new" handler={New}/>
        <Route name="task" path="/project/:projectId/tasks" handler={Task}/>
        <Route name="doc" handler={Doc}/>
        <Route name="topic" handler={Topic}/>
        <DefaultRoute name="dashboard" handler={Dashboard}/>
    </Route>
    );
module.exports = routes;
