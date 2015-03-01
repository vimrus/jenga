var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Login = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("auth")],
    getStateFromFlux: function() {
        return {
            error: this.getFlux().store("auth").getError(),
        };
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var account  = this.refs.account.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        this.getFlux().actions.auth.login(account, password);
    },
    render: function () {
        var errors = this.state.error ? <p>Bad login information</p> : '';
        return (
            <div>
              <div className="login-box">
                <h1>登录</h1>
                <form onSubmit={this.handleSubmit}>
                  <div> 
                    <label>邮箱或用户名</label>
                    <input type="text" ref="account" name="account" />
                  </div>
                  <div> 
                    <label>密码</label>
                    <input type="password" ref="password" name="password" />
                  </div>
                  <button id="login-button">登录</button>
                  {errors}
                </form>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});

var Logout = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("auth")],
    getStateFromFlux: function() {
        this.getFlux().actions.auth.logout();
        return {};
    },
    render: function () {
        return <p>Logged out</p>;
    }
});

module.exports = {
    Login: Login,
    Logout: Logout
};
