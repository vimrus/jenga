var Router =  ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <div>
            <RouteHandler/>
            </div>
            );
    }
});


var routes = (
        <Route name="app" path="/" handler={App}>
        <Route name="login" handler={Login}/>
        <DefaultRoute handler={Dashboard}/>
        </Route>
        );

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
