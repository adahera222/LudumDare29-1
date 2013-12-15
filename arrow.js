function Arrow(img, shadowImg) {
  this.x = 0;
  this.y = 0;

  this.player = null;
  this.target = null;
  this.firing = false;
  this.timingOut = false;

  this.render = function(context, time) {
    if(this.timingOut && time % 500 > 250) {
      return;
    }
    var x = this.x;

    if(this.player != null && !this.firing) {
      x += 20 * (this.player.direction);
    }

    context.translate(x, this.y);
    rotation = ((time % 750) / 750) * (2 * Math.PI);

    context.drawImage(shadowImg, -img.width/2,(img.height/2)-(shadowImg.height*0.5));

    if(this.firing) {
      context.rotate(rotation);
    }
    context.drawImage(img, -(img.width / 2),-(img.height / 2));
    if(this.firing) {
      context.rotate(-rotation);
    }
    context.translate(-x, -this.y);
  }
}