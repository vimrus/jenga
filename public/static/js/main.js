require.config({
    baseUrl: '',
    paths: {
        jquery: 'jquery/jquery-2.1.1',
        project: "../../../ui/project",
        login: "../../../ui/login",
        home: "../../../ui/home",
    }
});

require(['mmRouter'], function() {
    avalon.templateCache.empty = "&nbsp;"
    avalon.define({
        $id: "root",
        page: "empty"
    })
    
    avalon.router.get("/", function(){
        require(['home'], function() {
            avalon.log("home")
        });
    })

    avalon.router.get("/login", function(){
        require(['login'], function() {
            avalon.log("login")
        });
    })

    avalon.router.get("/:project", function(){
        require(['project'], function() {
            avalon.log("project")
        });
    })

    avalon.history.start({
        basepath: "/"
    })

    avalon.scan()
});
