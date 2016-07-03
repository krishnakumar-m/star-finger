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
Powerup
*/
Powerup.prototype = Object.create(Body.prototype);
function Powerup(loc,vel,w,h,life,power) {
	Body.call(this, loc, vel, w, h);
	this.life = life;
	this.power = power;
    }
Powerup.prototype.show = function() {
    space.rect(this.loc.x,this.loc.y,this.w,this.h,'red','white');
    space.text(this.power,this.loc.x,this.loc.y+this.h,'Black','10px Arial');
};
/**
Normal ship
*/
Ship.prototype = Object.create(Body.prototype);
function Ship(loc,vel,w,h,life) {
	Body.call(this, loc, vel, w, h);
	this.life = life;
	this.counter = 0;
	this.isPlayer = true;
	this.setWeapon('twingun');
    }

Ship.prototype.show = function() {
	var h4 = this.h / 4;
	var w4 = this.w / 4;
	space.rect(this.loc.x, this.loc.y, this.w, h4, 'white', 'white');
	space.rect(this.loc.x + w4, this.loc.y + h4, w4, 2 * h4, 'white', 'blue');
	space.rect(this.loc.x, this.loc.y + 3 * h4, this.w, h4, 'white', 'white');
    };
Ship.prototype.setWeapon = function(weaponId) {
    this.weapon = weaponId;
    this.fireWeapon = weapons[this.weapon].fire;
    this.reload = weapons[this.weapon].reload;
};
Ship.prototype.tryWeapon = function() {
    this.counter = (this.counter + 1) % this.reload;
	if(this.counter == 0) {
	        return this.fireWeapon(this);
	    }
};

/*
Extend all enemy ships from the below class
*/
EnemyShip.prototype = Object.create(Ship.prototype);
function EnemyShip(loc,vel,w,h,life) {
	Ship.call(this, loc, vel, w, h,life);
	this.isPlayer = false;
	//this.setWeapon('oneshot');
	
    }
EnemyShip.prototype.move = function() {
	/*var temp = this.loc;
	do {
		var dx = -1;
		var dy = Math.round(Math.random() * 2) - 1;
		temp.add(new Point(dx, dy));

	    }while(temp.y < 0 || temp.y + this.w > space.width);
	this.loc = temp;*/
	this.loc.add(this.vel);
	var bllts = this.tryWeapon();
	if(bllts) {
	   enemyBullets = enemyBullets.concat(bllts);
	}
    };
EnemyShip.prototype.show = function() {
	var h4 = this.h / 4;
	var w4 = this.w / 4;
	space.rect(this.loc.x, this.loc.y, this.w, h4, 'red', 'red');
	space.rect(this.loc.x + 2 * w4, this.loc.y + h4, w4, 2 * h4, 'white', 'white');
	space.rect(this.loc.x, this.loc.y + 3 * h4, this.w, h4, 'red', 'red');
    };
    
/*
Tiny ship
*/
Mouse.prototype = Object.create(EnemyShip.prototype);

function Mouse(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('oneshot');
}
	
Mouse.prototype.show = function() {
	var h3 = this.h / 3;
	var w3 = this.w / 3;
	space.rect(this.loc.x+w3, this.loc.y, this.w, h3, 'red', 'red');
	space.rect(this.loc.x, this.loc.y + h3,this.w, h3, 'red', 'red');
	space.rect(this.loc.x+w3, this.loc.y+2*h3, this.w, h3, 'red', 'red');
    }; 
    
/* Rat - bigger version of mouse */
Rat.prototype = Object.create(EnemyShip.prototype);

function Rat(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('homer');
}
	
Rat.prototype.show = function() {
	var h3 = this.h / 3;
	var w3 = this.w / 3;
	space.rect(this.loc.x+w3, this.loc.y, this.w, h3, 'white', 'white');
	space.rect(this.loc.x, this.loc.y + h3, this.w, h3, 'red', 'red');
	space.rect(this.loc.x+w3, this.loc.y+2*h3, this.w, h3, 'white', 'white');
    }; 
    
/* Warbird - staircase ship */
Warbird.prototype = Object.create(EnemyShip.prototype);

function Warbird(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('3shot');
}
	
Warbird.prototype.show = function() {
	var h = this.h / 5;
	var w = this.w / 5;
	var w3 = 3*w;
	space.rect(this.loc.x+2*w, this.loc.y, w3, h, 'white', 'white');
	space.rect(this.loc.x+w, this.loc.y + h, w3, h, 'red', 'red');
	space.rect(this.loc.x, this.loc.y+2*h, w3, h, 'white', 'white');
	space.rect(this.loc.x+w, this.loc.y+3*h, w3, h, 'red', 'red');
	space.rect(this.loc.x+2*w, this.loc.y + 4*h, w3, h, 'white', 'white');
    }; 
