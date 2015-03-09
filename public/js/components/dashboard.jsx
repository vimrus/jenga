var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Fluxxor = require('fluxxor');
var Header = require('./header.jsx');

var Dashboard = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("member")],
    getStateFromFlux: function() {
        this.getFlux().actions.auth.auth();
        return {
            me: this.getFlux().store("member").getMember('me'),
        };
    },

    render: function () {
        return (
            <div>
              <Header/>
              <div className="main">
              </div>
              <RouteHandler/>
            </div>
            );
    }
});

module.exports = Dashboard;
