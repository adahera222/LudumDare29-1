function Shield(gameWidth, gameHeight) {
  this.x = Math.random()*gameWidth;
  this.y = Math.random()*gameHeight;

  this.width = 20;
  this.height = 20;

  var speed = 0.5;

  this.player = null;

  this.timeout = null;

  this.reset = function() {
    if(this.player != null) {
      this.player.shield = null;
    }
    this.player = null;
    this.timeout = null;

    this.x = Math.random()*gameWidth;
    this.y = Math.random()*gameHeight;
  }

  this.update = function(dt, players, nts) {
    if(this.player != null) {
      if(nts > this.timeout) {
        this.reset();
        return;
      }
      
      this.x = this.player.x;
      this.y = this.player.y;
    }

    if(this.player == null) {
      for(var i in players) {
        if(!players[i].disconnected &&
           !players[i].hit &&
           !((players[i].x + (players[i].width / 2)) < (this.x - this.width / 2) ||
             (players[i].x - (players[i].width / 2)) > (this.x + this.width / 2) ||
             (players[i].y + (players[i].height / 2)) < (this.y - this.height/ 2) ||
             (players[i].y - (players[i].height / 2)) > (this.y + this.height / 2))) {
          if(players[i].arrow == null) {
            this.player = players[i];
            this.player.shield = this;
            this.timeout = nts + 6000;
          }
        }
      }
    }
  }
}

module.exports = Shield;