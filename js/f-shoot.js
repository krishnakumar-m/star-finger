// y relative positionon y axis
var waves = {
    50 : [{
	    y : 0.2
	    }],
    75 :[ {
	    y : 0.5
	    } ],    
    150 :[ {
	    y : 0.2
	    } ]

    };
function lifeMeter() {
    
}
    
function test() {
	space = new Canvas('fld', window.innerWidth, window.innerHeight);
	player = new Ship(new Point(0, 0), new Point(0, 0), 40, 20, 15, 20);
	enemies = [];
	//enemies.push( new EnemyShip(new Point(space.width, space.height / 2), new Point(-1, 0), 20, 20, 40, 10));
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
			// timer = window.requestAnimationFrame(loop);
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
			reload = player.reload;

			bullt = window.setInterval(function() {
				reload--;
				if(reload == 0) {
					bullets.push(new Bullet(new Point(player.loc.x + player.w, player.loc.y), new Point(7, 0), 2, 2, 2));
					bullets.push(new Bullet(new Point(player.loc.x + player.w, player.loc.y + player.h), new Point(7, 0), 2, 2, 2));
					reload = player.reload;
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
	/*enemyShip.move();
	 enemyShip.show();*/
	for(i = bullets.length - 1; i >= 0;i--) {
		bullets[i].move();
		bullets[i].show();
		if(bullets[i].loc.x > space.width) {
			bullets.splice(i, 1);
		    }
		/*else if(collisionCheck(bullets[i], enemyShip)) {
		 partSys.add(new ParticleSystem(10, bullets[i].loc.x, bullets[i].loc.y, space.ctx , config, false));
		 bullets.splice(i, 1);
		 }*/
	    }
        hitEnemy();
	/*for(i = enemyBullets.length - 1; i >= 0;i--) {
	 enemyBullets[i].move();
	 enemyBullets[i].show();
	 if(enemyBullets[i].loc.x < 0) {
	 enemyBullets.splice(i, 1);
	 }    
	 else if(collisionCheck(enemyBullets[i], player)) {
	 partSys.add(new ParticleSystem(100, enemyBullets[i].loc.x, enemyBullets[i].loc.y, space.ctx , config, false));
	 enemyBullets.splice(i, 1);
	 }
	 }*/
	hitsByEnemy();
	partSys.update();
	partSys.show();
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
			enemies.push(new EnemyShip(new Point(space.width, Math.round(space.height * thisWave[i].y)), new Point(-1, 0), 20, 20, 40, 10));
		    }
	    }
    }
