var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth-18;
canvas.height = 400;

var c = canvas.getContext('2d');

var dt = 1;
var n = 12;

var Primes = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397,
  401,
  409,
  419,
  421,
  431,
  433,
  439,
  443,
  449,
  457,
  461,
  463,
  467,
  479,
  487,
  491,
  499,
  503,
  509,
  521,
  523,]

var maxM = 1000;
var maxV = 1;
var G = 1;
var K = 10000000;

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

		for (var i = 0; i < planetArray.length; i++) {
			if (i != this.index) {
				delta_x = planetArray[i].x - this.x;
				delta_y = planetArray[i].y - this.y;
				r = Math.sqrt(delta_x**2 + delta_y**2);

				gravity = G * this.m * planetArray[i].m / r**3;

				coulomb = K * this.m * -planetArray[i].m / r**8;

				// console.log(gravity);

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

// for (var i = 0; i < n; i++) {
// 	planetArray.push(new Planet(
// 		(Math.exp(-Math.random())) * maxM,
// 		(Math.random() * (innerWidth - (border * 2))) + border,
// 		(Math.random() * (innerHeight - (border * 2))) + border,
// 		Math.random() * Math.PI*2,
// 		Math.random() * maxV,
// 		i,
// 		));
// }

planetArray.push(new Planet(
	69,
	canvas.width/2,
	canvas.height/2,
	Math.PI/2,
	0,
	0,
	));

// var maxOrbit = canvas.width - 2 * border;
var maxOrbit = canvas.width;
var minOrbit = 50;

for (var i = 0; i < n; i++) {
	var orbit = (maxOrbit-minOrbit)*Math.random()+minOrbit;
	var phi = 2*Math.random()*Math.PI;
	for (var j = 0; j < Primes[i]; j++) {
		phi += 2*Math.PI/Primes[i]
		planetArray.push(new Planet(
			// 1/Math.log((Primes[i])*Primes[i]),
			// 1/Math.log((Primes[i])),
			Math.random(),
			canvas.width/2 + orbit*Math.cos(phi),
			canvas.height/2 + orbit*Math.sin(phi),
			phi - Math.PI/2,
			Math.sqrt(G*planetArray[0].m/orbit),
			planetArray.length,
			))
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0 , innerWidth, innerHeight);

	for (var i = 0; i < planetArray.length; i++) {
		planetArray[i].update();
	}
}

animate();