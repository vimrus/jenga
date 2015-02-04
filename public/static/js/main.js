require.config({
    baseUrl: '',
    paths: {
        jquery: 'jquery/jquery-2.1.1',
        project: "../../../views/project",
        login: "../../../views/login",
        home: "../../../views/home",
    }
});

require(["project", "home", "login", "ready!", 'mmState'], function(project, home, login) {
    avalon.define({
        $id: "root",
        header: "views/header.html"
    })
    
    avalon.state("home", {
        controller: "root",
        url: '/',
        views: {
            "": {templateUrl: 'views/home.html'},
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
