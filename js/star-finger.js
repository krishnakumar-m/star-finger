var star = {
    init : function() {
	    this.space = new Canvas('fld', window.innerWidth, window.innerHeight);
	    this.player = new Ship(new Point(0, 0), new Point(0, 0), 40, 20, 15, 20);
	    enemyShip = new EnemyShip(new Point(space.width, space.height / 2), new Point(-1, 0), 20, 20, 40, 10);
	    shipControl = false;
	    this.bullets = [];
	    this.enemyBullets = [];

	    paused = false;
	    Game.init(this.game,60);
	    window.requestAnimationFrame(function() {
		    Game.loop(this.game);
		});
	},
    game : function() {
	    this.space.clear();
	    this.player.show();
	    this.enemyShip.move();
	    this.enemyShip.show();
	    var thisBullet = null;
	    for(var i = this.bullets.length - 1; i >= 0;i--) {
		    this.bullets[i].move();
		    thisBullet = this.bullets[i];
		    thisBullet.show();
		    if(thisBullet.loc.x > this.space.width) {
			    this.bullets.splice(i, 1);
			}
		    else if(collisionCheck(thisBullet, enemyShip)) {
			    partSys.add(new ParticleSystem(100, thisBullet.loc.x, thisBullet.loc.y, this.space.ctx , config, false));
			    this.bullets.splice(i, 1);
			}
		}

	    for(var i = enemyBullets.length - 1; i >= 0;i--) {
		    enemyBullets[i].move();
		    enemyBullets[i].show();
		    if(enemyBullets[i].loc.x < 0) {
			    enemyBullets.splice(i, 1);
			}    
		    else if(collisionCheck(enemyBullets[i], player)) {
			    partSys.add(new ParticleSystem(100, enemyBullets[i].loc.x, enemyBullets[i].loc.y, space.ctx , config, false));
			    enemyBullets.splice(i, 1);
			}
		}
	    partSys.update();
	    partSys.show();
	},

    bindEvents : function() {
	    this.space.cvs.ontouchstart = function(event) {
		    var x = event.touches[0].pageX;
		    var y = event.touches[0].pageY;
		    if(typeof bullt !== 'undefined') {
			    window.clearInterval(bullt);
			}
		    var X = star.player.loc.x;
		    var Y = star.player.loc.y;
		    var W = star.player.w;
		    var H = star.player.h;
		    if((paused && x >= X && x <= X + W &&
		    y >= Y && y <= Y + H)  || !paused) {
			    shipControl = true;
			    star.player.loc.x = Math.round(x - W / 2);
			    star.player.loc.y = Math.round(y - H / 2);
			    reload = star.player.reload;
			    bullt = window.setInterval(function() {
				    reload--;
				    if(reload == 0) {
					    star.bullets.push(new Bullet(new Point(player.loc.x + player.w, player.loc.y), new Point(7, 0), 2, 2, 2));
					    star.bullets.push(new Bullet(new Point(player.loc.x + player.w, player.loc.y + player.h), new Point(7, 0), 2, 2, 2));
					    reload = star.player.reload;
					}
				}, Game.frameInterval);
			}
		};
	    this.space.cvs.ontouchmove = function(event) {
		    event.preventDefault();
		    if(shipControl) {
			    star.player.loc.x = Math.round(event.touches[0].pageX - star.player.w / 2);
			    star.player.loc.y = Math.round(event.touches[0].pageY - star.player.h / 2);
			}
		};
	    this.space.cvs.ontouchend = function() {
		    shipControl = false;
		    paused = true;
		    if(typeof bullt !== 'undefined') {
			    window.clearInterval(bullt);
			}
		};
	}
    };
