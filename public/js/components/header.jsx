var React  = require("react"),
    Router =  ReactRouter,
    RouteHandler = Router.RouteHandler,
    Link    = Router.Link,
    Auth    = require('./auth.jsx'),
    Fluxxor = require('fluxxor');

var Header = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React), 
        Fluxxor.StoreWatchMixin("auth", "project"),
    ],
    getStateFromFlux: function() {
        return {
            me: this.getFlux().store("auth").getMe(),
            projects: this.getFlux().store("project").getProjects(),
        };
    },

    render: function () {
        return (
            <div className="header">
              <div className="container">
                <h1 className="logo"><Link to="app">Jenga</Link></h1>
                <ul className="header-nav left">
                </ul>
                <ul className="header-nav right">
                 <li>
                   <form className="header-search">
                     <input id="search-box" name="q" type="text" />
                   </form>
                 </li>
                 <li><Link to="dashboard">{this.state.me.name}</Link></li>
                 <li><Link to="new">New</Link></li>
                 <li><Link to="logout">Logout</Link></li>
                </ul>
              </div>
            </div>
            );
    }
});
module.exports = Header;
