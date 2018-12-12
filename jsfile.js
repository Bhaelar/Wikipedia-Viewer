$(document).ready(function() {
	$("#find").click(function() {
		$("#display").html(" ");
		callWiki();
	});
	$("#random").click(function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
	});
	$("#search").keypress(function(e){
		if(e.which == 13) {
			$("#find").click();
		}
	} )
	function callWiki() {
		var keyword = $("#search").val();
		var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+keyword+"&callback=?";
		$.ajax({
		  url:url,
		  type: 'POST',
		  dataType: 'jsonp',
		  success: function(result){
			var data = result.query.pages;
			//alert(JSON.stringify(data));
			render(data);
		  },
		  error: function(err){
			console.log(err);
			alert('Oops something went wrong! Please try again.');
		  }
		});
 
	}
	function render(data) {
		var pageurl="http://en.wikipedia.org/?curid=";
		for(var i in data){
		  $("#display").append("<div id='resultdiv'><a target='_blank' href='"+pageurl+data[i].pageid+"'><h3 class='headers'>"+data[i].title+"</h3><p class='items'>"+data[i].extract+"</p></a></div>");
		}
	}
})