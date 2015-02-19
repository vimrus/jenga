var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Authentication = {
    statics: {
        willTransitionTo: function (transition) {
            if (!auth.loggedIn()) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
            }
        }
    }
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

var Login = React.createClass({
    mixins: [ Router.Navigation ],
    statics: {
        attemptedTransition: null
    },
    getInitialState: function () {
        return {
            error: false
        };
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var account  = this.refs.account.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        auth.login(account, password, function (loggedIn) {
            if (!loggedIn)
            return this.setState({ error: true });

        if (Login.attemptedTransition) {
            var transition = Login.attemptedTransition;
            Login.attemptedTransition = null;
            transition.retry();
        } else {
            this.replaceWith('/');
        }
        }.bind(this));
    },
    render: function () {
        var errors = this.state.error ? <p>Bad login information</p> : '';
        return (
            <div>
              <div>
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
    componentDidMount: function () {
        auth.logout(function(){
            this.replaceWith('/');
        }.bind(this));
    },

    render: function () {
        return <p>You are now logged out</p>;
    }
});
