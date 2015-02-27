var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Auth = require('./auth.jsx');
var Fluxxor = require('fluxxor');
var Header = require('./header.jsx');

var MainHeader = React.createClass({
    render: function () {
        return (
            <div className="main-head">
              <div className="container">
                <div className="main-nav">
                </div>
                <h1>Dashboard</h1>
              </div>
            </div>
            );
    }
});

var Dashboard = React.createClass({
    mixins: [ Auth.Authentication, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member")],
    getStateFromFlux: function() {
        return {
            me: this.getFlux().store("member").getMember('me'),
        };
    },

    render: function () {
        return (
            <div>
              <Header/>
              <div className="main">
                <MainHeader/>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});
module.exports = Dashboard;
