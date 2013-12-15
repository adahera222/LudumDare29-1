var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});

var Player = require('./player');
var Arrow = require('./arrow');

var width = 1440;
var height = 800;

var players = [];
var arrow = new Arrow(width, height);
var nextPlayerIndex = 0;


wss.on('connection', function(newWs) {
    var player = new Player(newWs, nextPlayerIndex, width, height);
    players[nextPlayerIndex] = player;
    nextPlayerIndex ++;
});

var previousTs = -1;

function gameLoop() {
  var nts = Date.now();
  var dt = 0
  if(previousTs > -1) {
    dt = Math.min(100, nts - previousTs);
  }
  previousTs = nts;

  for(var i in players) {
    if(players[i] && !players[i].disconnected) {
      players[i].update(dt);
    }
  }

  arrow.update(dt, players);

  var state = '';
  state += 'a';
  state += ':'
  state += arrow.x;
  state += ':'
  state += arrow.y;
  state += ':';
  state += (arrow.player == null ? '-1' : arrow.player.index);
  state += ':';
  state += (arrow.target == null ? '-1' : arrow.target.index);
  state += ':';
  state += arrow.firing ? 1 : 0;
  state += ':';
  for(var i in players) {
    if(players[i]) {
      state += players[i].index;
      state += ':'
      state += players[i].x;
      state += ':'
      state += players[i].y;
      state += ':';
      state += players[i].direction;
      state += ':';
      state += players[i].walking ? 1 : 0;
      state += ':';
      state += players[i].score;
      state += ':';
      state += players[i].disconnected ? 1 : 0;
      state += ':';
    }
  }

  for(var i in players) {
    if(players[i]) {
      players[i].send(state);
    }
  }

  var toRemove = [];
  for(var i in players) {
    if(players[i].disconnected) {
      toRemove.push(i);
    }
  }

  for(var i in toRemove) {
    if(players[toRemove[i]] == arrow.player) {
      arrow.reset();
    }
    // players.splice(toRemove[i], 1);
  }

  setTimeout(gameLoop, 1000/60);
};

gameLoop();
