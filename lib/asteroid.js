(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);
    options.sizze = options.sizze || 2

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 100;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function(context) {
    var image = new Image();
    image.src = 'kim.png';
    var width = this.sizze === 2 ? 260 : 160;
    var height = this.sizze === 2 ? 180 : 115;
    //
    // context.translate(this.pos[0], this.pos[1]);
    // context.rotate(10*Math.PI/180);
    var offset = this.radius + (this.radius / 2)
    context.drawImage(image, this.pos[0] - offset, this.pos[1] - offset, width, height)
  }
})();
