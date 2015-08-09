(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 20
    );
    //razobratsya
    this.bindKeyHandlers();
  };

  GameView.MOVES = {
    up : [ 0, -1],
    left : [-1,  0],
    down : [ 0,  1],
    right : [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ctx = this.ctx;
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function (e) {
        e.preventDefault();

        if (e.keyCode === 38 || e.keyCode === 40) {
        ship.power(move);
      } else if (e.keyCode === 39) {
        Asteroids.turnRight = true
        // ship.turnRight(ctx)
      } else if (e.keyCode === 37) {
        ship.turnLeft(ctx)
      }
      });
    });

    key("space", function () { ship.fireBullet() });
  };


  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
