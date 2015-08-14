(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
  };

  var Game = Asteroids.Game = function (ctx) {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.lives = 3;
    // this.background = background;

    // this.background = new Image();
    // this.background.src = 'Reality-Television11.jpg'
    //
    // var that = this;
    //
    // this.background.onload = function() {
    //   ctx.drawImage(that.background, 0, 0);
    // }
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.draw = function (ctx, background) {
    // var img = new Image();
    // img.onload = function () {
    //   ctx.drawImage(img, Game.DIM_X, Game.DIM_Y);
    // };
    // img.src = 'Reality-Television11.jpg';



    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y)

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.renderLives(ctx);
  };

  Game.prototype.renderLives = function(ctx) {
  var text = this.lives > 0 ? "♥  ".repeat(this.lives) : ""
  ctx.font = "60px Arial";
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.fillText(text, 10, 40);
};

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.ships.push(ship);

    return ship;
  };

  Game.prototype.addBullets = function (object) {
      this.bullets.push(object);
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.remove = function (object) {
    var that = this;
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {

      this.asteroids.splice(this.asteroids.indexOf(object), 1);

      if (object.sizze === 2) {
        newAsteroid = new Asteroids.Asteroid({ game:this, pos:object.pos, sizze:1})
        that.asteroids.push(newAsteroid);
        newAsteroid = new Asteroids.Asteroid({ game:this, pos:object.pos, sizze:1})
        that.asteroids.push(newAsteroid);
        newAsteroid = new Asteroids.Asteroid({ game:this, pos:object.pos, sizze:1})
        that.asteroids.push(newAsteroid);
      }

    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    }
  };


  Game.prototype.wrap = function (pos) {
    return [wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.over = function () {
    return this.lives < 0;
  };

  Game.prototype.won = function () {
    return this.asteroids.length === 0;
  };

})();
