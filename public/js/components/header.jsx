var React  = require('react'),
    Router =  ReactRouter,
    RouteHandler = Router.RouteHandler,
    Link     = Router.Link,
    Auth     = require('./auth.jsx'),
    SkyLight = require('react-skylight'),
    Fluxxor  = require('fluxxor');

var Header = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React), 
        Fluxxor.StoreWatchMixin("auth", "project"),
    ],
    getStateFromFlux: function() {
        this.getFlux().actions.project.list();
        return {
            me: this.getFlux().store("auth").getMe(),
            projects: this.getFlux().store("project").getProjects(),
        };
    },
    showDialog: function() {
        this.refs.dialog.show();
    },

    render: function () {
        return (
            <div className="header">
              <div className="container">
                <h1 className="logo"><Link to="app">Jenga</Link></h1>
                <form className="header-search">
                  <input id="search-box" name="q" type="text" />
                </form>
                <button onClick={this.showDialog}>projects</button>
                <ul className="header-nav right">
                 <li><Link to="dashboard">{this.state.me.name}</Link></li>
                 <li><Link to="new">New</Link></li>
                 <li><Link to="logout">Logout</Link></li>
                </ul>
              </div>
              <SkyLight ref="dialog">
                <h1>dialog</h1>
                <p>dialog</p>
              </SkyLight>
            </div>
            );
    }
});
module.exports = Header;
