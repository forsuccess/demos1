	var $ = require('../lib/jquery-2.1.1.min.js')
	AddMore = (function(){
		addMore = function($btn){
			this.init($btn);
			this.bind();
		}
		addMore.prototype = {
			init: function($btn){
				this.$btn = $btn;
				this.PageCount = 10;
				this.curPage = 1;
				this.clock = false;
				this.colSumHeight = []
				this.nodeWidth = $('.newsBox>.items').outerWidth(true)
				this.colNum = parseInt($('.newsBox').width()/this.nodeWidth)
				for(var i=0;i<this.colNum;i++){
					this.colSumHeight.push(0)
				}
			},
			bind: function(){
				var _this = this;
				this.$btn.on('click',function(){
					_this.getData();
				})
			},
			getData: function(){
				var _this = this
				if (this.clock) {
					return
				}
				this.clock = true
				$.ajax({
					url: 'http://platform.sina.com.cn/slide/album_tech',
					method: 'get',
					dataType: 'jsonp',
					jsonp:"jsoncallback",
					data: {
					app_key: '1271687855',
					num: _this.PageCount,
					page: _this.curPage
				}
				}).done(function(res){
					_this.render(res.data)
				})
			},
			render: function(datalist){
				var _this = this
				$.each(datalist,function(){
					var $node = _this.getHtml(this)
					$node.find('img').on('load',function(){
						$('.newsBox').append($node)
							_this.waterFall($node)
					})
				})
				this.curPage++
				this.clock = false
			},
			getHtml: function(data){
				var html = ''
					html+='<li class="items">'
					html+='<a href="'+data.url+'"><img src="'+data.img_url+'" alt=""></a>'
		    		html+='<h4 class="title">'+data.short_name+'</h4>'
					html+='<p class="describe">'+data.short_intro+'</p>'
					html+='</li>'
					return $(html)
			},
			waterFall: function($node){
				var minValue = Math.min.apply(null,this.colSumHeight)
				var minIndex = this.colSumHeight.indexOf(minValue)
				$node.css({
					left: this.nodeWidth*minIndex,
					top: minValue
				})
				this.colSumHeight[minIndex] += $node.outerHeight(true)
				$('.newsBox').height(Math.max.apply(null,this.colSumHeight))
			}
		}
		return {
			init: function($btn){
				new addMore($btn);
			}
		}
	})();

	module.exports = AddMore;