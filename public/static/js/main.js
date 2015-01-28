require(['mmRouter'], function() {
    var model = avalon.define({
        $id: 'root',
        stages: [
            [{id:1,title:'task'}, {id:2,title:'task2'}],
            [{id:1,title:'task'}, {id:2,title:'task2'}],
        ],
    })

    avalon.scan()
})
