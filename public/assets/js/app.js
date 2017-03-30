$(document).ready(function() {
    var $winwidth = $(window).width();
    $("img.main-img").attr({
        width: $winwidth
    });
    $(window).bind("resize", function() {
        var $winwidth = $(window).width();
        $("img.main-img").attr({
            width: $winwidth
        });
    });
    $(".scrape").click(function(e) {
        e.preventDefault();
        $.get("/api/fetch").then(function(data) {
            $(".articles").remove();
            //***********this is not currently rerendering the available articles unless you refresh the page*************
            $.get("/").then(function(){
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            });
        });
    });
    $(".save-article").click(function() {
        var articleToSave = {};
        articleToSave.id = $(this).data("id");
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function(data) {
            location.reload();
        });
    });
    $(".delete").click(function() {
        var articleToDelete = {};
        articleToDelete.id = $(this).data("id");
        articleToDelete.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToDelete
        }).then(function(data) {
            location.reload();
        });
    });
});
