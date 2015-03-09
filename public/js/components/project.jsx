var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Auth = require('./auth.jsx');
var Fluxxor = require('fluxxor');
var State = Router.State;
var Header = require('./header.jsx');

var TaskSection = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("project"), State],
    getStateFromFlux: function() {
        return {
            entries: this.getFlux().store("project").getEntries(),
            project: this.getFlux().store("project").getProject(),
        };
    },

    render: function () {
        var entries = [];
        for(entry in this.state.entries) {
            entries.push(<Entry data={entry} />)
        }
        
        return (
            <div className="entries">{entries}</div>
            );
    }
});

var Entry = React.createClass({
    render: function () {
        var entry = this.props.data;
        var tasks = array();
        for(task in entry.tasks) {
            tasks.push(<TaskItem data={task}/>)
        }
        
        return (
            <div className="entry">{tasks}</div>
            );
    }
});

var TaskItem = React.createClass({
    render: function () {
        var task = this.props.data;
        return (
            <div>{task.title}</div>
            );
    }
});

var TaskSide = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("project"), State],
    getStateFromFlux: function() {
        var params = this.getParams();
        return {
            entries: this.getFlux().store("project").getEntries(),
            project: this.getFlux().store("project").getProject(),
        };
    },

    render: function () {
        return (
            <div></div>
            );
    }
});

var Project = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member"), State],
    getStateFromFlux: function() {
        var projectId = this.getParams().projectId;
        this.getFlux().actions.auth.auth();
        this.getFlux().actions.project.load(projectId);
        return {
            projectId: projectId
        };
    },

    render: function () {
        return (
            <div>
              <Header/>
              <div className="main">
                <div className="entry column"><TaskSection /></div>
                <div className="side column"><TaskSide /></div>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});

module.exports = Project;
