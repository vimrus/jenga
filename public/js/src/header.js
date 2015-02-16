var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Header = React.createClass({
    render: function () {
        return (
            <header>
            <ul>
            <li><Link to="app">Dashboard</Link></li>
            </ul>
            </header>
            );
    }
});
