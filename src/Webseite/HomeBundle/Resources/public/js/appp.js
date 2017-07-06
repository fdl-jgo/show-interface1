

function fireDom() {

	
	console.log($(document.body).height())
	$('#site').height($(document.body).height());

	$(window).resize(function(){
		$('#site').height($(document.body).height());
	});


	$('.btLanguage').click(function () {		
			$(".dropdown-content").slideToggle();	
	});
	$('.dropdown-content span').click(function () {		
			if($(this).text() === "Deutsch"){
				console.log(window.location.pathname)
			}
			$(".dropdown-content").slideToggle();
	});
	$('.btHome > img').click(function() {
	});

	//on site

	// function runToggle() {
	// 	$(".myContain div").empty();
	// }
	// function initToggle() {
		
	// }
	// console.log('click')
}

