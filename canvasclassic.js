var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = 400;

var c = canvas.getContext('2d');

var dt = 1;
var n = 16;

var maxM = 1000;
var maxV = 1;
var G = 1;
var K = 10**7

border = 100;

function Planet(m, x, y, theta, V, index) {
	this.m = m;
	this.x = x;
	this.y = y;
	this.p_x = V*Math.cos(theta)*this.m;
	this.p_y = V*Math.sin(theta)*this.m;
	this.radius = Math.cbrt(m)*2;
	this.index = index;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		c.fillStyle = '#f5f5f5';
		c.fill();
	}

	this.newton = function() {

		var delta_x = 0;
		var delta_y = 0;
		var r = 0;
		var gravity = 0;

		for (var i = 0; i < planetArray.length; i++) {
			if (i != this.index) {
				delta_x = planetArray[i].x - this.x;
				delta_y = planetArray[i].y - this.y;
				r = Math.sqrt(delta_x**2 + delta_y**2);

				gravity = G * this.m * planetArray[i].m / r**3;

				coulomb = K * this.m * -planetArray[i].m / r**8;

				console.log(gravity);

				this.p_x += (gravity + coulomb) * delta_x * dt;
				this.p_y += (gravity + coulomb) * delta_y * dt;
			}

		}

	}

	this.update = function() {

		this.newton();

	 	this.x += this.p_x * dt / this.m;
	 	this.y += this.p_y * dt / this.m;

	 	this.draw();
	}

}

var planetArray = [];

for (var i = 0; i < n; i++) {
	planetArray.push(new Planet(
		(Math.exp(-Math.random()*32)) * maxM,
		(Math.random() * (canvas.width - (border * 2))) + border,
		(Math.random() * (canvas.height - (border * 2))) + border,
		Math.random() * Math.PI*2,
		Math.random() * maxV,
		i,
		));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0 , innerWidth, innerHeight);

	for (var i = 0; i < planetArray.length; i++) {
		planetArray[i].update();
	}
}

animate();