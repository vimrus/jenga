require.config({
    baseUrl: '',
    paths: {
        jquery: 'static/js/jquery-2.1.1',
        avalon: "static/js/avalon/avalon",
        text: 'static/js/require/text',
        domReady: 'static/js/require/domReady',
        css: 'static/js/require/css.js'
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});


require(['avalon', "domReady!"], function() {
    avalon.templateCache.empty = "&nbsp;"
    avalon.define({
        $id: "root",
        header: "header",
        footer: "footer",
        page: "empty"
    })
    avalon.scan(document.body)
    
    require(['./modules/index/index'], function() {
    });
    
    require(['./modules/user/login'], function() {
    });
    
});
