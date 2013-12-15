function Arrow(gameWidth, gameHeight) {
  this.x = Math.random()*gameWidth;
  this.y = Math.random()*gameHeight;

  this.width = 20;
  this.height = 20;

  var speed = 0.5;

  this.player = null;
  this.target = null;
  this.firing = false;

  this.timeout = null;

  this.reset = function() {
    this.firing = false;
    if(this.player != null) {
      this.player.arrow = null;
    }
    this.player = null;
    this.target = null;
    this.timeout = null;

    this.x = Math.random()*gameWidth;
    this.y = Math.random()*gameHeight;
  }

  this.update = function(dt, players, nts) {
    if(this.player != null) {
      if(!this.firing && nts > this.timeout) {
        this.reset();
        return;
      }
      
      if(!this.firing) {
        this.x = this.player.x;
        this.y = this.player.y;
      }

      var shortest = null;
      for(var i in players) {
        if(!players[i].disconnected && !players[i].hit) {
          var player = players[i];
          if(player != this.player) {
            var xd = player.x - this.x;
            var yd = player.y - this.y;
            var distSq = (xd * xd) + (yd * yd);

            if(shortest == null || distSq < shortest) {
              shortest = distSq;
              this.target = player;
            }
          }
        }
      }
      
      if(this.firing) {
        var dx = this.target.x - this.x;
        var dy = this.target.y - this.y;

        var l = Math.sqrt((dx * dx) + (dy * dy));
        this.x += (speed * dt * (dx / l));
        this.y += (speed * dt * (dy / l));
      }
    }

    if(this.player == null || this.firing) {
      for(var i in players) {
        if(!players[i].disconnected &&
           !players[i].hit &&
           !((players[i].x + (players[i].width / 2)) < (this.x - this.width / 2) ||
             (players[i].x - (players[i].width / 2)) > (this.x + this.width / 2) ||
             (players[i].y + (players[i].height / 2)) < (this.y - this.height/ 2) ||
             (players[i].y - (players[i].height / 2)) > (this.y + this.height / 2))) {
          if(!this.firing) {
            this.player = players[i];
            this.player.arrow = this;
            this.timeout = nts + 6000;
          } else if(this.player != players[i]) {
            this.player.score += 1;
            players[i].score -= 1;
            players[i].startHit(nts);
            this.reset();
          }
        }
      }
    }
  }
}

module.exports = Arrow;