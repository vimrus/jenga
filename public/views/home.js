riot.tag('home', '<header></header> <footer></footer>', function(opts) {

  this.on('mount', function(){
    $.getJSON("/api/members/me").done(function(data){
        this.me = data
    }).fail(function(jqXHR){
        if(jqXHR.status == 401) {
            riot.route("login")
        } 
    })
  })

});
