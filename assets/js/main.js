document.addEventListener("DOMContentLoaded", function(event) {
  init()
});

function init() {
  const boysLink = document.querySelector(".page-link.boys")
  const episodesLink = document.querySelector(".page-link.episodes")

  boysLink.onclick = (e) => {
    handleScroll(e, 'boys')
  };
  episodesLink.onclick = (e) => {
    handleScroll(e, 'episodes')
  };
}

function handleScroll(e, target) {
  e.preventDefault();

  const anchor = document.querySelector(`#${target}-anchor`)

  doScrolling(`#${target}-anchor`, 1000)
}

// LIB
// src: https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}

function doScrolling(element, duration) {
	var startingY = window.pageYOffset
  var elementY = getElementY(element)
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
	var diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
  var start

  if (!diff) return

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start
		// Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
