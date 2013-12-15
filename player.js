function tintImage(img, color) {
  var buffer = document.createElement('canvas');
  buffer.width = img.width;
  buffer.height = img.height;
  var bx = buffer.getContext('2d');
  bx.fillStyle = color;
  bx.fillRect(0,0,buffer.width,buffer.height);

  bx.globalCompositeOperation = "destination-atop";
  bx.drawImage(img,0,0);

  return buffer;
}

function Player(image1, image2, plumeImg) {

  var colorInt = (Math.random()*0xFFFFFF<<0)
  this.color = '#'+colorInt.toString(16)

  var plume = tintImage(plumeImage, this.color);

  var img1 = image1;
  var img2 = image2;

  this.direction = 1;
  this.walking = false;

  var x = 0;
  var y = 0;

  this.disconnected = false;
  this.score = 0;
  this.width = 64;
  this.height = 123;


  this.render = function(context, time) {
    context.translate(this.x, this.y);
    context.scale(this.direction, 1);

    context.drawImage((this.walking && time % 500 > 250) ? img1 : img2, -this.width/2,-this.height/2);
    context.drawImage(plume, -this.width/2,-this.height/2);
    context.scale(this.direction, 1);
    context.translate(-this.x, -this.y);
  }
}