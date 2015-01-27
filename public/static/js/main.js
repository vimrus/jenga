require(['mmRouter'], function() {
    var model = avalon.define({
        $id: 'root',
        tasks: [{id:1,title:'task'}],
    })

    avalon.history.start({
        basepath: ''
    })
    avalon.scan()
})
