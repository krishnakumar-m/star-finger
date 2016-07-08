// y relative position on y axis
var shipList = ['mouse','raider','warbird','rat'];
var sprites = {};

function crosswing(w,h) {
	var cvs = new Canvas('fld', w, h);
	var unit = w / 18;

	cvs.ctx.fillStyle = 'Gray';
	cvs.ctx.beginPath();
	cvs.ctx.moveTo(11 * unit, unit);
	cvs.ctx.lineTo(w, unit);
	cvs.ctx.lineTo(12 * unit, 5 * unit);
	cvs.ctx.lineTo(6 * unit, 5 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(11 * unit, 14 * unit);
	cvs.ctx.lineTo(w, 14 * unit);
	cvs.ctx.lineTo(12 * unit, 10 * unit);
	cvs.ctx.lineTo(6 * unit, 10 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.fillStyle = 'DarkGray';
	cvs.ctx.beginPath();
	cvs.ctx.moveTo(3 * unit, 5 * unit);
	cvs.ctx.lineTo(8 * unit, 5 * unit);
	cvs.ctx.lineTo(4 * unit, unit);
	cvs.ctx.lineTo(2*unit, 2*unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(3 * unit, 10 * unit);
	cvs.ctx.lineTo(8 * unit, 10 * unit);
	cvs.ctx.lineTo(4 * unit, 14 * unit);
	cvs.ctx.lineTo(2*unit, 13 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.roundRect(2 * unit, 6 * unit, 16 * unit, 3 * unit, unit, 'Gray', 'Black');
	cvs.roundRect(3 * unit, 5 * unit, 9 * unit, 2 * unit, unit, 'Crimson', 'Black');
	cvs.roundRect(3 * unit, 8 * unit, 9 * unit, 2 * unit, unit, 'Crimson', 'Black');

	cvs.rect(0, 6.5 * unit, 2 * unit, 2 * unit, 'Black', 'White');

	for(var y=6.5 * unit;y < 8.5 * unit;y += unit / 4) {
		cvs.ctx.moveTo(unit / 2, y);
		cvs.ctx.lineTo(2 * unit, y);
		cvs.ctx.stroke();
	    }


	cvs.roundRect(unit, unit, 4 * unit, unit, unit / 2, 'red', 'black');
	cvs.roundRect(unit, h - 2 * unit, 4 * unit, unit, unit / 2, 'red', 'black');
	cvs.roundRect(10 * unit, 0, 8 * unit, 2 * unit, unit, 'red', 'black');
	cvs.roundRect(10 * unit, h - 2 * unit, 8 * unit, 2 * unit, unit, 'red', 'black');

	cvs.roundRect(12 * unit, 6.5 * unit, 4 * unit, 2 * unit, unit, 'white', 'black');
	
	sprites['crosswing'] = cvs.ctx.getImageData(0,0,w,h);
    }
    
    
function mouse(w,h) {
	var cvs = new Canvas('fld',w,h);;
	var ctx = cvs.ctx;

	var r = w / 5;
	var grd = ctx.createRadialGradient(4*r,r,r/2,4*r,r,r);
	grd.addColorStop(0,'White');
	grd.addColorStop(0.5,'DarkGray');
	grd.addColorStop(1,'White');
	ctx.fillStyle = 'Gray';
	ctx.strokeStyle = 'Black';
	ctx.beginPath();
	var startAngle = 0.75 * Math.PI;
	var endAngle = 1.25 * Math.PI;
	var innerRadRatio = 0.25;
	var x1 = 4 * r + r * Math.cos(startAngle);
	var x2 = 4 * r + r * Math.cos(startAngle) * innerRadRatio;
	var y1 = r - r * Math.sin(startAngle);
	var y2 = r - r * Math.sin(startAngle) * innerRadRatio;
	var y3 = r - r * Math.sin(endAngle);
	var y4 = r - r * Math.sin(endAngle) * innerRadRatio;

	ctx.arc(4 * r, r, r, endAngle, startAngle);
	ctx.arc(4 * r, r, r * innerRadRatio, startAngle, endAngle, true);
	ctx.closePath();
	//ctx.fill();
        grd = ctx.createLinearGradient(0,y1,0,y2-y1);
	grd.addColorStop(0,'White');
	grd.addColorStop(0.5,'DarkGray');
	grd.addColorStop(1,'White');
	//ctx.fillStyle = grd;
	ctx.moveTo(x1, y1);
	ctx.lineTo(r, y1);
	ctx.lineTo(0, y2);
	ctx.lineTo(x2, y2);
	ctx.closePath();
      //  ctx.fill();
	ctx.moveTo(x1, y3);
	ctx.lineTo(r, y3);
	ctx.lineTo(0, y4);
	ctx.lineTo(x2, y4);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

        sprites['mouse'] = ctx.getImageData(0,0,w,h);
    }
function raider(w,h) {
	var unit = w / 4;
	var cvs = new Canvas('fld', w, h);
	cvs.ctx.strokeStyle = 'Gray';
	var tmp = cvs.ctx.lineWidth;
	cvs.ctx.lineWidth = 5;
	cvs.ctx.moveTo(3 * unit, unit / 2);
	cvs.ctx.lineTo(3 * unit, 2.5 * unit + 1);
	cvs.ctx.stroke();

	cvs.ctx.moveTo(2.5 * unit, unit / 2);
	cvs.ctx.lineTo(3.5 * unit, 2.5 * unit + 1);
	cvs.ctx.stroke();

	cvs.ctx.moveTo(3.5 * unit, unit / 2);
	cvs.ctx.lineTo(2.5 * unit, 2.5 * unit + 1);
	cvs.ctx.stroke();

	cvs.ctx.lineWidth = tmp;
	cvs.circle(3 * unit, 1.5 * unit, unit / 2, 'Black', 'Red');
	cvs.roundRect(0, 1.33 * unit, 3 * unit, unit / 3, unit / 10, 'Gray', 'Black');

	cvs.ctx.strokeStyle = 'Black';
	cvs.ctx.fillStyle = 'Gray';

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(0, unit / 2);
	cvs.ctx.quadraticCurveTo(0, 0, unit, 0);
	cvs.ctx.lineTo(3 * unit, 0);
	cvs.ctx.quadraticCurveTo(w, 0, w, unit / 2);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(0, 2.5 * unit);
	cvs.ctx.quadraticCurveTo(0, 3 * unit, unit, 3 * unit);
	cvs.ctx.lineTo(3 * unit, 3 * unit);
	cvs.ctx.quadraticCurveTo(w, 3 * unit, w, 2.5 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.strokeStyle = 'rgb(255,255,255,0)';
	for(var x=unit / 10;x < unit;x += unit / 10) {
		cvs.ctx.moveTo(x, 1.33 * unit);
		cvs.ctx.lineTo(x, 1.66 * unit);
		cvs.ctx.stroke();
	    }
        sprites['raider'] = cvs.ctx.getImageData(0,0,w,h);
    }
    
    
//5:7    
function warbird(w,h) {
	var cvs = new Canvas('fld', w, h);


	//var w = 250, h = 350;
	var unit = w / 5;
	cvs.ctx.translate(w, h);
	cvs.ctx.rotate(Math.PI);
	cvs.rect(1.5 * unit, 1.66 * unit, unit, 3.66 * unit, 'Gray', 'Gray');
	cvs.roundRect(unit, 2 * unit, 2 * unit, 3 * unit, unit / 5, 'White', 'Black');
	cvs.roundRect(2 * unit, 3 * unit, 2 * unit, unit, unit / 10, 'Gray', 'Black');
	cvs.rect(4 * unit, 3.33 * unit, unit, 0.33 * unit, 'Black', 'White');
	cvs.ctx.strokeStyle = 'rgb(255,255,255,0)';
	for(var x=4 * unit;x < 5 * unit;x += unit / 10) {
		cvs.ctx.moveTo(x, 3.33 * unit);
		cvs.ctx.lineTo(x, 3.66 * unit);
		cvs.ctx.stroke();
	    }

	cvs.ctx.fillStyle = 'Gray';

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(2 * unit, 0);
	cvs.ctx.lineTo(4 * unit, 0);
	cvs.ctx.lineTo(5 * unit, unit);
	cvs.ctx.lineTo(5 * unit, 1.66 * unit);
	cvs.ctx.lineTo(0, 1.66 * unit);
	cvs.ctx.closePath();
	cvs.ctx.fill();
	cvs.ctx.stroke();
	cvs.ctx.beginPath();
	cvs.ctx.moveTo(2 * unit, h);
	cvs.ctx.lineTo(4 * unit, h);
	cvs.ctx.lineTo(5 * unit, h - unit);
	cvs.ctx.lineTo(5 * unit, h - 1.66 * unit);
	cvs.ctx.lineTo(0, h - 1.66 * unit);
	cvs.ctx.closePath();


	cvs.ctx.fill();
	cvs.ctx.stroke();
        sprites['warbird'] = cvs.ctx.getImageData(0,0,w,h);
    }
    
    function rat(w,h) {
    var cvs = new Canvas('fld', w, h);
    var unit = w/7;
    
    var ctx = cvs.ctx;
ctx.beginPath();
//ctx.moveTo(2.5*unit, h/2);
//ctx.quadraticCurveTo(20, 100, 200, 20);
var grd = ctx.createLinearGradient(0,0,w,0);
grd.addColorStop(0,"gray");
grd.addColorStop(1,"white");
//ctx.fillStyle='#616362';
ctx.fillStyle=grd;
ctx.moveTo(0, 3*unit);
ctx.lineTo(3*unit, 3*unit);
ctx.quadraticCurveTo(0.6*w, 0, w, 0);
ctx.quadraticCurveTo(w/9, 0,0, 3*unit);
ctx.stroke();
ctx.moveTo(0, 4*unit);
ctx.lineTo(3*unit, 4*unit);
ctx.quadraticCurveTo(0.6*w, h, w, h);
ctx.quadraticCurveTo(w/9, h,0, 4*unit);
ctx.stroke();
ctx.fill();


grd = ctx.createRadialGradient(unit,h/2,unit/3,unit,h/2,unit);
grd.addColorStop(0,"red");
//grd.addColorStop(0.5,"")
grd.addColorStop(1,"gray");

//ctx.fillStyle='red';
ctx.fillStyle=grd;
ctx.beginPath();
ctx.arc(1.5*unit,h/2,unit/2,0,2*Math.PI);
ctx.stroke();
ctx.fill();
sprites['rat'] = cvs.ctx.getImageData(0,0,w,h);
}
    
var ships = {
    'mouse' : {
	w : 30,
	h : 12,
	hp : 5,
	vel : new Point(-4, 0)
	},
    'raider' : {
	w : 40,
	h : 30,
	hp : 15,
	vel : new Point(-3, 0)
	},
    'warbird' : {
	w : 50,
	h : 70,
	hp : 25,
	vel : new Point(-2, 0)
	},
    'rat' : {
	w : 20,
	h : 20,
	hp : 10,
	vel : new Point(-4, 0)
	}
    };
    

var waves = {
    50 : [ {
	    y : 0.1,
	    ship : 'mouse',

	    },{
	    y : 0.3,
	    ship : 'mouse'
	    },
	    {
	    y : 0.5,
	    ship : 'mouse'
	    },
	    {
	    y : 0.7,
	    ship : 'mouse'
	    },
	    {
	    y : 0.9,
	    ship : 'mouse'
	    }
	],
    100 :  [{
	    y : 0.5,
	    ship : 'raider'
	    }
	],
    125 :  [{
	    y : 0.3,
	    ship : 'raider'
	    },
	    {
	    y : 0.7,
	    ship : 'raider'
	    }
	],
    150 :  [{
	    y : 0.1,
	    ship : 'raider'
	    },
	    {
	    y : 0.9,
	    ship : 'raider'
	    }
	],
    200 : [ {
	    y : 0.1,
	    ship : 'rat',

	    },{
	    y : 0.3,
	    ship : 'mouse'
	    },
	    {
	    y : 0.5,
	    ship : 'rat'
	    },
	    {
	    y : 0.7,
	    ship : 'mouse'
	    },
	    {
	    y : 0.9,
	    ship : 'rat'
	    }
	],
      250:  [{
	    y : 0.5,
	    ship : 'warbird'
	    }
	],
    275 :  [{
	    y : 0.3,
	    ship : 'warbird'
	    },
	    {
	    y : 0.7,
	    ship : 'warbird'
	    }
	],
    300 :  [{
	    y : 0.1,
	    ship : 'warbird'
	    },
	    {
	    y : 0.9,
	    ship : 'warbird'
	    }
	]

    };
    
var endless = true;//Endless Random Hell
var enemies = [], bullets = [], enemyBullets = [], powerUps=[];
var hs = [0,60,120];
function randomStarBg() {
        var hsl ;
	bg.clear();
	for(var i=0;i < 100;i++) {
		hsl = 'hsla(' + hs[getRandomInt(0, 2)] + ',50%,80%,1';
		bg.circle(bg.width * Math.random(), bg.height * Math.random(), 1.2 * Math.random(), hsl, hsl);
	    }
	return bg.cvs.toDataURL();
    }



var maxLife = 60;

function lifeMeter() {
        var w = Math.round(player.life * bg.width / maxLife);
        bg.rect(0, 0, w, 10, 'red', 'red');
    }

function test() {
	bg = new Canvas('bg', window.innerWidth, window.innerHeight);
	var bgs = [{
		id: 'bg',
		speed: 1,
		src: randomStarBg()
		}];

	/*
	 , {
	 id: 'bg1',
	 speed: 2,
	 src: randomStarBg()
	 }, {
	 id: 'bg2',
	 speed: 3,
	 src: randomStarBg()
	 }
	 */
mouse(ships.mouse.w,ships.mouse.h);
crosswing(42,35);
raider(ships.raider.w,ships.raider.h);
warbird(ships.warbird.w,ships.warbird.h);
rat(ships.rat.w,ships.rat.h);
	space = new Canvas('fld', window.innerWidth, window.innerHeight);

	player = new Ship(new Point(0, 0), new Point(0, 0), 42, 35, maxLife);
	Scenery.init(bgs);
	
	

	var shipControl = false;

	paused = false;
        levelTimer = 0;
	nextWaveIfEndless();
	space.cvs.ontouchstart = function() {
		var x = event.touches[0].pageX;
		var y = event.touches[0].pageY;

		if(typeof bullt !== 'undefined') {
			window.clearInterval(bullt);
		    }
		if((paused && x >= player.loc.x && x <= player.loc.x + player.w &&
		y >= player.loc.y && y <= player.loc.y + player.h)  || !paused) {
			shipControl = true;
			player.loc.x = Math.round(x - player.w / 2);
			player.loc.y = Math.round(y - player.h / 2);

			bullt = window.setInterval(function() {
				var bullts = player.tryWeapon();
				if(bullts) {
					bullets = bullets.concat(bullts);
				    }
			    }, Game.frameInterval);

			if(paused) {
				Game.loop();
			    }
		    }
	    };
	space.cvs.ontouchmove = function(event) {
		event.preventDefault();
		if(shipControl) {

			player.loc.x = Math.round(event.touches[0].pageX - player.w / 2);
			player.loc.y = Math.round(event.touches[0].pageY - player.h / 2);

		    }


	    };
	space.cvs.ontouchend = function() {
		shipControl = false;
		paused = true;
		if(typeof bullt !== 'undefined') {
			window.clearInterval(bullt);
		    }

		Game.pause();

	    };
        Game.init(game, 60);

    }


function game() {
	space.clear();
	newShips();
	player.show();

	for(i = bullets.length - 1; i >= 0;i--) {
		bullets[i].move();
		bullets[i].show();
		if(bullets[i].loc.x > space.width) {
			bullets.splice(i, 1);
		    }

	    }
        hitEnemy();
	hitsByEnemy();
	collideEnemy();
	movePowerups();
	partSys.update();
	partSys.show();
	Scenery.scene();
	lifeMeter();
	checkDeath();
	levelTimer++;
    }

function collisionCheck(a,b) {
	var rect1 = a,rect2 = b;

	return (rect1.loc.x <= rect2.loc.x + rect2.w &&
	rect1.loc.x >= rect2.loc.x &&
	rect1.loc.y <= rect2.loc.y + rect2.h &&
	rect1.loc.y >= rect2.loc.y);


    }

function movePowerups () {
	var i=powerUps.length - 1,j,myBullet;

	for(;i >= 0;i--) {
	        powerUps[i].move();
		powerUps[i].show();
		if(collisionCheck(player, powerUps[i])) {
		        player.setWeapon(powerUps[i].power);
			powerUps.splice(i, 1);
		    }
		else if(powerUps[i] <= space.width) {
			powerUps.splice(i, 1);
		    }
	    }
    }

function hitsByEnemy() {
	var thisBullet,i = enemyBullets.length - 1;
	for(; i >= 0;i--) {
		enemyBullets[i].move();
		thisBullet = enemyBullets[i];
		thisBullet.show();
		if(thisBullet.loc.x < 0) {
			enemyBullets.splice(i, 1);
		    }    
		else if(collisionCheck(enemyBullets[i], player)) {
			partSys.add(new ParticleSystem(100, enemyBullets[i].loc.x, enemyBullets[i].loc.y, space.ctx , config, false));
			player.life -= thisBullet.hp;
			enemyBullets.splice(i, 1);
		    }
	    }
    }

function hitEnemy() {
	var i=enemies.length - 1,thisEnemy,j,myBullet;
	for(;i >= 0;i--) {

		enemies[i].move();
		thisEnemy = enemies[i];
		thisEnemy.show();
		if(thisEnemy.loc.x < 0) {
			enemies.splice(i, 1);
		    }  
		else {
			j = bullets.length - 1;
			for(;j >= 0;j--) {
				myBullet = bullets[j];
				if(collisionCheck(myBullet, thisEnemy)) {
					partSys.add(new ParticleSystem(10, myBullet.loc.x, myBullet.loc.y, space.ctx , config, false));
					enemies[i].life -= myBullet.hp;
					if(enemies[i].life <= 0) {
					        if(Math.random() > 0.5) {

							powerUps.push(new Powerup(myBullet.loc, new Point(-1, 0), 20, 30, 10, thisEnemy.weapon));
						    }
						enemies.splice(i, 1);
					    }
					bullets.splice(j, 1);
				    }
			    }
		    }

	    }
    }

function collideEnemy() {
	var i=enemies.length - 1,thisEnemy,j,myBullet;
	for(;i >= 0;i--) {
		if(collisionCheck(player, enemies[i])) {
		        if(player.life > enemies[i].life) {
				player.life -= enemies[i].life;
				if(enemies[i].life <= 0) {
					enemies.splice(i, 1);
				    }
			    }
			else {
				enemies[i].life -= player.life;
			    }
			partSys.add(new ParticleSystem(10, player.loc.x, player.loc.y, space.ctx , config, false));
		    }
	    }
    }


function checkDeath() {
	if(player.life <= 0) {
		alert('Dead');
		Game.pause();
	    }
    }

function shipFactory(props) {
	if(props.ship == 'mouse') {
		return new Mouse(new Point(space.width, Math.round(space.height * props.y)), props.vel, props.w, props.h, props.hp);

	    }
	else if(props.ship == 'raider') {
		return new EnemyShip(new Point(space.width, Math.round(space.height * props.y)), props.vel, props.w, props.h, props.hp);

	    } 
	else if(props.ship == 'rat') {
		return new Rat(new Point(space.width, Math.round(space.height * props.y)), props.vel, props.w, props.h, props.hp);

	    }  
	else if(props.ship == 'warbird') {
		return new Warbird(new Point(space.width, Math.round(space.height * props.y)), props.vel, props.w, props.h, props.hp);

	    }        

    }


function newShips() {
	var thisWave = waves[levelTimer],i;
	if(thisWave) {
		var len = thisWave.length;
		for(i = 0;i < len;i++) {
			var params = thisWave[i];
		        var shipType = params.ship;
			var defaults = ships[shipType];
			if(!params.w) {
				params.w = defaults.w;
			    }
			if(!params.h) {
				params.h = defaults.h;
			    }
			if(!params.hp) {
				params.hp = defaults.hp;
			    }
			if(!params.vel) {
				params.vel = defaults.vel;
			    }
			enemies.push(shipFactory(params));
		    }
		  nextWaveIfEndless();  
	    }
    }
	    
	function nextWaveIfEndless() {
	           if(endless) {
		    waves = {};
		    var nextTime = levelTimer+getRandomInt(50,100);
		    var nextWave = [], shipObj;
		    var nShips = getRandomInt(1,10);
		    
		    var interval = 1/(nShips+1);
		    var nAvailShips = shipList.length;
		    for(i=1;i<=nShips;i++) {
			shipObj = {};
			shipObj.y = interval * i;
			shipObj.ship = shipList[getRandomInt(0,nAvailShips-1)];
			nextWave.push(shipObj);
		    }
		    waves[nextTime] = nextWave;
		}
	} 
