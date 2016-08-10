
function findNearestTarget(isPlayer) {
	if(isPlayer) {
		var  len= enemies.length;
                if(len === 0) { return new Point(0, 0); }
		var pos = enemies[getRandomInt(0, len - 1)].loc;

		return new Point(pos.x, pos.y);
	    }

	return new Point(player.loc.x,  player.loc.y);
    }

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
    space.ctx.save();
        space.ctx.shadowBlur = 5;
	space.ctx.shadowColor = 'White';
	space.rect(this.loc.x, this.loc.y, this.w, this.h, this.color, this.color);
	space.ctx.restore();

    };
