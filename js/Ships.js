var basegun = {
    dmg : 4,
    bulletColor : 'Red',
    vel : new Point(3, 0),
    w : 5,
    h : 1,
    type : 'norm',
    relativeY : 0,
    reload : 16,
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
		this.guns[pos].relativeY = pos;
		if(pos != 0.5) {
		        var cmpl = parseFloat((1 - pos).toFixed(1));
			this.guns[cmpl] = JSON.parse(JSON.stringify(gun));
			this.guns[cmpl].relativeY = cmpl;
		    }
	    };

	//this.setWeapon(0.3, basegun);
	this.shipType = 'crosswing';
	this.shield = false;
	this.shieldHealth = 0;

    }

Ship.prototype.show = function() {
        space.ctx.drawImage(playerSprite, this.loc.x, this.loc.y);
    };

Ship.prototype.tryWeapon = function() {
        var bullets = [];
	for(var i in this.guns) {
		this.guns[i].counter = (this.guns[i].counter + 1) % this.guns[i].reload;
		//alert(i+' '+JSON.stringify(this.guns[i]));
		if(this.guns[i].counter == 0) {
			bullets.push(this.fireWeapon(i));
		    }
	    }
	return bullets;
    };

Ship.prototype.fireWeapon = function(i) {
	var loc = new Point(this.loc.x + this.w, this.loc.y + parseFloat(i) * this.h);
	this.guns[i].loc = loc;
	//alert(i+' '+JSON.stringify(this.guns[i]));
	return new CustomBullet(this.guns[i]);
    };

var DEG2RAD = Math.PI / 180;

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
	this.pts = shipParams.life;
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
		//enemyBullets.push(bllts);
		enemyBullets = enemyBullets.concat(bllts);

	    }
	this.t++;
    };

CustomShip.prototype.tryWeapon = function() {
        var bullets = [];
	for(i in this.guns) {
		this.guns[i].counter = (this.guns[i].counter + 1) % this.guns[i].reload;
		if(this.guns[i].counter == 0) {
			bullets.push(this.fireWeapon(i));
		    }
	    }

	return bullets;
    };

CustomShip.prototype.fireWeapon = function(i) {
        var y = Math.round(this.loc.y + this.guns[i].relativeY * this.h);
	var loc = new Point(this.loc.x, y);
	this.guns[i].loc = loc;
	return new CustomBullet(this.guns[i]);
    };

CustomShip.prototype.show = function() {
        space.ctx.drawImage(ships[this.shipType].sprite, this.loc.x, this.loc.y);
    };


CustomPowerup.prototype = Object.create(Body.prototype);
function CustomPowerup(loc,vel,w,h,life,power,params) {
	Body.call(this, loc, vel, w, h);
	this.life = life;
	this.power = power;
	if(params) {
		this.color = params.bulletColor;
	    }
	else {
		this.color = 'White';
	    }
	this.gun = params || null;
    }
CustomPowerup.prototype.show = function() {
	space.ctx.drawImage(sprites[this.power], this.loc.x, this.loc.y);
	var w = this.w;
	var grd = space.ctx.createRadialGradient(this.loc.x + w / 2, this.loc.y + w / 2, w / 4, this.loc.x + w / 2, this.loc.y + w / 2, w / 2);
	grd.addColorStop(0, 'rgba(0,0,0,0.2)');
	grd.addColorStop(1, this.color);
	space.circle(this.loc.x + w / 2, this.loc.y + w / 2, w / 2, null, grd);
    };

Pedestal.prototype = Object.create(Ship.prototype);
function Pedestal(loc,lightningId) {
	Ship.call(this, loc, new Point(-4, 0), 40, 30, 25);
	this.isPlayer = false;
	this.shipType = 'pedestal';
	this.lightning = lightningId;
	this.guns = {};
    }

Pedestal.prototype.show = function() {
	
	var grd = 'Gray';
	var stripHt = this.h/3;
	var unitW = this.w/4;
	//space.roundRect(this.loc.x, this.loc.y, this.w, stripHt, stripHt/2, grd, 'Black');
	//space.roundRect(this.loc.x, this.loc.y+2*stripHt, this.w, stripHt, stripHt/2, grd, 'Black');
	
	space.roundRect(this.loc.x, this.loc.y+stripHt, this.w, stripHt, stripHt/2, grd);
	space.roundRect(this.loc.x+unitW,this.loc.y,2*unitW,this.h,stripHt,grd);
	
	
    };

Lightning.prototype = Object.create(Ship.prototype);
function Lightning(loc,h) {
	Ship.call(this, loc, new Point(-4, 0), 40, h, 1000);
	this.isPlayer = false;
	this.shipType = 'lightning';
	this.markForDelete = false;
	this.guns = {};
	this.lastBolt = [];
    }
    
Lightning.prototype.show = function() {
	this.lastBolt = lightning(this.loc.x,this.loc.y,this.w,this.h,space,this.lastBolt);
    };
