/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

	function toogle(elementBTN, element) {
		let style = element.style.display
		if (style == "block") {
			element.style.display = "none"
			elementBTN.className = "fas fa-angle-down"
		} else {
			element.style.display = "block"
			elementBTN.className = "fas fa-angle-up"
		}
	}

	const picturesOfMe = 5;
	var currentMe = 0;
	// meWindow = element where pictures will be		next = 1  -> is it next? -1 -> previous
	function nextMeF(meWindow, next) {
		currentMe = currentMe + next
		if(currentMe < 0) {
			currentMe = picturesOfMe-1
		} else {
			currentMe %= picturesOfMe;
		}
		let img = "images/me" + (currentMe) + ".png";
		meWindow.src = img;
	}

	// toogle pictures of ME
	let meWindow = document.getElementById("ME")
	let nextMe = document.getElementById("nextMe")
	let previousMe = document.getElementById("previousMe")
	nextMe.addEventListener("click", function(){nextMeF(meWindow, 1)})
	previousMe.addEventListener("click", function(){nextMeF(meWindow, -1)})

	// same height of skills, technologies and employment
	let workBlocks = document.getElementsByClassName("workHeight")
	function workHeightF(){
		let maxHeight = 0
		for(let i=0; i<workBlocks.length; i++) {
			if (workBlocks[i].offsetHeight > maxHeight) {
				workBlocks[i].style.minHeight = "auto"
				workBlocks[i].style.height = "auto"
				maxHeight = workBlocks[i].offsetHeight
			}
		}
		// console.log("window", window.innerWidth, typeof(window.innerWidth))
		if (window.innerWidth < 740){
			maxHeight = "auto"
		} else {
			maxHeight += "px"
		}
		console.log("height", maxHeight)
		for(let i=0; i<workBlocks.length; i++) {
			workBlocks[i].style.minHeight = maxHeight;
			workBlocks[i].style.height = maxHeight;
		}
	}
	window.addEventListener("resize", function(){workHeightF()})
	window.addEventListener("load", function(){workHeightF()})


	// toogle descriptions of portfolio blocks
	let description1 = document.getElementById("description1")
	let description2 = document.getElementById("description2")
	let description3 = document.getElementById("description3")
	let description4 = document.getElementById("description4")
	let description5 = document.getElementById("description5")
	description1.style.display="none"
	description2.style.display="none"
	description3.style.display="none"
	description4.style.display="none"
	description5.style.display="none"
	let descriptionBTN1 = document.getElementById("descriptionBTN1");
	let descriptionBTN2 = document.getElementById("descriptionBTN2");
	let descriptionBTN3 = document.getElementById("descriptionBTN3");
	let descriptionBTN4 = document.getElementById("descriptionBTN4");
	let descriptionBTN5 = document.getElementById("descriptionBTN5");
	descriptionBTN1.addEventListener("click", function(){toogle(descriptionBTN1, description1)})
	descriptionBTN2.addEventListener("click", function(){toogle(descriptionBTN2, description2)})
	descriptionBTN3.addEventListener("click", function(){toogle(descriptionBTN3, description3)})
	descriptionBTN4.addEventListener("click", function(){toogle(descriptionBTN4, description4)})
	descriptionBTN5.addEventListener("click", function(){toogle(descriptionBTN5, description5)})

})(jQuery);
