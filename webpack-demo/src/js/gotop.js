var $ = require('../lib/jquery-2.1.1.min.js')
	GoTop = (function(){
		function _GoTop(){
			this.init();
			this.createNode();
			this.bindEvent();
		}
		_GoTop.prototype.init = function(){
			this.ct = $('<div class="gotop-ct"></div>')
			this.target = $('<div class="target"><a class="iconfont" href="javascript:void(0)">&#xe617;</a></div>')
		}
		_GoTop.prototype.createNode = function(){
			var $this = this;
			$('body').append($this.ct)
			$this.ct.append($this.target)
			$this.target.hide()
		}
		_GoTop.prototype.bindEvent = function(){
			var $this = this;
			$(window).on('scroll',function(){
				if ($(window).scrollTop()>100) {
					$this.target.show()
				}else{
					$this.target.hide()
				}
			})
			$this.target.on('click',function(){
				$(window).scrollTop(0);
			})
		}
		return {
			init: function(){
				new _GoTop()
			}
		}
	})();

	module.exports = GoTop;

