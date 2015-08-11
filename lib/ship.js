(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.angle = options.angle || 0;
    options.speed = options.speed || 1;

    Asteroids.MovingObject.call(this, options)
  };

  Ship.RADIUS = 50;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir([Math.cos(-this.angle*Math.PI/180), Math.sin(-this.angle*Math.PI/180)]),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.addBullets(bullet);
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.draw = function(context) {

      var image = new Image();
      image.src = 'ship.png';
      var width = 130;
      var height = 100;

      context.save();
      context.translate(this.pos[0], this.pos[1]);
      context.rotate(-this.angle*Math.PI/180);
      context.drawImage(image, -width / 2, -height / 2, width, height);
      context.restore();
  };

  Ship.prototype.moveUp = function() {
    console.log("move up")
    if (this.speed < 15) { this.speed += 0.4 }
    this.vel = [(Math.cos(-this.angle*Math.PI/180))*this.speed, (Math.sin(-this.angle*Math.PI/180))*this.speed]
  };

  Ship.prototype.moveDown = function() {
    if (this.speed > 1) { this.speed -= 1 }
    this.vel = [this.vel[0]/1.3, this.vel[1]/1.3]
  };

  Ship.prototype.turnLeft = function(context) {
    this.angle += 20
  }

  Ship.prototype.turnRight = function(context) {
    this.angle -= 20
  }

})();
