var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Header = React.createClass({
    mixins: [ Authentication ],
    getInitialState: function() {
        return {
            username: '',
        };
    },

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
    render: function () {
        return (
            <header>
            <div>
              <h1><Link to="app">Jenga</Link></h1>
              <form>
                <input id="searchBox" name="q" type="text" />
              </form>
              <ul>
              </ul>
              <ul>
               <li><Link to="dashboard">{this.state.username}</Link></li>
              </ul>
            </div>
            </header>
            );
    }
});
