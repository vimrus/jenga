var React  = require("react"),
    Router =  ReactRouter,
    RouteHandler = Router.RouteHandler,
    Link    = Router.Link,
    Auth    = require('./auth.jsx'),
    Fluxxor = require('fluxxor');

var Header = React.createClass({
    mixins: [ Auth.Authentication, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member")],
    getStateFromFlux: function() {
        return {
            me: this.getFlux().store("member").getMember('me'),
        };
    },

    /*
    componentDidMount: function() {
        client.members.read('me').done(function(data){
            if (this.isMounted()) {
                this.setState({
                    username: data.name,
                });
            }
        }.bind(this)).fail(function(jqXHR) {
            if(jqXHR.status == 401) {
                transition.redirect('/login');
            } 
        })
    },
    */
    render: function () {
        return (
            <div className="header">
              <div className="container">
                <h1 className="logo"><Link to="app">Jenga</Link></h1>
                <form className="header-search">
                  <input id="search-box" name="q" type="text" />
                </form>
                <ul className="header-nav left">
                </ul>
                <ul className="header-nav right">
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
