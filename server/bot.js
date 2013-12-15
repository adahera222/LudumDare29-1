var _ = require('underscore');
var Player = require('./player');

function Bot(ws, index, gameWidth, gameHeight) {
  _.extend(this, new Player(ws, index, gameWidth, gameHeight))

  this.isBot = true;

  var randomTargetX = null;
  var randomTargetY = null;

  var reactionTimeOut = null;

  this.moveToPoint = function(x, y) {
    if(Math.abs(this.x - x) > this.width / 2) {
      if(x < this.x) {
        this.keys.left = true;
        this.keys.right = false;
      } else {
        this.keys.right = true;
        this.keys.left = false;
      }
    } else {
      this.keys.left = false;
      this.keys.right = false;
    }

    if(Math.abs(this.y - y) > this.height / 2) {
      if(y < this.y) {
        this.keys.up = true;
        this.keys.down = false;
      } else {
        this.keys.down = true;
        this.keys.up = false;
      }
    } else {
      this.keys.up = false;
      this.keys.down = false;
    }

    return (Math.abs(this.x - x) < this.width / 2) && (Math.abs(this.y - y) < this.height / 2)
  }

  this.updateBot = function(arrow, time) {
    this.keys.fire = false;
    
    if(arrow.player == null) {
      if(reactionTimeOut == null) {
        reactionTimeOut = time + (Math.random() * Math.max(500, 500 + this.score * 200));
      }
    } else {
       reactionTimeOut = null
    }

    if(arrow.player == null &&
      reactionTimeOut < time) {
      randomTargetX = null;
      randomTargetY = null;
      this.moveToPoint(arrow.x, arrow.y);
    } else {
      if(randomTargetX == null) {
        randomTargetX = Math.random()*gameWidth;
      }

      if(randomTargetY == null) {
        randomTargetY = Math.random()*gameHeight;
      }

      var atPoint = this.moveToPoint(randomTargetX, randomTargetY);

      if(atPoint) {
        randomTargetX = null;
        randomTargetY = null;

        if(arrow.player == this) {
          this.keys.fire = true;
        }
      }
    }
  }
}

module.exports = Bot;
