//author.name = 'FIRERAIN';
//author.email = 'fr440305@gmail.com';
//project.appjs.name = 'app.js';

function Log (txt) {console.log(txt);}

function Graph () {
	this.nodes = [];
	this.branches = [];
}

Graph.prototype.AddNode = function () {
}

function Eventer () {
}

function Render () {
	this.appui = document.getElementById("app");
	this.appctx = this.appui.getContext("2d");
	this.Rect('green', 0, 0, 100, 100);
}

Render.prototype.Rect = function (color, x0, y0, dx, dy) {
	this.appctx.fillStyle = color;
	this.appctx.fillRect(x0, y0, dx, dy);
}

Render.prototype.Looper = function () {
}

function App () {
	Log("asd");
	this.stat = undefined;
	this.render = new Render();
	this.evneter = new Eventer();
	this.frame_rate = 1; //fps
	var Me = this;
	setInterval(function(){Me.looper()}, 1000 / Me.frame_rate);
}


App.prototype.looper = function () {
}



new App();
