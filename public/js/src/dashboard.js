var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
    mixins: [ Authentication ],

    render: function () {
        return (
            <div>
            <Header/>
            <RouteHandler/>
            </div>
            );
    }
});
