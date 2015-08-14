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

  GameView.prototype.renderOpening = function(ctx) {
    var that = this;
    window.addEventListener("keypress", function fun( e ){
      that.game.addAsteroids();
      window.removeEventListener('keypress', fun);

      that.background = new Image();
      that.background.src = 'Reality-Television44.jpg'

      that.background.onload = function() {
        ctx.drawImage(that.background, 0, 0);
      }

      that.start();
    })
  };

  GameView.prototype.start = function (e) {

    var gameView = this;

    gameView.timerId = setInterval(
      function () {
        if (gameView.state === "paused") { return }
        gameView.game.step();
        gameView.game.draw(gameView.ctx, gameView.background);
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
      gameView.bindKeyHandlers();
      this.binded === true;
    }
  };

  GameView.prototype.renderVictory = function() {
    $("#message").html('<h3>Victory!</h3><h3>Press "P" to play again!</h3>')
  };

  GameView.prototype.renderOver = function() {
    $("#message").html('<h3>Game Over!</h3><h3>Press "P" to play again!</h3>')
  }

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;

    window.addEventListener("keydown", function (e) {
      e.preventDefault();
          if (e.keyCode === 39) {
          that.ship.turnRight();
        } else if (e.keyCode === 37) {
          that.ship.turnLeft();
        } else if (e.keyCode === 38) {
          that.ship.moveUp()
        } else if (e.keyCode === 40) {
          that.ship.moveDown()
        }
    });

    key("space", function () { that.ship.fireBullet() });
    key("p", function(e) {
      if (that.game.won() || that.game.over()) {
        $("#message").html("");
        that.game.asteroids = [];
        that.game.addAsteroids();
        that.game.lives = 3;
        that.ship.speed = 1;
        that.game.bullets = [];
        that.ship.position = [Asteroids.Game.DIM_X/2, Asteroids.Game.DIM_Y/2];
        that.state = "play"
      }
    })

    // uncomment for debuging purposes
    // key("d", function () { debugger } );
  };


  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
