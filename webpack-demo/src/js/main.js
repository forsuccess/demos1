var $ = require('../lib/jquery-2.1.1.min.js')
var Carousel = require('./carousel.js')
var	GoTop = require('./gotop.js')
var	AddMore = require('./addmore.js')

		Carousel.init($('.carousel-ct'))
		GoTop.init()
		AddMore.init($('.sign'))