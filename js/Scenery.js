var Scenery = {
  bgs: [],
  init: function(bgs) {
    var i = bgs.length - 1,
      j = 0;
      
    for (; i >= 0; i--, j++) {
      this.bgs[j] = {};
      this.bgs[j].cvs = document.getElementById(bgs[i].id);
      this.bgs[j].ctx = this.bgs[j].cvs.getContext('2d');
      this.bgs[j].img = document.createElement('img');
      this.bgs[j].img.src = bgs[i].src;
      this.bgs[j].left = 0;
      this.bgs[j].speed = bgs[i].speed;
      this.bgs[j].cvs.height = bgs[i].height|| window.innerHeight;
      this.bgs[j].cvs.width = bgs[i].width|| window.innerWidth;
    }
   
  },
  scene: function() {
    var i = this.bgs.length - 1,
      left, w, h, bgNow, bgCtx;
    for (; i >= 0; i--) {
	
      bgNow = this.bgs[i];
      left = bgNow.left;
      w = bgNow.cvs.width;
      h = bgNow.cvs.height;
      bgCtx = bgNow.ctx;

      bgCtx.clearRect(0, 0, w, h);
      bgCtx.drawImage(this.bgs[i].img, -left, 0, w, h);
      bgCtx.drawImage(this.bgs[i].img, w - left, 0, w, h);
      this.bgs[i].left = (left + this.bgs[i].speed) % w;
    }

  }
};
