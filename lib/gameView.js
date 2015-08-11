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

  GameView.prototype.renderOpening = function() {
    var that = this;
    window.addEventListener("keypress", function fun( e ){
      // $("#message").html("");
      that.game.addAsteroids();

      window.removeEventListener('keypress', fun);
      that.start();
    })
  };

  // GameView.prototype.renderPlayAgain = function() {
  //   console.log("play again")
  //   var that = this;
  //
  // };

  GameView.prototype.start = function (e) {

    var gameView = this;

      gameView.timerId = setInterval(
        function () {
          if (gameView.state === "paused") { return }
          gameView.game.step();
          gameView.game.draw(gameView.ctx);
          if (gameView.game.won()) {
            gameView.state = "paused"
            gameView.renderVictory();
          } else if (gameView.game.over()) {
            gameView.state = "paused"
            gameView.renderOver();
          }
        }, 20
      );

      if (this.binded !== true) {
        console.log("binded")
      gameView.bindKeyHandlers();
      this.binded === true}
  };

  GameView.prototype.renderVictory = function() {
    $("#message").html('<h3>Victory!</h3><h3>Press "P" to play again!</h3>')
  };

  GameView.prototype.renderOver = function() {
    $("#message").html('<h3>Game Over!</h3><h3>Press "P" to play again!</h3>')
  }

  GameView.MOVES = {
    up : [ 0, -1],
    left : [-1,  0],
    down : [ 0,  1],
    right : [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    console.log("bind keys22")
    var ctx = this.ctx;
    var ship = this.ship;
    var that = this;
    //xx

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      //XXX
      key(k, function (e) {
      e.preventDefault();
          if (e.keyCode === 39) {
          // ship.angle -= 20
          ship.turnRight();
        } else if (e.keyCode === 37) {
          ship.turnLeft();
          // ship.angle += 20
        } else if (e.keyCode === 38) {
          ship.moveUp(ctx)
        } else if (e.keyCode === 40) {
          ship.moveDown(ctx)
        }
      });
    });

    key("space", function () { ship.fireBullet() });
    key("p", function(e) {
      if (that.game.won() || that.game.over()) {
        $("#message").html("");
        console.log("inside p")
        that.game.asteroids = [];
        that.game.addAsteroids();
        that.game.lives = 3;
        that.ship.speed = 1;
        that.state = "play"
      }

    })
    key("d", function () { debugger } );
  };


  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
