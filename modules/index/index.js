define(["avalon", "text!./index.html"], function(avalon, index) {

    avalon.templateCache.index = index 
    avalon.define({
        $id: "index",
        name: "Jenga"
    })
    avalon.vmodels.root.page = "index"
})
