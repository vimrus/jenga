var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Fluxxor = require('fluxxor');
var Header = require('./header.jsx');

var Dashboard = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member","project")],
    getStateFromFlux: function() {
        this.getFlux().actions.auth.auth();
        return {
            me: this.getFlux().store("member").getMember('me'),
            projects: this.getFlux().store("project").getProjects(),
        };
    },

    render: function () {
        var projects = [];
        for(project in this.state.projects) {
            projects.push(<li><Link to="project" params={{projectId: project.id}}>{project.name}</Link></li>);
        }

        return (
            <div>
              <Header/>
              <div className="main">
                <ul>{projects}</ul>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});

module.exports = Dashboard;
