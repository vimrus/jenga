/*
require.config({
    baseUrl: '/static/js',
    paths: {
        jquery: "jquery/jquery-2.1.1.js",
        mmRouter: "avalon/mmRouter",
        mmState: "avalon/mmState",
        mmPromise: "avalon/mmPromise",
        mmHistory: "avalon/mmHistory",
        mmRequest: "avalon/mmRequest",
        project: "jenga/project",
        home: "jenga/home",
        login: "jenga/login",
    }
});

require(["mmRequest", "project", "home", "login", "ready!", 'mmState'], function(project, home, login) {
    avalon.define({
        $id: "root",
        header: "views/header.html"
    })
    
    avalon.state("home", {
        controller: "root",
        url: '/',
        views: {
            "": {templateUrl: 'views/home.html'},
        },
        onAfterLoad: function() {
             avalon.getJSON('/api/members/me', {}).done(function(data, status){
                 if(status == 401) {
                     window.location.href = '/login';
                 } else {
                     home.name = data.username; 
                 }
             });
        }
    })

    avalon.state("login", {
        controller: "root",
        url: '/login',
        views: {
            "": {templateUrl: 'views/login.html'}
        }
    })

    avalon.state("project", {
        controller: "root",
        url: '/:project',
        views: {
            "": {templateUrl: 'views/project.html'}
        }
    })

    avalon.history.start({
        basepath: "/"
    })

    avalon.scan()
})
*/
