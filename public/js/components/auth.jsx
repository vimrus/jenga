var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Authentication = {
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("auth")],
    statics: {
        willTransitionTo: function (transition) {
            if(!this.getFlux().store("auth").loggedIn()) {
                transition.redirect('/login');
            }
        }
    }
};

var Login = React.createClass({
    mixins: [ Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("auth")],
    statics: {
        willTransitionTo: function (transition) {
            if(this.getFlux().store("auth").loggedIn()) {
                transition.redirect('/');
            }
        },
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var account  = this.refs.account.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        this.getFlux().actions.auth.login({
            account: account,
            password: password,
        });
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
    statics: {
        willTransitionTo: function (transition) {
            this.getFlux().actions.auth.logout();
        },
    },
    render: function () {
        return <p>Logged out</p>;
    }
});

module.exports = {
    Authentication: Authentication,
    Login: Login,
    Logout: Logout
};

var auth = {
    login: function (account, password, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return;
        }
        pretendRequest(account, password, function (res) {
            if (res.authenticated) {
                client.opts.token = localStorage.token = res.token;
                if (cb) cb(true);
                this.onChange(true);
            } else {
                if (cb) cb(false);
                this.onChange(false);
            }
        }.bind(this));
    },

    getToken: function () {
        return localStorage.token;
    },

    logout: function (cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {}
};

function pretendRequest(account, password, cb) {
    setTimeout(function () {
        client.tokens.create({account: account, password: password}).done(function(data){
            cb({
                authenticated: true,
                token: data,
            });
        }).fail(function(){
            cb({authenticated: false});
        })
    }, 0);
}
