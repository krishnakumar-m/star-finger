// y relative position on y axis
var shipList = ['crosswing','mouse','raider','warbird','rat'];
//var shipList = ['crosswing','warbird'];
var powerupsList = ['oneshot','health','homer','twingun','3shot'];
var ships = {
    'crosswing' : {
	w : 48,
	h : 40,
	hp : 60,
	vel : new Point(0, 0),
	spriteMaker : crosswing
	},
    'mouse' : {
	w : 30,
	h : 12,
	hp : 5,
	vel : new Point(-4, 0),
	spriteMaker : mouse
	},
    'raider' : {
	w : 40,
	h : 30,
	hp : 15,
	vel : new Point(-3, 0),
	spriteMaker : raider
	},
    'warbird' : {
	w : 50,
	h : 70,
	hp : 25,
	vel : new Point(-2, 0),
	spriteMaker : warbird
	},
    'rat' : {
	w : 20,
	h : 20,
	hp : 10,
	vel : new Point(-4, 0),
	spriteMaker : rat
	}
    };
var sprites = {};

var debrisTime = getRandomInt(200,400);
function preLoadShipSprites() {
    var len = shipList.length;
    
    for(var i=0;i<len;i++) {
	var thisShipType = shipList[i];
	ships[thisShipType].sprite = getSprites(thisShipType);
    }
}

function getSprites(id) {
    var w = ships[id].w;
    var h = ships[id].h;
    var cvs = new Canvas('fld', w, h);
    
    ships[id].spriteMaker(w,h,cvs);
    
    var img = new Image();
    img.src = cvs.cvs.toDataURL('img/png');
    
    return img;
}


function debrisImage(x) {
    var cvs = new Canvas('temp', x, x);
    
    rock(x,x,cvs);
    
    var img = new Image();
    img.src = cvs.cvs.toDataURL('img/png');
    
    return img;
}


function preloadPowerSprites() {
    
    var len = powerupsList.length;
    var cvs = new Canvas('fld',25, 30);
    for(var i=0;i<len;i++) {
	var thisPower = powerupsList[i];
	
	cvs.clear();
	powerUp(25,30,cvs,thisPower);
	var img = new Image();
        img.src = cvs.cvs.toDataURL('img/png');
	
	sprites[thisPower] = img;
    }
    
    
}

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



var maxLife = 100;

function lifeMeter() {
        var w = Math.round(player.life * bg.width / maxLife);
       bg.rect(0, 0, w, 10, 'red', 'red');
       
    //   bg.text(JSON.stringify(enemies),0,100);
    }

function test() {
	bg = new Canvas('bg', window.innerWidth, window.innerHeight);
	var bgs = [{
		id: 'bg',
		speed: 1,
		src: randomStarBg()
	       }
	       ];

	
	/* , {
	 id: 'bg1',
	 speed: 2,
	 src: randomStarBg()
	 }, {
	 id: 'bg2',
	 speed: 3,
	 src: randomStarBg()
	 }];*/
	 
	preLoadShipSprites();
	preloadPowerSprites();
	space = new Canvas('fld', window.innerWidth, window.innerHeight);

	player = new Ship(new Point(0, space.height/2), new Point(0, 0), 48, 40, maxLife);
	Scenery.init(bgs);



	var shipControl = false;

	paused = false;
        levelTimer = 0;
	nextWaveIfEndless();
	
	document.body.addEventListener('touchmove', function(event) {
		event.preventDefault();
	    }, false);
	
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
	debrisMaker();
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
		        if(powerUps[i].power =='health') {
			    player.life += Math.round(maxLife/4);
			} else {
		            player.setWeapon(powerUps[i].power);
			}
			powerUps.splice(i, 1);
		    }
		else if(powerUps[i].loc.x < 0) {
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

		//enemies[i].move();
		thisEnemy = enemies[i];
		thisEnemy.move();
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
				//	try{
					thisEnemy.life -= myBullet.hp;
					/*} catch(e) {
					    alert(JSON.stringify(enemies));
					    alert(i);
					}*/
					if(thisEnemy.life <= 0) {
					       var decider = Math.random();
					        if( decider > 0.5) {
                                                        var thisPowerUp =thisEnemy.weapon;
							if(decider < 0.6) {
							    thisPowerUp = 'health';
							} 
							if(thisPowerUp) {
							    powerUps.push(new Powerup(thisEnemy.loc, new Point(-1, 0), 20, 30, 10, thisPowerUp));
							}
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
		var nextTime = levelTimer + getRandomInt(100, 200);
		var nextWave = [], shipObj;
		var nShips = getRandomInt(1, 5);
               
		var interval = 1 / (nShips + 1);
		var nAvailShips = shipList.length;
		for(i = 1;i <= nShips;i++) {
			shipObj = {};
			shipObj.y = interval * i;
			shipObj.ship = shipList[getRandomInt(1, nAvailShips - 1)];
			nextWave.push(shipObj);
		    }
		waves[nextTime] = nextWave;
	    }
    } 
    
    
function debrisMaker() {
    if(levelTimer === debrisTime) {
	var loc = new Point(space.width,getRandomInt(50,space.height-50));
	var vel = new Point(getRandomInt(-1,-5),0);
	var w = getRandomInt(20,50);
	
	enemies.push(new Rock(loc,vel,w,w,w,debrisImage(w)));
	debrisTime += getRandomInt(200,400);
    }
}
