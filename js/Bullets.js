Bullet.prototype = Object.create(Body.prototype);
function Bullet(loc,vel,w,h,hitpoints) {
	Body.call(this, loc, vel, w, h);
	this.hp = hitpoints;
    }
Bullet.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'white', 'white');

    };
    
EnemyBullet.prototype = Object.create(Bullet.prototype);
function EnemyBullet(loc,vel,w,h,hp) {
	Bullet.call(this, loc, vel, w, h,hp);
    }
EnemyBullet.prototype.show = function() {
	space.rect(this.loc.x, this.loc.y, this.w, this.h, 'white', 'yellow');

    };

