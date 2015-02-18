var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Header = React.createClass({
    getInitialState: function() {
        return {
            username: '',
        };
    },

    componentDidMount: function() {
        /*
        client.members.read('me').done(function(data){
            if (this.isMounted()) {
                this.setState({
                    username: data.name,
                });
            }
        }).fail(function(jqXHR) {
            if(jqXHR.status == 401) {
                //transition.redirect('/login');
            } 
        })
        */
    },
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
