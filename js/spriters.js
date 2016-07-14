function crosswing(w,h,cvs) {
	
	var unit = w / 18;
	var lw = 1;
	cvs.ctx.save();
        cvs.ctx.lineWidth=lw;
	var grd = cvs.ctx.createLinearGradient(6*unit,0,w,0);
	grd.addColorStop(0,'Black');
	grd.addColorStop(1,'White');
	
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

	grd = cvs.ctx.createLinearGradient(3*unit,0,8*unit,0);
	grd.addColorStop(0,'White');
	grd.addColorStop(1,'Gray');
	cvs.ctx.fillStyle = grd;
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

	grd = cvs.ctx.createLinearGradient(0,6*unit,0,9*unit);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'DarkGray');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(2 * unit, 6 * unit, 16 * unit-lw, 3 * unit, unit, grd, 'Black');
	grd = cvs.ctx.createLinearGradient(0,5*unit,0,7*unit);
	grd.addColorStop(0,'Black');
	grd.addColorStop(0.5,'Crimson');
	grd.addColorStop(1,'Black');
	cvs.roundRect(3 * unit, 5 * unit, 9 * unit, 2 * unit, unit, grd, 'Black');
	grd = cvs.ctx.createLinearGradient(0,8*unit,0,10*unit);
	grd.addColorStop(0,'Black');
	grd.addColorStop(0.5,'Crimson');
	grd.addColorStop(1,'Black');
	cvs.roundRect(3 * unit, 8 * unit, 9 * unit, 2 * unit, unit, grd, 'Black');
	
        grd = cvs.ctx.createLinearGradient(0,6.5*unit,0,8.5*unit);
	grd.addColorStop(0,'DarkGray');
	grd.addColorStop(0.5,'White');
	grd.addColorStop(1,'DarkGray');
	cvs.rect(lw, 6.5 * unit, 2 * unit, 2 * unit, null,grd); //'White');
	

        grd = cvs.ctx.createLinearGradient(0,unit,0,2*unit);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'Red');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(unit, unit, 4 * unit, unit, unit / 2, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0,h-2*unit,0,h-unit);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'Red');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(unit, h - 2 * unit, 4 * unit, unit, unit / 2, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0,0,0,2*unit);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'Red');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(10 * unit, lw, 8 * unit-lw, 2 * unit, unit, grd, 'black');
	grd = cvs.ctx.createLinearGradient(0,h - 2 * unit,0,h);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'Red');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(10 * unit, h - 2 * unit, 8 * unit-lw, 2 * unit-lw, unit, grd, 'black');
        grd = cvs.ctx.createLinearGradient(0,6.5 * unit,0,8.5*unit);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'White');
	grd.addColorStop(1,'Gray');
	cvs.roundRect(13 * unit, 6.5 * unit, 3 * unit, 2 * unit, unit, grd, 'black');
	cvs.ctx.restore();
	
    }


function mouse(w,h,cvs) {
	
	var ctx = cvs.ctx;
	var r = w / 5;
	
	var startAngle = 0.75 * Math.PI;
	var endAngle = 1.25 * Math.PI;
	var innerRadRatio = 0.25;
	var x1 = 4 * r + r * Math.cos(startAngle);
	var x2 = 4 * r + r * Math.cos(startAngle) * innerRadRatio;
	var y1 = r - r * Math.sin(startAngle);
	var y2 = r - r * Math.sin(startAngle) * innerRadRatio;
	var y3 = r - r * Math.sin(endAngle);
	var y4 = r - r * Math.sin(endAngle) * innerRadRatio;
       ctx.strokeStyle = 'White';
       
        var grd = ctx.createLinearGradient(0,0,0,h);
	grd.addColorStop(0,'Gray');
	grd.addColorStop(0.5,'White');
	grd.addColorStop(1,'Gray');
	ctx.fillStyle = grd;
	ctx.beginPath();
	ctx.arc(4 * r, r, r, endAngle, startAngle);
	ctx.arc(4 * r, r, r * innerRadRatio, startAngle, endAngle, true);
	ctx.closePath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(r, y1);
	ctx.lineTo(0, y2);
	ctx.lineTo(x2, y2);
	ctx.moveTo(x1, y3);
	ctx.lineTo(r, y3);
	ctx.lineTo(0, y4);
	ctx.lineTo(x2, y4);
	ctx.fill();
    }
function raider(w,h,cvs) {
    
	var unit = w / 4;
	//var cvs = new Canvas('fld', w, h);
	cvs.ctx.strokeStyle = 'Gray';
	var tmp = cvs.ctx.lineWidth;
	cvs.ctx.lineWidth = 5;
	cvs.ctx.moveTo(3 * unit, unit / 2);
	cvs.ctx.lineTo(3 * unit, 2.5 * unit + 1);
	cvs.ctx.stroke();

	cvs.ctx.moveTo(2 * unit, unit / 2);
	cvs.ctx.lineTo(3 * unit, 1.5 * unit );
	cvs.ctx.stroke();

	cvs.ctx.moveTo(2 * unit, 2.5*unit +1);
	cvs.ctx.lineTo(3 * unit, 1.5 * unit );
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

	
	var grd = cvs.ctx.createLinearGradient(0,1.33*unit,0,1.66*unit);
	grd.addColorStop(0,'Black');
	grd.addColorStop(0.5,'White');
	grd.addColorStop(1,'Black');
	
	cvs.rect(0,1.33*unit,unit,0.33*unit,'White',grd);
    }


//5:7    
function warbird(w,h,cvs) {
	var unit = w / 5;
	cvs.ctx.translate(w, h);
	cvs.ctx.rotate(Math.PI);
	cvs.rect(1.5 * unit, 1.66 * unit, unit, 3.66 * unit, 'Gray', 'Gray');
	cvs.roundRect(unit, 2 * unit, 2 * unit, 3 * unit, unit / 5, 'White', 'Black');
	cvs.roundRect(2 * unit, 3 * unit, 2 * unit, unit, unit / 10, 'Gray', 'Black');
	cvs.rect(4 * unit, 3.33 * unit, unit, 0.33 * unit, 'Black', 'White');
	
	var grd = cvs.ctx.createLinearGradient(0,3.33*unit,0,3.66*unit);
	grd.addColorStop(0,'White');
	grd.addColorStop(0.5,'Black');
	grd.addColorStop(1,'White');
	cvs.ctx.fillStyle = grd;
	cvs.ctx.fill();
	

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
	
    }

function rat(w,h,cvs) {
	
	var unit = w / 7;

	var ctx = cvs.ctx;
	ctx.beginPath();
	var grd = ctx.createLinearGradient(0, 0, w, 0);
	grd.addColorStop(0, "gray");
	grd.addColorStop(1, "white");

	ctx.fillStyle = grd;
	ctx.moveTo(0, 3 * unit);
	ctx.lineTo(3 * unit, 3 * unit);
	ctx.quadraticCurveTo(0.6 * w, 0, w, 0);
	ctx.quadraticCurveTo(w / 9, 0, 0, 3 * unit);
	ctx.stroke();
	ctx.moveTo(0, 4 * unit);
	ctx.lineTo(3 * unit, 4 * unit);
	ctx.quadraticCurveTo(0.6 * w, h, w, h);
	ctx.quadraticCurveTo(w / 9, h, 0, 4 * unit);
	ctx.stroke();
	ctx.fill();


	grd = ctx.createRadialGradient(unit, h / 2, unit / 3, unit, h / 2, unit);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "gray");

	ctx.fillStyle = grd;
	ctx.beginPath();
	ctx.arc(1.5 * unit, h / 2, unit / 2, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
    }
