function Player(ws, index, gameWidth, gameHeight) {
  this.x = Math.random()*gameWidth;
  this.y = Math.random()*gameHeight;

  this.score = 0;

  this.width = 64;
  this.height = 96;

  this.index = index;
  this.disconnected = false;
  this.walking = false;

  this.hasArrow = false;

  this.direction = 1;

  var keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    fire: false,
    music: false
  };

  var speed = 0.4;

  ws.on('message', function(message) {
    keys.left = message[0] == '1';
    keys.right = message[1] == '1';
    keys.up = message[2] == '1';
    keys.down = message[3] == '1';
    keys.fire = message[4] == '1';
  });

  this.update = function(dt, nts, nextFootPrint) {
    if(keys.left) {
      this.x -= dt*speed;
      this.direction = -1;
    }
    if(keys.right) {
      this.x += dt*speed;
      this.direction = 1;
    }
    if(keys.up) {
      this.y -= dt*speed;
    }
    if(keys.down) {
      this.y += dt*speed;
    }

    this.walking = keys.down || keys.up || keys.left || keys.right;

    if(this.x < 0) {
      this.x = 0;
    }

    if(this.y < 0) {
      this.y = 0;
    }

    if(this.x > gameWidth) {
      this.x = gameWidth;
    }

    if(this.y > gameHeight) {
      this.y = gameHeight;
    }

    if(keys.fire && this.arrow != null && !this.arrow.firing) {
      this.arrow.firing = true;
    }
  }

  this.send = function(state) {
    if(ws) {
      var self = this;
      ws.send(state,  function(error) {
        if(error) {
          //console.log(error);
          self.disconnected = true;
          //console.log(self);
        }
      });
    }
  }
}

module.exports = Player;
