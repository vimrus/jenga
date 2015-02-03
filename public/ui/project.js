define(["avalon", "text!./project.html"], function(avalon, project) {
    avalon.templateCache.project = project
    avalon.define({
        $id: "project",
        stages: [
        [{id:1,title:'task'}, {id:2,title:'task2'}],
        [{id:1,title:'task'}, {id:2,title:'task2'}],
        ],
    })
    avalon.vmodels.root.page = "project"
})
