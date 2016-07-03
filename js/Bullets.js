Bullet.prototype = Object.create(Body.prototype);
function Bullet(loc,vel,w,h,hitpoints) {
	Body.call(this, loc, vel, w, h);
	this.hp = hitpoints;
    }
Bullet.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'red', 'red');

    };

EnemyBullet.prototype = Object.create(Bullet.prototype);
function EnemyBullet(loc,vel,w,h,hp) {
	Bullet.call(this, loc, vel, w, h, hp);
    }
EnemyBullet.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'green', 'yellow');

    };


Homer.prototype = Object.create(Bullet.prototype);
function Homer(loc,vel,w,h,hp,isPlayer) {
	Bullet.call(this, loc, vel, w, h, hp);
	this.isPlayer = isPlayer;
	this.target = findNearestTarget(isPlayer);
	this.life = 0;
	this.prevLoc = loc;
	this.lifeTimer = 20;
    }
Homer.prototype.show = function() {
	//space.rect(this.loc.x, this.loc.y, this.w, this.h, 'red', 'blue');
	var tmp = space.ctx.lineWidth;
	space.ctx.beginPath();
	space.ctx.lineWidth = 5;
	space.ctx.strokeStyle = 'Green';
	space.ctx.moveTo(this.prevLoc.x, this.prevLoc.y);
	space.ctx.lineTo(this.loc.x, this.loc.y);
	space.ctx.stroke();
	space.ctx.lineWidth = tmp;
	

    };

Homer.prototype.move = function() {

	if(this.lifeTimer > 0) { 
		var targetX = this.target.x - this.loc.x;
		var targetY = this.target.y - this.loc.y;
		var rotation = Math.atan2(targetY, targetX) * 180 / Math.PI;
		var vx = 5 * (90 - Math.abs(rotation)) / 90;
		var vy;
		if(rotation < 0) {
			vy = -5 + Math.abs(vx);//Going upwards.
		    }
		else {
			vy = 5 - Math.abs(vx);//Going downwards.
		    }
		this.vel = new Point(Math.round(vx), Math.round(vy));

		this.lifeTimer--;
		
	    }
	this.prevLoc = {x :this.loc.x,y:this.loc.y};
	this.loc.add(this.vel);
    };


function findNearestTarget(isPlayer) {
	if(isPlayer) {
		var  len= enemies.length;

		return enemies[getRandomInt(0, len - 1)].loc;
	    }

	return {x : player.loc.x, y: player.loc.y};
    }


Laser.prototype = Object.create(Bullet.prototype);
function Laser(loc,hp) {
	Bullet.call(this, new Point(0, loc.y), new Point(-loc.x, 0), loc.x, 5, 10);
    }
Laser.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'white', 'yellow');

    };

Mine.prototype = Object.create(Bullet.prototype);
function Mine(loc,vel,hp,maxDist) {
	Bullet.call(this, loc, vel, 1, 1, hp);
	this.dist = maxDist;
    }
Mine.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, 1, 1, 'orange', 'orange');

    };

Mine.prototype.move = function() {

	if(this.dist == 0) {

	    }
	else {
		this.dist--;
	    }
    };
