var Router =  ReactRouter;
var RouteHandler = Router.RouteHandler;

var Login = React.createClass({
    render: function () {
        return (
            <div>
              <div class="login-box">
                <h1>登录</h1>
                <form id="login-form" class="form">
                  <div class="form-group"> 
                    <label class="control-label" for="mail">邮箱或用户名</label>
                    <input type="text" class="form-control" id="mail" name="mail" />
                  </div>
                  <div class="form-group"> 
                    <label class="control-label" for="password">密码</label>
                    <input type="password" class="form-control" id="password" name="password" />
                  </div>
                  <button id="loginBtn" class="btn btn-success">登录</button>
                </form>
              </div>
              <RouteHandler/>
            </div>
            );
    }
});
