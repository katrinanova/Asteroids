(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  //ubbrat
  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();

    Asteroids.MovingObject.call(this, options)
  };

  Ship.RADIUS = 15;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
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

    this.game.add(bullet);
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

//   Ship.prototype.draw = function (ctx) {
//     var img = new Image();
// img.onload = function () {
//   ctx.drawImage(img, 10, 20);
// };
// img.src = 'ship.png';
// }

Ship.prototype.draw = function(context) {
  var image = new Image();
  image.src = 'ship.png';
  var width = image.width;
  var height = image.height;
  //
  // context.translate(this.pos[0], this.pos[1]);
  // context.rotate(10*Math.PI/180);
  var offset = this.radius + (this.radius / 2)
  context.drawImage(image, this.pos[0] - offset, this.pos[1] - offset);
  // context.rotate(-10*Math.PI/180);
  // context.translate(-this.pos[0], -this.pos[1]);



  // c.rotate(30*Math.PI/180);
  // var offset = this.radius + (this.radius / 2)
  // c.drawImage(image, this.pos[0], this.pos[1]);

};

Ship.prototype.turnRight = function(context) {
  var image = new Image();
  image.src = 'ship.png';
  var width = image.width;
  var height = image.height;

  context.translate(this.pos[0], this.pos[1]);
  context.rotate(10*Math.PI/180);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.rotate(-10*Math.PI/180);
  context.translate(-this.pos[0], -this.pos[1]);
}


})();
