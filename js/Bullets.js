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
    }
Homer.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'red', 'blue');

    };

Homer.prototype.move = function() {

        if(this.life <= 50) {
		if(this.loc.x > this.target.x) {
			this.loc.x -= this.vel.x; 
		} else if(this.loc.x < this.target.x) {
			this.loc.x += this.vel.x; 
		} 
		if(this.loc.y > this.target.y) {
			this.loc.y -= this.vel.y;
		} else if(this.loc.y < this.target.y) {
			this.loc.y += this.vel.y;
		}
	    }
	else {
		this.loc.x += this.vel.x;    
		this.loc.y += this.vel.y;
	    }
	this.life++;
    };


function findNearestTarget(isPlayer) {
	if(isPlayer) {
		var  len= enemies.length;

		return enemies[getRandomInt(0, len - 1)].loc;
	    }

	return player.loc;
    }
    
    
 Laser.prototype = Object.create(Bullet.prototype);
 function Laser(loc,hp) {
	Bullet.call(this, new Point(0,loc.y), new Point(-loc.x,0), loc.x, 5, 10);
    }
 Laser.prototype.show = function() {
     space.rect(this.loc.x, this.loc.y, this.w, this.h, 'white', 'yellow');

 };
 
