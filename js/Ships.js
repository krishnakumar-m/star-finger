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
   /* space.rect(this.loc.x,this.loc.y,this.w,this.h,'red','white');
    space.text(this.power,this.loc.x,this.loc.y+this.h,'Black','10px Arial');*/
    space.ctx.drawImage(sprites[this.power],this.loc.x,this.loc.y);
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
	this.shipType = 'crosswing';
	this.shield = false;
	this.shieldHealth = 0;
    }

Ship.prototype.show = function() {
        space.ctx.drawImage(ships[this.shipType].sprite,this.loc.x,this.loc.y);
};
Ship.prototype.setWeapon = function(weaponId) {
    this.weapon = weaponId;
    this.fireWeapon = weapons[weaponId].fire;
    this.reload = weapons[weaponId].reload;
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
	this.shipType = 'raider';
	//this.setWeapon('oneshot');
	
    }
EnemyShip.prototype.move = function() {
	this.loc.add(this.vel);
	var bllts = this.tryWeapon();
	if(bllts) {
	   enemyBullets = enemyBullets.concat(bllts);
	}
    };
    
/*
Tiny ship
*/
Mouse.prototype = Object.create(EnemyShip.prototype);

function Mouse(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('oneshot');
	this.shipType = 'mouse';
}
	
/* Rat - bigger version of mouse */
Rat.prototype = Object.create(EnemyShip.prototype);

function Rat(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('homer');
	this.shipType = 'rat';
}

/* Warbird - staircase ship */
Warbird.prototype = Object.create(EnemyShip.prototype);

function Warbird(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h,life);
	this.setWeapon('3shot');
	this.shipType ='warbird';
}
	
/* Rock */

Rock.prototype = Object.create(Body.prototype);

function Rock(loc,vel,w,h,life,img) {
	Body.call(this, loc, vel, w, h);
	this.image = img;
	this.life = life;
}

Rock.prototype.show = function() {
        space.ctx.drawImage(this.image,this.loc.x,this.loc.y);
};
