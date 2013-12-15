function FootPrint(img, leftFoot) {
  this.x = 0;
  this.y = 0;
  this.visible = false;

  this.show = function(x, y) {
    this.x = x+((Math.random()*10)-5);
    this.y = y+((Math.random()*10)-5);

    this.visible = true;
  }


  this.render = function(context, time) {
    if(this.visible) {
      var y = this.y-(img.height/2)
      if(leftFoot) {
        y -= img.height * 2;
      }
      context.drawImage(img, this.x-(img.width/2), y);
    }
  }


}