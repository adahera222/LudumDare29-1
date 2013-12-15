function Arrow(img) {
  this.x = 0;
  this.y = 0;

  this.player = null;
  this.target = null;
  this.firing = false;

  this.render = function(context, time) {
    var x = this.x;

    if(this.player != null && !this.firing) {
      x += 20 * (this.player.direction);
    }

    context.translate(x, this.y);
    rotation = ((time % 750) / 750) * (2 * Math.PI);
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