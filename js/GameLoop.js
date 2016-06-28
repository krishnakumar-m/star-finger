var Game = {
    init : function(game,fps) {
	this.frameInterval = 1000 / fps;
	this.lastTime = new Date().getTime();
	this.game = game;
	this.loop();
    },
   loop : function () {
        var now = new Date().getTime();
	var elapsed = now - this.lastTime;
	if(elapsed >= this.frameInterval) {
	        this.game();
		this.lastTime = new Date().getTime();
	    }
	this.timer = window.requestAnimationFrame(loop);
    },
    pause : function() {
	window.cancelAnimationFrame(this.timer);
    }
};


