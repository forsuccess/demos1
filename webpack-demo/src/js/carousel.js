var $ = require('../lib/jquery-2.1.1.min.js')
	Carousel = (function(){
		function _Carousel(ct){
			this.$ct = $(ct);
			this.init();
			this.bind();
			this.show(0)
			this.playAuto();
		}
		_Carousel.prototype.init = function(){
			this.$imgCt = this.$ct.find('.img-ct');
			this.$imgItems = this.$imgCt.children();
			this.$itemLength = this.$imgItems.length;
			this.$next =this.$ct.find('.next');
			this.$pre = this.$ct.find('.previous');
			this.$imgSing = this.$ct.find('.img-sign');
			this.defaultIndex = 0;
			this.clock = false;
		}
		_Carousel.prototype.bind = function(){
			var _this = this;
			this.$next.on('click',function(){
				_this.playNext();
			})
			this.$pre.on('click',function(){
				_this.playPre();
			})
		}
		_Carousel.prototype.playNext = function(){
			this.show((this.defaultIndex+1)%this.$itemLength)
		}
		_Carousel.prototype.playPre = function(){
			this.show((this.$itemLength+this.defaultIndex-1)%this.$itemLength)
		}
		_Carousel.prototype.playSign = function(){
			this.$imgSing.children().removeClass('sign-hover').eq(this.defaultIndex).addClass('sign-hover')
		}
		_Carousel.prototype.playAuto = function(){
			var _this = this;
			setInterval(function(){
				_this.playNext();
			},3000)
		}
		_Carousel.prototype.show = function(index){
			var _this = this
			if (this.clock) {
				return
			}
			this.clock = true;
			this.$imgItems.eq(this.defaultIndex).fadeOut(600)
			this.$imgItems.eq(index).fadeIn(600,function(){
				_this.playSign();
				_this.clock = false;
			})
			this.defaultIndex = index;
		}
		
		return {
			init: function($ct){
				$ct.each(function(idx,node){
					new _Carousel(node)
				})
			}
		}
	})();

	module.exports = Carousel;
