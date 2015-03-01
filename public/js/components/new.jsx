var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Auth = require('./auth.jsx');
var Fluxxor = require('fluxxor');
var Header = require('./header.jsx');

var New = React.createClass({
    mixins: [ Auth.Authentication, Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("project")],
    getStateFromFlux: function() {
        return {
            error: this.getFlux().store("project").error,
        };
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var name = this.refs.name.getDOMNode().value;
        var desc = this.refs.desc.getDOMNode().value;
        this.getFlux().actions.project.add(name, desc);
    },

    render: function () {
        var errors = this.state.error ? <p>Bad Project information</p> : '';
        return (
            <div>
              <Header/>
              <div className="main">
                <div className="container">
                  <form onSubmit={this.handleSubmit}>
                    <div> 
                      <label>项目名称</label>
                      <input type="text" ref="name" name="name" />
                    </div>
                    <div> 
                      <label>项目名称</label>
                      <textarea ref="desc" name="desc" />
                    </div>
                    <button id="login-button">创建</button>
                    {errors}
                  </form>
                </div>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});
module.exports = New;
