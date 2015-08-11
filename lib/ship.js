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
    options.angle = options.angle || 0;
    options.speed = options.speed || 1;

    Asteroids.MovingObject.call(this, options)
  };

  Ship.RADIUS = 50;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {

    // var norm = Asteroids.Util.norm(this.vel);

    // if (norm == 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir([Math.cos(-this.angle*Math.PI/180), Math.sin(-this.angle*Math.PI/180)]),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    // var bulletVel = [Math.cos(this.angle*Math.PI/180), Math.sin(this.angle*Math.PI/180)]

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


//UBRAT
  // Ship.prototype.power = function (impulse) {
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  // };

//   Ship.prototype.draw = function (ctx) {
//     var img = new Image();
// img.onload = function () {
//   ctx.drawImage(img, 10, 20);
// };
// img.src = 'ship.png';
// }


Ship.prototype.draw = function(context) {
  // if (Asteroids.turnRight) {
  //   this.turnRight(context);
  //   Asteroids.turnRight = false;
  // } else if (Asteroids.turnLeft) {
  //   this.turnLeft(context);
  //   Asteroids.turnLeft = false;
  // } else {

    var image = new Image();
    image.src = 'ship.png';
    var width = 130;
    var height = 100;

    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(-this.angle*Math.PI/180);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    context.restore();

    // this.redrawParticles(context);


    // context.translate(this.pos[0], this.pos[1]);
    // context.rotate(-this.angle*Math.PI/180);
    // context.drawImage(image, -width / 2, -height / 2, width, height);
    // context.rotate(this.angle*Math.PI/180);
    // context.translate(-this.pos[0], -this.pos[1]);



    //
    // context.translate(this.pos[0], this.pos[1]);
    // context.rotate(10*Math.PI/180);


    // var offset = this.radius + (this.radius / 2)
    // context.drawImage(image, this.pos[0] - offset, this.pos[1] - offset, width, height);


    // context.rotate(-10*Math.PI/180);
    // context.translate(-this.pos[0], -this.pos[1]);



    // c.rotate(30*Math.PI/180);
    // var offset = this.radius + (this.radius / 2)
    // c.drawImage(image, this.pos[0], this.pos[1]);
  // }

};

// Ship.prototype.turnRight = function(context) {
//   var image = new Image();
//   image.src = 'ship.png';
//   var width = 130;
//   var height = 100;
//
//   context.translate(this.pos[0], this.pos[1]);
//   context.rotate(10*Math.PI/180);
//   context.drawImage(image, -width / 2, -height / 2, width, height);
//   context.rotate(-10*Math.PI/180);
//   context.translate(-this.pos[0], -this.pos[1]);
//   this.angle -= 10
// };
//
// Ship.prototype.turnLeft = function(context) {
//   var image = new Image();
//   image.src = 'ship.png';
//   var width = 100;
//   var height = 130;
//
//   context.translate(this.pos[0], this.pos[1]);
//   context.rotate(-10*Math.PI/180);
//   context.drawImage(image, -width / 2, -height / 2, width, height);
//   context.rotate(10*Math.PI/180);
//   context.translate(-this.pos[0], -this.pos[1]);
//   this.angle += 10
// };

Ship.prototype.moveUp = function(context) {
  console.log("move up")
  if (this.speed < 15) { this.speed += 0.4 }
  this.vel = [(Math.cos(-this.angle*Math.PI/180))*this.speed, (Math.sin(-this.angle*Math.PI/180))*this.speed]
  // this.move()
};

Ship.prototype.moveDown = function(context) {
  if (this.speed > 1) { this.speed -= 1 }
  this.vel = [this.vel[0]/1.3, this.vel[1]/1.3]
  // this.vel = [(-Math.cos(-this.angle*Math.PI/180))*this.speed, (-Math.sin(-this.angle*Math.PI/180))*this.speed]
  // this.move()
};

Ship.prototype.turnLeft = function(context) {
  this.angle += 20
}

Ship.prototype.turnRight = function(context) {
  this.angle -= 20
}


})();


// // Normalize the length of the vector to 1, maintaining direction.
// var dir = Util.dir = function (vec) {
//   var norm = Util.norm(vec);
//   return Util.scale(vec, 1 / norm);
// };
