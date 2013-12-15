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

function Player(image1, image2, plumeImg, shadowImg, footPrintImage) {

  var footPrints = [];
  var footPrintIndex = 0;
  for(var i = 0; i < 10; i++) {
    footPrints.push(new FootPrint(footPrintImage, i % 2 == 0));
  }

  var colorInt = (Math.random()*0xFFFFFF<<0);
  this.color = '#'+colorInt.toString(16);

  var plume = tintImage(plumeImage, this.color);

  var img1 = image1;
  var img2 = image2;

  this.direction = 1;
  this.walking = false;

  this.isBot = false;
  this.isYou = false;

  var x = 0;
  var y = 0;

  this.disconnected = false;
  this.score = 0;
  this.width = 64;
  this.height = 123;

  var timeSinceLastFootprint = null;

  this.updateFootprints = function(time) {
    var nextFootPrint = footPrints[footPrintIndex];
    if(this.timeSinceLastFootprint == null) {
      this.timeSinceLastFootprint = time;
    }

    if((time - this.timeSinceLastFootprint) > 200 && this.walking) {
      this.timeSinceLastFootprint = time;
      nextFootPrint.show(this.x, this.y+(this.height/2));
      footPrintIndex ++;

      if(footPrintIndex >= footPrints.length) {
        footPrintIndex = 0;
      }
    }
  }

  this.renderFootprints = function(context, time) {
    for(var i in footPrints) {
      footPrints[i].render(context);
    }
  }


  this.render = function(context, time) {
    context.translate(this.x, this.y);
    context.drawImage(shadowImg, -this.width/2,(this.height/2)-(shadowImg.height*1.5));
    context.scale(this.direction, 1);

    context.drawImage((this.walking && time % 500 > 250) ? img1 : img2, -this.width/2,-this.height/2);
    context.drawImage(plume, -this.width/2,-this.height/2);
    context.scale(this.direction, 1);
    if(this.isBot) {
      context.fillStyle = '#101010';
      context.font = "16px sans";

      context.fillText("bot", 0, -this.height / 2);
    }
    if(this.isYou) {
      context.fillStyle = this.color;
      context.strokeStyle = "#101010";
      context.font = "20px bold sans";
      context.lineWidth = 2;
      context.strokeText("you", 0, -this.height / 2);
      context.fillText("you", 0, -this.height / 2);
    }
    context.translate(-this.x, -this.y);
  }
}