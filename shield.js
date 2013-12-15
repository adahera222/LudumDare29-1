function Shield(img, shadowImg) {
  this.x = 0;
  this.y = 0;

  this.player = null;
  this.timingOut = false;

  this.render = function(context, time) {
    if(this.timingOut && time % 500 > 250) {
      return;
    }
    var x = this.x;

    if(this.player != null) {
      x += 20 * (this.player.direction);
    }

    context.translate(x, this.y);

    context.drawImage(shadowImg, -img.width/2,(img.height/2)-(shadowImg.height*0.5));

    context.drawImage(img, -(img.width / 2),-(img.height / 2));
    context.translate(-x, -this.y);
  }
}