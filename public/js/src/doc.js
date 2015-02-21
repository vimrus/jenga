var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var ProjectHeader = React.createClass({
    componentDidMount: function() {
        var projectId = this.getParams().projectId;
        client.projects.read(projectId).done(function(data){
            if (this.isMounted()) {
                this.setState({
                    project: data
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
            <div className="main-head">
              <div className="container">
                <ul className="main-nav">
                  <li><Link to="task">任务</Link></li>
                  <li><Link to="doc">文档</Link></li>
                  <li><Link to="topic">讨论</Link></li>
                </ul>
                <h1>Dashboard</h1>
              </div>
            </div>
            );
    }
});

var Doc = React.createClass({
    mixins: [ Authentication ],

    render: function () {
        return (
            <div>
              <Header/>
              <div className="main">
                <ProjectHeader/>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});
