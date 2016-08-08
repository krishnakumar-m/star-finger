var powerupSpriteMaker = {
    'shield': shieldSprite,
    'oneshot':oneshotSprite,
    'twingun':twingunSprite,
    'health': healthSprite,
    '3shot':threeshotSprite
    };
var ships = {};
var sprites = {};

var debrisTime,lightningTime;

function getPlayerSprite() {
	var w = 48;
	var h = 40;
	var cvs = new Canvas('temp', w, h);

	crosswing(w, h, cvs);

	var img = new Image();
	img.src = cvs.cvs.toDataURL('img/png');

	return img;
	//return shipIt(w, h);
    }


function debrisImage(x) {
	var cvs = new Canvas('temp', x, x);

	rock(x, x, cvs);

	var img = new Image();
	img.src = cvs.cvs.toDataURL('img/png');

	return img;
    }


function preloadPowerSprites() {

	var powerupsList = Object.keys(powerupSpriteMaker);

	var len = powerupsList.length;
	var cvs = new Canvas('temp', 40, 40);

	for(var i=0;i < len;i++) {

		var thisPower = powerupsList[i];
		cvs.clear();
		powerUp2(40, 40, cvs, thisPower);
		var img = new Image();
		img.src = cvs.cvs.toDataURL('img/png');

		sprites[thisPower] = img;
	    }


    }
var waves = {}  ;
var endless = true;//Endless Random Hell
var enemies = [], bullets = [], enemyBullets = [], powerUps=[],paused=false;
var gameoverscreen,space,bg;
var player,shipControl,score;

var maxLife = 100;

function lifeMeter() {
	if(player.life <= 0) {
		return;
	    }
	var startAngle = -Math.PI / 2;

	var rad = player.life * 2 * Math.PI / maxLife;
	bg.ctx.lineCap = 'round';
	bg.ctx.beginPath();
	bg.ctx.arc(50, 50, 20, startAngle, rad + startAngle);
	bg.ctx.strokeStyle = 'rgba(204,0,0,0.5)';
	bg.ctx.lineWidth = 10;
	bg.ctx.stroke();
	rad = 4 * player.shieldHealth * 2 * Math.PI / maxLife;
	bg.ctx.beginPath();
	bg.ctx.arc(50, 50, 30, startAngle, rad + startAngle);
	bg.ctx.strokeStyle = 'rgba(0,0,204,0.5)';
	bg.ctx.stroke();


    }


function dispScore() {
        bg.ctx.save();
        bg.ctx.textAlign = 'center';
	bg.text(score, bg.width - 50, 50, 'rgba(204,0,0,0.8)', '30px monospace');
	bg.ctx.restore();
    }

function startScreen() {
	var w = gameoverscreen.width, h = gameoverscreen.height;
	var unitw = w / 10;
	var unith = h / 20;
	gameoverscreen.ctx.save();
	gameoverscreen.cvs.style.display = 'block';
	gameoverscreen.clear();
	gameoverscreen.rect(0, 0, w, h, 'Black', 'Black');
	randomStarBg(gameoverscreen, 2);
	gameoverscreen.ctx.textAlign = 'center';
	gameoverscreen.ctx.textBaseLine = 'middle';
	gameoverscreen.ctx.shadowBlur = 10;
	gameoverscreen.ctx.shadowColor = 'Blue';
	gameoverscreen.text('RANDOM SPACE', 5 * unitw, 4 * unith, 'White', 'bold 40px monospace');
	gameoverscreen.ctx.restore();
	gameoverscreen.ctx.textAlign = 'center';
	gameoverscreen.ctx.textBaseLine = 'middle';
	gameoverscreen.rect(3 * unitw, 5 * unith , 4 * unitw , 1.5 * unith, 'Yellow', 'Red');
	gameoverscreen.text('START', 5 * unitw, 6 * unith, 'White', '20px monospace');
        flashScreen();
    }

function flashScreen() {
	var i = 0;
	var unitw =gameoverscreen.width  / 10;
	var unith = gameoverscreen.height / 20;
	Game.init(function() {
	        gameoverscreen.ctx.save();
		gameoverscreen.ctx.textBaseLine = 'middle';
		gameoverscreen.ctx.textAlign = 'center';
	        gameoverscreen.rect(2.5*unitw,7*unith,5*unitw,4*unith,'Red','Black');
		if(i>99 && i<350) {
		    gameoverscreen.text('POWERUPS',5*unitw,8*unith,'White',(unitw*0.5)+'px Terminal');
		} else if(i<100) {
		    gameoverscreen.text('TOUCH TO FLY',5*unitw,8*unith,'White',(unitw*0.5)+'px Terminal');
		    gameoverscreen.text('RELEASE',5*unitw,9*unith,'White',(unitw*0.5)+'px Terminal');
		    gameoverscreen.text('TO PAUSE',5*unitw,10*unith,'White',(unitw*0.5)+'px Terminal');
		}
		
		
		
		if(i>99 &&  i< 150) {
		    healthSprite(3 * unitw, 8.5 * unith, unitw, unith, gameoverscreen);
		    gameoverscreen.text('HEALTH',5.5*unitw,9.25*unith,'White',(unitw*0.5)+'px Terminal');
		} else if(i>149 &&  i< 200) {
		    shieldSprite(3 * unitw, 8.5 * unith, unitw, unith, gameoverscreen);
		    gameoverscreen.text('SHIELD',5.5*unitw,9.25*unith,'White',(unitw*0.5)+'px Terminal');
		} else if(i>199 &&  i< 250) {
		    oneshotSprite(3 * unitw, 8.5 * unith, unitw, unith, gameoverscreen);
		    gameoverscreen.text('GUN I',5.5*unitw,9.25*unith,'White',(unitw*0.5)+'px Terminal');
		} else if(i>249 &&  i< 300) {
		    twingunSprite(3 * unitw, 8.5 * unith, unitw, unith, gameoverscreen);
		    gameoverscreen.text('GUN II',5.5*unitw,9.25*unith,'White',(unitw*0.5)+'px Terminal');
		} else if(i>299 &&  i< 350) {
		    threeshotSprite(3 * unitw, 8.5 * unith, unitw, unith, gameoverscreen);
		    gameoverscreen.text('GUN III',5.5*unitw,9.25*unith,'White',(unitw*0.5)+'px Terminal');
		}
                gameoverscreen.ctx.restore();
		i = (i + 1) % 350;
	    },60);
    }   


function init() {
        level = 1;
	score = 0;
        ships = generateShipTypes(level);
	player = new Ship(new Point(0, space.height / 2), new Point(0, 0), 48, 40, maxLife);
	player.setWeapon(0.1, basegun);
	paused = false;
        levelTimer = 0;
        waves = {};
	nextWaveIfEndless2();
	shipControl = false;
	gameoverscreen.cvs.style.display = 'none';
	levelAnimCounter = 0;
	Game.init(game, 50);
	enemies = [];
	bullets = [];
	enemyBullets = [];
	powerUps = [];
	debrisTime = getRandomInt(200, 400);
	lightningTime = getRandomInt(300, 350);
    }
function test() {

	bg = new Canvas('bg', window.innerWidth, window.innerHeight);
	gameoverscreen = new Canvas('gameover', window.innerWidth, window.innerHeight);
	space = new Canvas('fld', window.innerWidth, window.innerHeight);

	var bgs = [{

		speed: 1,
		src: randomStarBg(bg, 0.2)
		},
		{
		speed: 2,
		src: bgLandScape(bg, getRandomInt(100, 200), 'hsl(240,40%,50%)', 3, 20, 0.55)
		},
		{
		speed: 3,
		src: bgLandScape(bg, getRandomInt(200, 300), 'hsl(240,40%,30%)', 4, 20, 0.5)
		},
		{
		speed: 4,
		src: bgLandScape(bg, getRandomInt(space.height - 200, space.height), 'hsl(240,40%,10%)', 4, 20, 0.1)

		}
	    ];

	//preLoadShipSprites();
	playerSprite = getPlayerSprite();
	preloadPowerSprites();

	//Scenery.init(bgs);
        Scenery.init(bg.cvs, bgs, bg.width, bg.height);
	//init();
	startScreen();

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
					//bullets.push(bullts);
				    }
			    }, Game.frameInterval);

			if(paused) {
				Game.loop();
			    }
		    }
	    };
	space.cvs.ontouchmove = function(event) {
		event.preventDefault();
		if(shipControl && player.life > 0) {

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

	gameoverscreen.cvs.ontouchstart = function() {
	        var x = event.touches[0].pageX;
		var y = event.touches[0].pageY;
		var unitw = gameoverscreen.width / 10;
		var unith = gameoverscreen.height / 20;
		if(x > 3 * unitw && y > 5 * unith && x < 7 * unitw && y < 6.5 * unith) {
			init();

		    }
	    };


    }


var levelAnimCounter = 0;
function levelStartAnim() {
	bg.text('WAVE ' + level, bg.width / 2, bg.height / 2, 'rgba(255,255,0,' + 1 / levelAnimCounter + ')', '30px monospace');
    }

function getShipsLength() {
	var len = enemies.length,count=0;
	for(var i = 0;i < len;i++) {
		if(!isNaN(enemies[i].shipType)) {
			count++;
		    }
	    }
	return count;
    }

function game() {
	space.clear();
	Scenery.scene();
	newShips2();
	if(levelTimer > 1000 && getShipsLength() == 0) {
		level++;
		ships = generateShipTypes(level);
		levelTimer = 0;
		waves = {};
		nextWaveIfEndless2();
		levelAnimCounter = 1;
		debrisTime = getRandomInt(200, 400);
		lightningTime = getRandomInt(300, 500);
	    }


	debrisMaker();
	lightningMaker();
	if(player.life > 0) {
		player.show();
	    }
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

	lifeMeter();
	dispScore();
	if(levelAnimCounter > 0) {
		levelStartAnim();
		levelAnimCounter = (levelAnimCounter + 1) % 30;

	    }

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
		        if(powerUps[i].power == 'health') {
				player.life += Math.round(maxLife / 4);
				if(player.life > maxLife) {
					player.life = maxLife;
				    }
			    }
			else if(powerUps[i].power == 'shield') {
				player.shield = true;
				player.shieldHealth = Math.round(maxLife / 4);
			    }
			else {
			        var gun=  powerUps[i].gun;
				gun.vel = new Point(-gun.vel.x, gun.vel.y);

				player.setWeapon(gun.relativeY, gun);

			    }
			powerUps.splice(i, 1);
		    }
		else if((powerUps[i].loc.x + powerUps[i].w)  < 0) {
			powerUps.splice(i, 1);
		    }
	    }
    }

function hitsByEnemy() {
	var thisBullet,i = enemyBullets.length - 1;
	for(; i >= 0;i--) {
		enemyBullets[i].move();
		thisBullet = enemyBullets[i];
		//alert(JSON.stringify(thisBullet));
		thisBullet.show();
		if(thisBullet.loc.x < 0) {
			enemyBullets.splice(i, 1);
		    }    
		else if(collisionCheck(enemyBullets[i], player)) {
			partSys.add(new ParticleSystem(100, enemyBullets[i].loc.x, enemyBullets[i].loc.y, space.ctx , config, false));
			if(player.shield) {
				player.shieldHealth -= thisBullet.hp;
				if(player.shieldHealth <= 0) {
					player.shield = false;
					player.life +=  player.shieldHealth;
					player.shieldHealth = 0;
				    }
			    }
			else {
				player.life -= thisBullet.hp;
			    }
			enemyBullets.splice(i, 1);
		    }
	    }
    }

function hitEnemy() {
	var i=enemies.length - 1,thisEnemy,j,myBullet;
	for(;i >= 0;i--) {
		thisEnemy = enemies[i];
		thisEnemy.move();
		thisEnemy.show();
		if((thisEnemy.loc.x + thisEnemy.w < 0) || thisEnemy.markForDelete) {
			enemies.splice(i, 1);
		    }  
		else {
			j = bullets.length - 1;
			for(;j >= 0;j--) {
				myBullet = bullets[j];
				if(collisionCheck(myBullet, thisEnemy)) {
					partSys.add(new ParticleSystem(10, myBullet.loc.x, myBullet.loc.y, space.ctx , config, false));

					thisEnemy.life -= myBullet.hp;

					if(thisEnemy.life <= 0) {
					        if(thisEnemy.shipType == 'pedestal') {
							thisEnemy.lightning.markForDelete = true;
						    }

					        if(thisEnemy.pts) {
							score += thisEnemy.pts;
						    }
						var decider = Math.random();
					        if(decider > 0.5) {
                                                        var thisPowerUp =null;
							var picked =null;
							if(decider < 0.6) {
								thisPowerUp = 'health';
							    }
							else if(decider < 0.7) {
								thisPowerUp = 'shield';
							    }
							else {

								picked = getRandomMember(thisEnemy.guns);
								if(picked) {
									if(picked.relativeY == 0.5) {
										thisPowerUp = 'oneshot';
									    }
									else if(picked.relativeY == 0.1 || picked.relativeY == 0.9) {
										thisPowerUp = 'twingun';
									    }
									else {
										thisPowerUp = '3shot';
									    }
								    }
							    }
							if(thisPowerUp) {
								powerUps.push(new CustomPowerup(thisEnemy.loc, new Point(-1, 0), 40, 40, 10, thisPowerUp, picked));
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
		        var dmg = Math.round(enemies[i].life / 2);
		        if(player.shield) {
				player.shieldHealth -= dmg;
				if(player.shieldHealth <= 0) {
					player.shield = false;
					player.life +=  player.shieldHealth;
					player.shieldHealth = 0;
				    }
			    }
			else {
				player.life -= dmg;
			    }
			enemies[i].life -= Math.round(player.life / 2);
			if(enemies[i].life <= 0) {
				enemies.splice(i, 1);
			    }

			partSys.add(new ParticleSystem(10, player.loc.x, player.loc.y, space.ctx , config, false));
		    }
	    }
    }


function checkDeath() {
	if(player.life <= 0) {
	        var w = gameoverscreen.width, h = gameoverscreen.height;
		var unitw = w / 10;
		var unith = h / 20;
		Game.pause();
		gameoverscreen.cvs.style.display = 'block';
		gameoverscreen.clear();
		gameoverscreen.rect(0, 0, w, h, 'Red', 'rgba(152,0,0,0.5)');
		gameoverscreen.ctx.textAlign = 'center';
		gameoverscreen.ctx.textBaseLine = 'middle';
		gameoverscreen.text('GAME OVER!', 5 * unitw, 4 * unith, 'White', '30px monospace');
		if(typeof bullt !== 'undefined') {
			window.clearInterval(bullt);
		    }

		gameoverscreen.rect(3 * unitw, 5 * unith , 4 * unitw , 1.5 * unith, 'Yellow', 'Red');
		gameoverscreen.text('RESTART', 5 * unitw, 6 * unith, 'White', '20px monospace');
	    }
    }


function newShips2() {
	var thisWave = waves[levelTimer],i;
	if(thisWave) {
		var len = thisWave.length;
		for(i = 0;i < len;i++) {
			var params = thisWave[i];
		        var shipType = params.ship;
			params = ships[shipType];
			params.loc = new Point(space.width, Math.round(space.height * thisWave[i].y));
			enemies.push(new CustomShip(params));
		    }
		nextWaveIfEndless2();  
	    }
    }

function nextWaveIfEndless2() {
	//if(endless) {
	waves = {};
	var nextTime = levelTimer + getRandomInt(100, 200);
	if(nextTime > 1000) {
		return;
	    }
	var nextWave = [], shipObj;
	var nShips = getRandomInt(1, 5);
	var interval = 1 / (nShips + 1);
	for(i = 1;i <= nShips;i++) {
		shipObj = {};
		shipObj.y = interval * i;
		shipObj.ship = getRandomInt(0, ships.length - 1);
		nextWave.push(shipObj);
	    }
	waves[nextTime] = nextWave;
	//    }
    } 

function debrisMaker() {
	if(levelTimer === debrisTime) {

		var vel = new Point(getRandomInt(-1, -5), 0);
		var w = getRandomInt(20, 50);
		var loc = new Point(space.width, getRandomInt(51, space.height - 50));
		enemies.push(new Rock(loc, vel, w, w, w, debrisImage(w)));
		debrisTime += getRandomInt(200, 400);
	    }
    }


function lightningMaker() {
	if(levelTimer === lightningTime) {
		var lightningId = enemies.length + 2;
		var startx = space.width;
		var starty = getRandomInt(0, space.height / 2);
		var endy = getRandomInt(starty + space.height / 4, space.height);
		var lightningHt = (endy - starty) - 60;
		var lightning = new Lightning(new Point(startx, starty + 30), lightningHt);
		enemies.push(new Pedestal(new Point(startx, starty), lightning));
		enemies.push(new Pedestal(new Point(startx, endy - 30), lightning));
		enemies.push(lightning);
		lightningTime += getRandomInt(300, 500);
	    }

    }

var bulletColors = ['Green','Red','Orange','Violet','Yellow','Blue'];

function generateShipTypes(level) {
	var SHIP_BASE_LEVEL = 3;
	var UNIT_DIMENSIONS = 5;
	var UNIT_HEALTH = 5;
	// Number of ship types as per level
	var nShipTypes = 2 * Math.ceil(level / 2) + 1;
	var ships = [];
	for(var i=0;i < nShipTypes;i++) {
		var aShipType = {};
		// Level of this ship type
		// Three ships per ship level
		var shipLevel = (i % 3) + 1;

		// Calculate min max dimensions
		var minWidth =  (SHIP_BASE_LEVEL + shipLevel) * UNIT_DIMENSIONS;
		var maxWidth =  minWidth + (shipLevel + 1) * UNIT_DIMENSIONS;

		// Calc max min health for this type of ship
		var minHealth = (level + shipLevel) * UNIT_HEALTH;
		var maxHealth = minHealth + UNIT_HEALTH;

		aShipType.w = getRandomInt(minWidth, maxWidth);
		aShipType.h = getRandomInt(minWidth, maxWidth);
		aShipType.life = getRandomInt(minHealth, maxHealth);

		aShipType.sprite = shipIt(aShipType.w, aShipType.h);
                aShipType.shipType = i;
		aShipType.guns = getGuns(shipLevel, level);

		ships.push(aShipType);
	    }

	return ships;

    }

// Generate a number to identify gun positions 
// in one side of the ship
function getGunSelector (shipLevel) {
	if(shipLevel == 1) {
		return 1;
	    }

	if(shipLevel == 2) {
		return getRandomInt(2, 4);
	    }

	if(shipLevel == 3) {
		return getRandomInt(5, 7);
	    }

	return 15;
    }
function randomItem(arr) {
	var len = arr.length;
	if(len == 0) return null;
	return arr[0,getRandomInt(0, len - 1)];
    }

function pad(n,width,z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

function randomWeightedItem(arr) {
	var pick = Math.random();
	var counter = 0;
	for(i in arr) {
		counter += arr[i].wt;
		if(pick <= counter) {
			return arr[i].item;
		    }
	    }
	return null;
    }

function createBulletTypeWeightage(level) {
	var wt = (level > 19) ?0: (0.05 * (level - 1));
	return [{
		'wt':1 - wt,
		'item':'norm'
		},
		{
		'wt':wt,
		'item':'targ'
		}];
    }
function getGuns(shipLevel,level) {
        var bulletType = createBulletTypeWeightage(level);
        var UNIT_DMG = 1,maxGuns = 3;
	var gunsListId = getGunSelector(shipLevel);
	if(gunsListId == 15) {
		maxGuns = 4;
	    }
	// convert to binary string
	var gunsList = gunsListId.toString(2);
	gunsList = pad(gunsList, maxGuns); // Pad leading zeroes
	gunsList = gunsList.split(''); // convert to array
	var len = gunsList.length;
	var guns = {};
	var unitPos = 1 / (2 * maxGuns - 1);
	//alert(gunsList);
	var relativePos =0.1;
	for(var i=0;i < len;i++,relativePos += unitPos) {
	        var minDmg = (shipLevel + level) * UNIT_DMG;
		var maxDmg = (shipLevel + level + 1) * UNIT_DMG;
		var minVel = (shipLevel + 1);
		var maxVel = (shipLevel * 2);
		var minReload =20 + 10 / level ;
		var maxReload =10 + minReload;
		var gun = {
		    dmg : getRandomInt(minDmg, maxDmg),
		    bulletColor : randomItem(bulletColors),
		    vel : new Point(-getRandomInt(minVel, maxVel), 0),
		    w : getRandomInt(4, 6),
		    h : 2,
		    type : randomWeightedItem(bulletType),
		    relativeY : parseFloat(relativePos.toFixed(1)),
		    reload : getRandomInt(minReload, maxReload),
		    counter : 0

		    };

		var fltPos = parseFloat(relativePos.toFixed(1));
		if(gunsList[i] == 1) {
			guns[fltPos] = gun;
			if(relativePos != 0.5) {
			        var tempgun = JSON.parse(JSON.stringify(gun));
				tempgun.relativeY = 1 - fltPos;
				guns[1 - fltPos] = tempgun ;
			    }
		    }
	    }

	return guns;
    }

function getRandomMember(obj) {
	if(!obj) {
		return null;
	    }
	var keys = Object.keys(obj);
	return obj[randomItem(keys)];
    }
    
