var basegun = {
    dmg : 4,
    bulletColor : 'Red',
    vel : new Point(3, 0),
    w : 5,
    h : 2,
    type : 'norm',
    relativeY : relativePos,
    reload : 40,
    counter : 0

    };


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
	space.ctx.drawImage(sprites[this.power], this.loc.x, this.loc.y);
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
	this.guns = {};

	this.setWeapon = function(pos,gun) {
		this.guns[pos] = gun;
		if(pos != 0.5) {
			this.guns[1 - pos] = gun;
		    }
	    };

	this.setWeapon(0.3, basegun);
	this.shipType = 'crosswing';
	this.shield = false;
	this.shieldHealth = 0;

    }

Ship.prototype.show = function() {
        space.ctx.drawImage(playerSprite, this.loc.x, this.loc.y);
    };
/*Ship.prototype.setWeapon = function(weaponId) {
 this.weapon = weaponId;
 this.fireWeapon = weapons[weaponId].fire;
 this.reload = weapons[weaponId].reload;
 };



 Ship.prototype.tryWeapon = function() {
 this.counter = (this.counter + 1) % this.reload;
 if(this.counter == 0) {
 return this.fireWeapon(this);
 }
 };*/

/*
 Ship.prototype.setWeapon = function(pos,gun) {
 this.guns[pos] = gun;
 if(pos!=0.5) {
 this.guns[1-pos] = gun;
 }
 };*/

Ship.prototype.tryWeapon = function() {
	for(var i in this.guns) {
		this.guns[i].counter = (this.guns[i].counter + 1) % this.guns[i].reload;
		if(this.guns[i].counter == 0) {
			return this.fireWeapon(i);
		    }
	    }
    };

Ship.prototype.fireWeapon = function(i) {
	var loc = new Point(this.loc.x, this.loc.y + this.guns[i].relativeY * this.w);
	this.guns[i].loc = loc;
	return new CustomBullet(this.guns[i]);
    };

var DEG2RAD = Math.PI / 180;
/*
 Extend all enemy ships from the below class
 */
EnemyShip.prototype = Object.create(Ship.prototype);
function EnemyShip(loc,vel,w,h,life,movParams) {
	Ship.call(this, loc, vel, w, h, life);
	this.isPlayer = false;
	this.shipType = 'raider';
	//this.setWeapon('oneshot');

	this.movParams = movParams || {
	    A: getRandomInt(-5, -1),
	    B: getRandomInt(-2, 2),
	    C: getRandomInt(-5, 5),
	    D: getRandomInt(-5, 5),
	    E: getRandomInt(-2, 2),
	    F: getRandomInt(-2, 2),
	    G: getRandomInt(-5, 5),
	    H: getRandomInt(-5, 5)

	    };
	this.t = 0;

    }
EnemyShip.prototype.move = function() {
        this.vel.x = this.movParams.A + this.movParams.B * Math.sin((this.movParams.C * this.t + this.movParams.D) * DEG2RAD);
	this.vel.y = this.movParams.E + this.movParams.F * Math.sin((this.movParams.G * this.t + this.movParams.H) * DEG2RAD);


	this.loc.add(this.vel);
	if(this.loc.y <= 0 || (this.loc.y + this.h) >= space.height) {
		this.movParams.E = -this.movParams.E;
		this.movParams.F = -this.movParams.F;
	    }
	var bllts = this.tryWeapon();
	if(bllts) {
		enemyBullets = enemyBullets.concat(bllts);
	    }
	this.t++;

    };

/*
 Tiny ship
 */
Mouse.prototype = Object.create(EnemyShip.prototype);

function Mouse(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h, life);
	this.setWeapon('oneshot');
	this.shipType = 'mouse';
    }

/* Rat - bigger version of mouse */
Rat.prototype = Object.create(EnemyShip.prototype);

function Rat(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h, life);
	this.setWeapon('homer');
	this.shipType = 'rat';
    }

/* Warbird - staircase ship */
Warbird.prototype = Object.create(EnemyShip.prototype);

function Warbird(loc,vel,w,h,life) {
	EnemyShip.call(this, loc, vel, w, h, life);
	this.setWeapon('3shot');
	this.shipType = 'warbird';
    }

/* Rock */

Rock.prototype = Object.create(Body.prototype);

function Rock(loc,vel,w,h,life,img) {
	Body.call(this, loc, vel, w, h);
	this.image = img;
	this.life = life;
    }

Rock.prototype.show = function() {
        space.ctx.drawImage(this.image, this.loc.x, this.loc.y);
    };



CustomShip.prototype = Object.create(Ship.prototype);
function CustomShip(shipParams,movParams) {
	Ship.call(this, shipParams.loc, new Point(0, 0), shipParams.w, shipParams.h, shipParams.life);
	this.isPlayer = false;
	this.shipType = shipParams.shipType;
	//this.setWeapon('oneshot');
	this.guns = shipParams.guns;
	this.movParams = movParams || {
	    A: getRandomInt(-5, -1),
	    B: getRandomInt(-2, 2),
	    C: getRandomInt(-5, 5),
	    D: getRandomInt(-5, 5),
	    E: getRandomInt(-2, 2),
	    F: getRandomInt(-2, 2),
	    G: getRandomInt(-5, 5),
	    H: getRandomInt(-5, 5)

	    };
	this.t = 0;

    }
CustomShip.prototype.move = function() {
        this.vel.x = this.movParams.A + this.movParams.B * Math.sin((this.movParams.C * this.t + this.movParams.D) * DEG2RAD);
	this.vel.y = this.movParams.E + this.movParams.F * Math.sin((this.movParams.G * this.t + this.movParams.H) * DEG2RAD);


	this.loc.add(this.vel);
	if(this.loc.y <= 0 || (this.loc.y + this.h) >= space.height) {
		this.movParams.E = -this.movParams.E;
		this.movParams.F = -this.movParams.F;
	    }

	var bllts = this.tryWeapon();
	if(bllts) {
		enemyBullets = enemyBullets.push(bllts);
	    }
	this.t++;
    };

CustomShip.prototype.tryWeapon = function() {
	//var n = this.guns.length;

	for(i in this.guns) {
		this.guns[i].counter = (this.guns[i].counter + 1) % this.guns[i].reload;
		if(this.guns[i].counter == 0) {
			return this.fireWeapon(i);
		    }
	    }
    };

CustomShip.prototype.fireWeapon = function(i) {
	var loc = new Point(this.loc.x, this.loc.y + this.guns[i].relativeY * this.w);
	this.guns[i].loc = loc;
	//alert('this');
	//enemyBullets.push(new CustomBullet(this.guns[i]));
	return new CustomBullet(this.guns[i]);
    };

CustomShip.prototype.show = function() {

        space.ctx.drawImage(ships[this.shipType].sprite, this.loc.x, this.loc.y);
    };
