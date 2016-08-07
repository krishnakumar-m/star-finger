function crosswing(w,h,cvs) {

	var unit = w / 18;
	var lw = 1;
	cvs.ctx.save();
        cvs.ctx.lineWidth = lw;
	var grd = cvs.ctx.createLinearGradient(6 * unit, 0, w, 0);
	grd.addColorStop(0, 'Black');
	grd.addColorStop(1, 'White');

	cvs.ctx.fillStyle = grd; 
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

	grd = cvs.ctx.createLinearGradient(3 * unit, 0, 8 * unit, 0);
	grd.addColorStop(0, 'White');
	grd.addColorStop(1, 'Gray');
	cvs.ctx.fillStyle = grd;
	cvs.ctx.beginPath();
	cvs.ctx.moveTo(3 * unit, 5 * unit);
	cvs.ctx.lineTo(8 * unit, 5 * unit);
	cvs.ctx.lineTo(4 * unit, unit);
	cvs.ctx.lineTo(2 * unit, 2 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	cvs.ctx.beginPath();
	cvs.ctx.moveTo(3 * unit, 10 * unit);
	cvs.ctx.lineTo(8 * unit, 10 * unit);
	cvs.ctx.lineTo(4 * unit, 14 * unit);
	cvs.ctx.lineTo(2 * unit, 13 * unit);
	cvs.ctx.closePath();
	cvs.ctx.stroke();
	cvs.ctx.fill();

	grd = cvs.ctx.createLinearGradient(0, 6 * unit, 0, 9 * unit);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'DarkGray');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(2 * unit, 6 * unit, 16 * unit - lw, 3 * unit, unit, grd, 'Black');
	grd = cvs.ctx.createLinearGradient(0, 5 * unit, 0, 7 * unit);
	grd.addColorStop(0, 'Black');
	grd.addColorStop(0.5, 'Crimson');
	grd.addColorStop(1, 'Black');
	cvs.roundRect(3 * unit, 5 * unit, 9 * unit, 2 * unit, unit, grd, 'Black');
	grd = cvs.ctx.createLinearGradient(0, 8 * unit, 0, 10 * unit);
	grd.addColorStop(0, 'Black');
	grd.addColorStop(0.5, 'Crimson');
	grd.addColorStop(1, 'Black');
	cvs.roundRect(3 * unit, 8 * unit, 9 * unit, 2 * unit, unit, grd, 'Black');

        grd = cvs.ctx.createLinearGradient(0, 6.5 * unit, 0, 8.5 * unit);
	grd.addColorStop(0, 'DarkGray');
	grd.addColorStop(0.5, 'White');
	grd.addColorStop(1, 'DarkGray');
	cvs.rect(lw, 6.5 * unit, 2 * unit, 2 * unit, null, grd); //'White');


        grd = cvs.ctx.createLinearGradient(0, unit, 0, 2 * unit);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'Red');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(unit, unit, 4 * unit, unit, unit / 2, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0, h - 2 * unit, 0, h - unit);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'Red');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(unit, h - 2 * unit, 4 * unit, unit, unit / 2, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0, 0, 0, 2 * unit);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'Red');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(10 * unit, lw, 8 * unit - lw, 2 * unit, unit, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0, h - 2 * unit, 0, h);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'Red');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(10 * unit, h - 2 * unit, 8 * unit - lw, 2 * unit - lw, unit, grd, 'black');
        grd = cvs.ctx.createLinearGradient(0, 6.5 * unit, 0, 8.5 * unit);
	grd.addColorStop(0, 'Gray');
	grd.addColorStop(0.5, 'White');
	grd.addColorStop(1, 'Gray');
	cvs.roundRect(13 * unit, 6.5 * unit, 3 * unit, 2 * unit, unit, grd, 'black');
	cvs.ctx.restore();

    }

function line(x1,y1,x2,y2,level) {
	var x3 = getRandomInt(x1, x2);
	var y3 = getRandomInt(y1, y2);
	if(level == 0) {
		return [ {x:x1,y:y1},{x:x3,y:y3},{x:x2,y:y2}  ];
	    }

	return line(x1, y1, x3, y3, level - 1).concat([{x:x3,y:y3}]).concat(line(x3, y3, x2, y2, level - 1));
    }


function rock(w,h,cvs) {

        var margin = w/5;
	var x1 = getRandomInt(margin, w-margin);
	var y1 = margin;

	var x2 = margin;
	var y2 = getRandomInt(margin, h-margin);

	var x3 = getRandomInt(margin, w-margin);
	var y3 = h-margin;

	var x4 = w-margin;
	var y4 = getRandomInt(margin, h-margin);

	var maxLevel = 2;

	cvs.ctx.beginPath();

	var output = line(x1, y1, x2, y2, maxLevel).concat(
	line(x2, y2, x3, y3, maxLevel)).concat(
	line(x3, y3, x4, y4, maxLevel)).concat(
	line(x4, y4, x1, y1, maxLevel));

	cvs.ctx.moveTo(output[0].x, output[0].y);

	var len = output.length;

	for(i = 1;i < len;i++) {
		cvs.ctx.lineTo(output[i].x, output[i].y);
	    }

	cvs.ctx.closePath();
	cvs.ctx.lineWidth = margin;

	cvs.ctx.strokeStyle = 'rgb(130,95,73)';
	cvs.ctx.stroke();
	cvs.ctx.fillStyle = 'rgb(153,111,86)';
	cvs.ctx.fill();

    }


function powerUp2(w,h,cvs,type) {
	powerupSpriteMaker[type](0.2 * w, 0.2 * w, 0.6 * w, 0.6 * w, cvs);
    }

function twingunSprite(startx,starty,w,h,cvs) {
        var ctx = cvs.ctx;
	ctx.save();
	ctx.translate(startx, starty);
	cvs.rect(0, 0.15 * h, 0.9 * w, 0.1 * h, 'Gray', 'DarkGray');
	cvs.rect(0, 0.75 * h, 0.9 * w, 0.1 * h, 'Gray', 'DarkGray');

	cvs.roundRect(0.8 * w, 0.65 * h, 0.2 * w, 0.3 * h, h * 0.05, 'Red');
	cvs.roundRect(0.8 * w, 0.05 * h, 0.2 * w, 0.3 * h, h * 0.05, 'Red');
	cvs.roundRect(0, 0, w / 3, h, 0.2 * h, 'Gray');
	ctx.restore();
    }



function oneshotSprite(startx,starty,w,h,cvs) {
        var ctx = cvs.ctx;
	ctx.save();
	ctx.translate(startx, starty);
	cvs.rect(0, 0.4 * h, 0.9 * w, 0.2 * h, 'Gray', 'DarkGray');

	cvs.roundRect(0, 0, w / 3, h, 0.2 * h, 'Gray');
	var grd = cvs.ctx.createLinearGradient(0, 0.25 * h, 0, 0.75 * h);
	grd.addColorStop(0, 'rgba(255,255,255,1)');
	grd.addColorStop(0.5, 'rgba(0,255,0,0.3)');
	grd.addColorStop(1, 'rgba(255,255,255,1)');
	cvs.roundRect(0.7 * w, 0.3 * h, 0.3 * w, 0.4 * h, h * 0.25, grd);
	ctx.restore();
    }

function threeshotSprite(startx,starty,w,h,cvs) {
	twingunSprite(startx, starty, w, h, cvs);
	oneshotSprite(startx + 0.2 * w, starty + 0.3 * h, 0.6 * w, 0.4 * h, cvs);
    }
function healthSprite(startx,starty,w,h,cvs) {
        var ctx = cvs.ctx;
	ctx.save();
	ctx.translate(startx, starty);
	cvs.rect(0.2 * w, 0.4 * h, 0.6 * w, 0.2 * h, 'Red', 'Red');
	cvs.rect(0.4 * w, 0.2 * h, 0.2 * w, 0.6 * h, 'Red', 'Red');
	ctx.restore();
    }

function shieldSprite(startx,starty,w,h,cvs) {
        var ctx = cvs.ctx;
	ctx.save();
	ctx.translate(startx, starty);
	ctx.moveTo(w / 2, h);
	ctx.quadraticCurveTo(0, h * 0.75, 0, 0.1 * h);
	ctx.quadraticCurveTo(0.25 * w, 0.5 * h, w / 2, 0);
	ctx.moveTo(w / 2, h);
	ctx.quadraticCurveTo(w, h * 0.75, w, 0.1 * h);
	ctx.quadraticCurveTo(0.75 * w, 0.5 * h, w / 2, 0);
	ctx.fillStyle = 'Gold';
	ctx.fill();
	ctx.restore();

    }


function homerSprite(startx,starty,w,h,cvs) {
        var ctx = cvs.ctx;
	ctx.save();
	ctx.translate(startx, starty);
	var grd = ctx.createRadialGradient(w / 2, h / 2, w / 3, w / 2, h / 2, w / 2);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "gray");
	cvs.circle(w / 2, h / 2, w / 2, 'White', grd);
	ctx.restore();

    }


function wing(w,h,minparts,maxparts) {
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');

	cvs.width = w;
	cvs.height = h;

	var nBlocks = getRandomInt(minparts || 2, maxparts || 4);

	var unitH = Math.round(h / nBlocks);

	x1 = getRandomInt(0, w / 2);
	x2 = getRandomInt(x1 + 1, w);
	h1 = 0;

	var grdflag = true;
	var grdColor = {
	    'true' : 'White',
	    'false' : 'Gray'
	    };
	for(i = 0; i < nBlocks; i++, h1 += unitH) {

		x3 = getRandomInt(0, w / 2);
		x4 = getRandomInt(x3 + 1, w);
		ctx.beginPath();
		ctx.moveTo(x1, h1);
		ctx.lineTo(x2, h1);
		ctx.lineTo(x4, h1 + unitH);
		ctx.lineTo(x3, h1 + unitH);
		ctx.closePath();
		var grd = ctx.createLinearGradient(0, h1, 0, h1 + unitH);
		grd.addColorStop(0, grdColor[grdflag]);
		grd.addColorStop(1, grdColor[!grdflag]);
		ctx.fillStyle = grd;// 'Red';

		ctx.fill();
		//ctx.stroke();
		x1 = x3;
		x2 = x4;
		grdflag = !grdflag;
	    }
	    
	   
	arr = fuselage(w, h, getRandomInt(0.75 * w, w), getRandomInt(0.3 * h, 0.5 * h), ctx);
	// alert(arr);
	tail(w / 4, arr[4], 1, 1, ctx, arr[1]);

	
	return cvs;
    }


function shipIt(w,h) {

	var img = new Image();
//alert(arguments.callee.caller.toString());
	img.src = wing(w, h / 2, 2, 4).toDataURL('image/png');

	var cvs1 = document.createElement('canvas');
	var ctx1 = cvs1.getContext('2d');

	cvs1.width = w;
	cvs1.height = h;
	ctx1.drawImage(img, 0, h / 2);
	ctx1.save();
	ctx1.translate(0, h / 2);
	ctx1.scale(1, -1);
	ctx1.drawImage(img, 0, 0);
	ctx1.restore();
	
	var img1 =new Image();
	img1.src = cvs1.toDataURL('image/png');
	return img1;

    }

function tail(w,h,minparts,maxparts,ctx,x) {
	ctx.save();
	ctx.translate(x, 0);
	var nBlocks = getRandomInt(minparts || 2, maxparts || 4);

	var unitH = h / nBlocks;
	x1 = getRandomInt(0, w / 2);
	x2 = getRandomInt(x1 + 1, w);
	h1 = 0;

	/*  var grdflag = true;
	 var grdColor = {
	 true : 'Orange',
	 false : 'Gray'
	 };*/

	for(i = 0; i < nBlocks; i++, h1 += unitH) {

		x3 = getRandomInt(0, w / 2);
		x4 = getRandomInt(x3 + 1, w);
		ctx.beginPath();
		ctx.moveTo(x1, h1);
		ctx.lineTo(x2, h1);
		ctx.lineTo(x4, h1 + unitH);
		ctx.lineTo(x3, h1 + unitH);
		ctx.closePath();
		/*var grd = ctx.createLinearGradient(0,h1,0,unitH);
		 grd.addColorStop(0,grdColor[grdflag]);
		 grd.addColorStop(1,grdColor[!grdflag]);*/
		ctx.fillStyle = 'DarkGray';

		ctx.fill();
		//ctx.stroke();
		x1 = x3;
		x2 = x4;
	    }
	ctx.restore();
    }


function fuselage(totalw,totalh,w,h,ctx) {
	var fuseLageColors = ['Orange','Red','Green','Blue','Yellow'];

	/*ctx.save();
	 ctx.translate(0,totalh);*/
	x1 = getRandomInt(0, totalw - w);
	//x2 = getRandomInt(x1+1,w)
	x2 = w;
	x3 = getRandomInt(0, w / 2);
	x4 = getRandomInt(x3 + 1, w);
	ctx.beginPath();
	ctx.moveTo(x1, 0);
	ctx.lineTo(x2, 0);
	ctx.lineTo(x4, h / 2);
	ctx.lineTo(x3, h / 2);
	ctx.closePath();
	ctx.fillStyle = fuseLageColors[getRandomInt(0, 3)];
	ctx.strokeStyle = 'Black';
	ctx.fill();
	ctx.stroke();
	cockpit(x1, x2, x3, x4, h, ctx);
	return [x1, x2, x3, x4, h];
	//ctx.restore();
    }

function cockpit(x1,x2,x3,x4,h,ctx) {

	var w1 = x2 - x1;
	// nx1 = getRandomInt(x1 + 1, x2 / 2 - 1);
	nx1 = x1 + 5;
	nx2 = getRandomInt(x2 / 2 + 1, x2 - 1);
	// nx2 = nx1 + w1/2;
	// nx3 = getRandomInt(x3 + 1, x4 / 2 - 1);
	nx3 = x3 + 5;
	nx4 = getRandomInt(x4 / 2 + 1, x4 - 1);
	//nx4 = nx3 + (x4-x3)/2;
	ctx.beginPath();
	ctx.moveTo(nx1, 0);
	ctx.lineTo(nx2, 0);
	ctx.lineTo(nx4, h / 4);
	ctx.lineTo(nx3, h / 4);
	ctx.closePath();
	ctx.fillStyle = 'Silver';

	ctx.fill();
	ctx.stroke();

    }


function lightning(x,y,w,h,cvs,lastOutput) {
        cvs.ctx.save();
	if(lastOutput.length) {
		cvs.ctx.lineWidth = 2;
		cvs.poly(lastOutput, null, 'rgba(255,255,255,0.3)');
	    }

	var output = midpointDisp(x+w/2, y, x+w/2, y+h, 3);
	cvs.ctx.lineWidth = 4;
	cvs.poly(output, null, 'rgba(255,255,255,1)');
	cvs.ctx.restore();
	return output;
    }

function midpointDisp(x1,y1,x2,y2,level) {
	var midy = (y1 + y2) / 2;
	var midx = (x1 + x2) / 2;
        var disp = 10;
	var x3 = midx + getRandomInt(-disp, disp);
	var y3 = midy + getRandomInt(-disp, disp);
	if(level == 0) {
		return [ {x:x1,y:y1},{x:x3,y:y3},{x:x2,y:y2}  ];
	    }

	return midpointDisp(x1, y1, x3, y3, level - 1).concat([{x:x3,y:y3}]).concat(midpointDisp(x3, y3, x2, y2, level - 1));


    }
    
function nmsky() {

	var cvs = new Canvas('bg1', 700, 500); 
	var bgs = [{

		speed: 1,
		src: randomStarBg(cvs, 0.2)
		},
		{
		speed: 3,
		src: bgLandScape(cvs, getRandomInt(100, 200), 'hsl(240,40%,50%)', 3, 100, 0.55)
		},
		{
		speed: 5,
		src: bgLandScape(cvs, getRandomInt(200, 300), 'hsl(240,40%,30%)', 4, 100, 0.5)
		},
		{
		speed: 7,
		src: bgLandScape(cvs, getRandomInt(300, 400), 'hsl(240,40%,10%)', 5, 100, 0.3)

		}
	    ];

	Scenery.init(cvs.cvs, bgs, 700, 500);
	Game.init(function() {Scenery.scene();}, 60);
    }

function bgLandScape(cvs,y,color,folds,max,cragginess) {
	var ctx =cvs.ctx;
	cvs.clear();
	cvs.poly(midpointDisp(0, y, cvs.width, y, folds, max, cragginess));
	ctx.lineTo(cvs.width, cvs.height);
	ctx.lineTo(0, cvs.height);
	//ctx.lineTo(0,y);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();

	return cvs.cvs.toDataURL();
    }

function randomStarBg(bg,x) {
        var hsl ;
	var hs = [0,60,240];
	bg.clear();
	for(var i=0;i < 200;i++) {
	        var sat = getRandomInt(50, 100);
		hsl = 'hsla(' + hs[getRandomInt(0, 2)] + ',' + sat + '%,88%,1';
		bg.circle(bg.width * Math.random(), bg.height * Math.random(), x * Math.random(), hsl, hsl);
	    }
	return bg.cvs.toDataURL();
    }
