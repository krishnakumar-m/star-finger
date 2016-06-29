// y relative position on y axis
var waves = {
    50 : [{
	    y : 0.2
	    }],
    150 : [{
	    y : 0.5
	    }]    

    };

function randomStarBg() {
	bg.rect(0, 0, bg.width, bg.height, 'black', 'black');
	for(var i=0;i < 100;i++) {
		bg.circle(bg.width * Math.random(), bg.height * Math.random(), 1.2 * Math.random(), 'white', 'rgb(255,255,255,0.5)');
	    }
	var img = document.createElement('img');
	img.src = bg.cvs.toDataURL();
	return img;
    }
bgLeft = 0;
function panBgLeft() {
	bgLeft = (bgLeft + 1) % bgImg.width;
	bg.clear();
	bg.ctx.drawImage(bgImg, -bgLeft, 0);
	bg.ctx.drawImage(bgImg, bgImg.width - bgLeft, 0);
    }

var maxLife = 60;

function lifeMeter() {
        var w = Math.round(player.life * bg.width / maxLife);
        bg.rect(0, 0, w, 10, 'red', 'red');
    }

function test() {
	space = new Canvas('fld', window.innerWidth, window.innerHeight);
	bg = new Canvas('bg', window.innerWidth, window.innerHeight);
	player = new Ship(new Point(0, 0), new Point(0, 0), 40, 20, maxLife);
	bgImg = randomStarBg();
	enemies = [];
	var shipControl = false;
	bullets = [];enemyBullets = [];
	frameInterval = 1000 / 60;
	lastTime = new Date().getTime();
	paused = false;
        levelTimer = 0;
	space.cvs.ontouchstart = function() {
		var x = event.touches[0].pageX;
		var y = event.touches[0].pageY;
		if(paused) {
			loop();
		    }
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
			    }, frameInterval);
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

		window.cancelAnimationFrame(timer);

	    };

	timer = window.requestAnimationFrame(loop);
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
	partSys.update();
	partSys.show();
	panBgLeft();
	lifeMeter();
	levelTimer++;
    }


function loop() {
        var now = new Date().getTime();
	var elapsed = now - lastTime;
	if(elapsed >= frameInterval) {

		game();
		lastTime = new Date().getTime();
	    }
	timer = window.requestAnimationFrame(loop);
    }

function collisionCheck(a,b) {
	var rect1 = a,rect2 = b;

	return (rect1.loc.x <= rect2.loc.x + rect2.w &&
	rect1.loc.x >= rect2.loc.x &&
	rect1.loc.y <= rect2.loc.y + rect2.h &&
	rect1.loc.y >= rect2.loc.y);


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
			if(player.life <= 0) {
				alert('Dead');
			    }
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
						enemies.splice(i, 1);
					    }
					bullets.splice(j, 1);
				    }
			    }
		    }

	    }
    }

function newShips() {
	var thisWave = waves[levelTimer];
	if(thisWave) {
		var len = thisWave.length,i;
		for(i = 0;i < len;i++) {
			enemies.push(new EnemyShip(new Point(space.width, Math.round(space.height * thisWave[i].y)), new Point(-1, 0), 20, 20, 100, 10));
		    }
	    }
    }
	    
	    