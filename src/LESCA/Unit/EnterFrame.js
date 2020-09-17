module.exports = {
	go:true,

	init: function( fn = function(){} ) {
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
		this.time = new Date().getTime();
		this.fn = fn;
		this.frame();
	},

	destroy:function() {
		window.requestAnimFrame = function() {};
	},

	add:function(fn) {
		this.fn = (function(_super) {
			return function() {
				fn(arguments[0]);
				return _super.apply(this, arguments)
			}
		})(this.fn);
	},

	frame: function() {
		var t = this.getTime();
		this.fn(t);
		if(this.go) window.requestAnimFrame(this.frame.bind(this));
	},

	getTime:function() {
		return new Date().getTime() - this.time;
	},

	stop:function() {
		this.go = false;
	},

	play:function() {
		this.time = new Date().getTime();

		this.go = true;
		this.frame();
	}
	
}