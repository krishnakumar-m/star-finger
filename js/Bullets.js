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
	this.vel = findNearestTarget(isPlayer);
	this.vel.sub(this.loc);
	this.vel = this.vel.norm();
	this.vel.x = Math.round(this.vel.x) * 5;
	this.vel.y = Math.round(this.vel.y) * 5;
    }
Homer.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'Green', 'Green');
    };

Homer.prototype.move = function() {
	this.loc.add(this.vel);
    };


function findNearestTarget(isPlayer) {
	if(isPlayer) {
		var  len= enemies.length;
                if(len === 0) { return new Point(0, 0); }
		var pos = enemies[getRandomInt(0, len - 1)].loc;

		return new Point(pos.x, pos.y);
	    }

	return new Point(player.loc.x,  player.loc.y);
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

CustomBullet.prototype = Object.create(Body.prototype);
function CustomBullet(bulletParams) {
        var vel = bulletParams.vel;
	
	Body.call(this, bulletParams.loc, vel, bulletParams.w, bulletParams.h);
	if(bulletParams.type == 'targ') {
		this.isPlayer = bulletParams.isPlayer;
		this.vel = findNearestTarget(this.isPlayer);
		this.vel.sub(this.loc);
		this.vel = this.vel.norm();
		this.vel.x = Math.round(this.vel.x) * 5;
		this.vel.y = Math.round(this.vel.y) * 5;
	    }
	this.color = bulletParams.bulletColor;
	this.hp = bulletParams.dmg;
    }
CustomBullet.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, this.color, this.color);

    };
