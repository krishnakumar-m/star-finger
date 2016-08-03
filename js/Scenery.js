var Scenery = {
  bgs: [],
  init: function(cvs,bgs,w,h) {
    var i = bgs.length - 1,
      j = 0;
    this.cvs = cvs;
    this.w =this.cvs.width = w || window.innerWidth;
    this.h = this.cvs.height = h || window.innerHeight;
    
    for (; i >= 0; i--, j++) {
      this.bgs[j] = {};
      this.bgs[j].img = document.createElement('img');
      this.bgs[j].img.src = bgs[i].src;
      this.bgs[j].left = 0;
      this.bgs[j].speed = bgs[i].speed;
    
    }
   
  },
  scene: function() {
    var i = this.bgs.length - 1, left,bgNow;
   var ctx =  this.cvs.getContext('2d');
   ctx.clearRect(0,0,this.w,this.h);
    for (; i >= 0; i--) {
      bgNow = this.bgs[i];
    left = bgNow.left;
      ctx.drawImage(this.bgs[i].img, -left, 0, this.w, this.h);
      ctx.drawImage(this.bgs[i].img, this.w - left, 0, this.w, this.h);
      this.bgs[i].left = (left + this.bgs[i].speed) % this.w;
    }

  }
};
