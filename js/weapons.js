/*
 This file defines the weapons that can be used in the game. 
 Define the reload and weapon fire function below.
 Fire function defines how the bullets will be generated. 
 */

var weapons = {
    'twingun' : {
	fire : twingun,
	reload : 30
	},

    'oneshot' : {
	fire : oneshot,
	reload : 30
	},
    '3shot' : {
	fire : threeshot,
	reload :40
	},
     'homer' : {
        fire : homer,
	reload :50
     }
    };
/* Firing definitions
 */
function oneshot(ship) {
	var loc,vel;
	if(ship.isPlayer) {
		loc = new Point(ship.loc.x + ship.w, ship.loc.y + ship.h / 2);
		vel = new Point(5, 0);
	    }
	else {
		loc = new Point(ship.loc.x, ship.loc.y + ship.h / 2);
		vel = new Point(-5, 0);
	    }
	return [new EnemyBullet(loc, vel, 6, 2, 10)];
    }

function threeshot(ship) {
	return oneshot(ship).concat(twingun(ship));
    }


function twingun(ship) {
	var loc1,vel1,loc2,vel2;
	if(ship.isPlayer) {
		loc1 = new Point(ship.loc.x + ship.w, ship.loc.y);
		vel1 = new Point(7, 0);
		loc2 = new Point(ship.loc.x + ship.w, ship.loc.y + ship.h);
		vel2 = new Point(7, 0);
	    }
	else {
		loc1 = new Point(ship.loc.x, ship.loc.y);
		vel1 = new Point(-7, 0);
		loc2 = new Point(ship.loc.x, ship.loc.y + ship.h);
		vel2 = new Point(-7, 0);
	    }

	return [new Bullet(loc1, vel1, 2, 2, 5), new Bullet(loc2, vel2, 2, 2, 5)];
    }
    
function homer(ship) {
    var loc = new Point(ship.loc.x + ship.w, ship.loc.y + ship.h / 2);
    var vel = new Point(5, 0);
    
    return [new Homer(loc,vel,3,2,5,ship.isPlayer)];
}
