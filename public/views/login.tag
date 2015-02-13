<login>
  <div class="login-box">
    <h1>登录</h1>
    <form id="login-form" class="form" action="#" method="post" name="signin-form">
      <div class="form-group"> 
      <label class="control-label" for="email">用户名</label>
      <input type="text" class="form-control" id="account" name="account"> 
      </div>
      <div class="form-group"> 
      <label class="control-label" for="pwd">密码</label>
      <input type="password" class="form-control" id="pwd" name="pwd">
      </div>
      
      <button id="loginBtn" class="btn btn-success">登录</button>
    </form>
  </div>

  this.on('mount', function(){
    $.getJSON("/api/members/me").done(function(data){
        riot.route("home")
    }).fail(function(jqXHR){
        if(jqXHR.status != 401) {
            riot.route("home")
        } 
    })
  })
</login>
