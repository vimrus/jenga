var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Auth = require('./auth.jsx');
var Header = require('./header.jsx');

var ProjectHeader = React.createClass({
    getInitialState: function() {
        return {
            project: {
                id: 0,
            },
        };
    },
    mixins: [Router.State],
    componentDidMount: function() {
        client.projects.read(projectId).done(function(data){
            if (this.isMounted()) {
                this.setState({
                    project: data
                });
            }
        }.bind(this)).fail(function(jqXHR) {
            if(jqXHR.status == 401) {
                transition.redirect('/login');
            } 
        })
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
    mixins: [ Auth.Authentication ],

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
