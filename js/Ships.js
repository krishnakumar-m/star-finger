function Body(loc,vel,w,h) {
	this.loc = loc;
	this.vel = vel;
	this.h = h;
	this.w = w;
    }
Body.prototype.move = function() {
	this.loc.add(this.vel);

    };

/**
Normal ship
*/
Ship.prototype = Object.create(Body.prototype);
function Ship(loc,vel,w,h,reload,life) {
	Body.call(this, loc, vel, w, h);
	this.reload = reload;
	this.life = life;
    }

Ship.prototype.show = function() {
	var h4 = this.h / 4;
	var w4 = this.w / 4;
	space.rect(this.loc.x, this.loc.y, this.w, h4, 'white', 'white');
	space.rect(this.loc.x + w4, this.loc.y + h4, w4, 2 * h4, 'white', 'blue');
	space.rect(this.loc.x, this.loc.y + 3 * h4, this.w, h4, 'white', 'white');
    };
EnemyShip.prototype = Object.create(Ship.prototype);
function EnemyShip(loc,vel,w,h,reload,life) {
	Ship.call(this, loc, vel, w, h,reload,life);
	this.counter = 0;
    }
EnemyShip.prototype.move = function() {
	var temp = this.loc;
	do {
		var dx = -1;
		var dy = Math.round(Math.random() * 2) - 1;
		temp.add(new Point(dx, dy));

	    }while(temp.y < 0 || temp.y + this.w > space.width);
	this.loc = temp;
	this.counter = (this.counter + 1) % this.reload;
	if(this.counter == 0) {
		var loc = new Point(this.loc.x, this.loc.y + this.h / 2);
		var vel = new Point(-5, 0);
		var bullet = new EnemyBullet(loc, vel, 6, 2);
		enemyBullets.push(bullet);
	    }
    };
EnemyShip.prototype.show = function() {
	var h4 = this.h / 4;
	var w4 = this.w / 4;
	space.rect(this.loc.x, this.loc.y, this.w, h4, 'red', 'red');
	space.rect(this.loc.x + 2 * w4, this.loc.y + h4, w4, 2 * h4, 'white', 'white');
	space.rect(this.loc.x, this.loc.y + 3 * h4, this.w, h4, 'red', 'red');
    };
