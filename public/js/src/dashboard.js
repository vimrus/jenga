var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
    render: function () {
        return (
            <div>
            <Header/>
            <RouteHandler/>
            </div>
            );
    }
});
