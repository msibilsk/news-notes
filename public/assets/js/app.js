$(document).ready(function() { 
	var $winwidth = $(window).width();
	$("img.main-img").attr({
		width: $winwidth
	});
	$(window).bind("resize", function(){ 
		var $winwidth = $(window).width();
		$("img.main-img").attr({
			width: $winwidth
		});
	});
	$(".scrape").click(function(e) {
		e.preventDefault();
		$.get("/scrape");
	});
	$(".save-article").click(function(){
		$.post("/");
	});

}); 

