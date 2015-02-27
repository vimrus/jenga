var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Auth = require('./auth.jsx');
var Fluxxor = require('fluxxor');
var Header = require('./header.jsx');

var ProjectHeader = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("project")],
    getStateFromFlux: function() {
        return {
            project: this.getFlux().store("project").getProject(),
        };
    },

    render: function () {
        return (
            <div className="main-head">
              <div className="container">
                <ul className="main-nav">
                  <li><Link to="task" params={{projectId: this.state.project.id}}>任务</Link></li>
                  <li><Link to="doc" params={{projectId: this.state.project.id}}>文档</Link></li>
                  <li><Link to="topic" params={{projectId: this.state.project.id}}>讨论</Link></li>
                </ul>
                <h1>Dashboard</h1>
              </div>
            </div>
            );
    }
});

var Project = React.createClass({
    mixins: [ Auth.Authentication, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member")],

    render: function () {
        return (
            <div>
              <Header/>
              <div className="main">
                <ProjectHeader/>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});

module.exports = Project;
