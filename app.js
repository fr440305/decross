
///author.name = 'FIRERAIN';
///author.email = 'fr440305@gmail.com';
///project.appjs.name = 'app.js';

function Log (txt) {console.log(txt);}

//Graph::$
function Graph () {
	this.nodes = [{x: 100, y: 100}];
	this.branches = [];
}

Graph.prototype.LoadLevel = function (level_json) {
}

Graph.prototype.AddNode = function () {
}

Graph.prototype.Get = function (what) {
	return {
		"nodes": this.nodes // need to change it to deep_copy.
	}[what];
}

//Eventer::$
function Eventer () {
	this.touch_point = {x: undefined, y: undefined};
	this.appui = document.getElementById("app");
	//this.stat = {};
	this.bind();
}

//Eventer::Get
Eventer.prototype.Get = function (what) {
	return { "touch-point": {x: this.touch_point.x, y:this.touch_point.y} }[what];
}

//Eventer::bind
Eventer.prototype.bind = function () {
	this.appui.addEventListener("touchend", function (e) {
		e.preventDefault();
	}, false);
	this.appui.addEventListener("touchmove", function (e) {
		e.preventDefault();
	}, false);
	this.appui.addEventListener("touchstart", function (e) {
		e.preventDefault();
	}, false);
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

Render.prototype.Looper = function (nodes) {
	for (var i = 0; i < nodes.length; i++) {
		this.Rect("black", nodes[i].x - 25, nodes[i].y - 25, 50, 50);
	}
}

function App () {
	Log("asd");
	this.stat = undefined;
	this.graph = new Graph();
	this.render = new Render();
	this.evneter = new Eventer();
	this.frame_rate = 1; //fps
	var Me = this;
	setInterval(function(){Me.looper()}, 1000 / Me.frame_rate);
}

App.prototype.looper = function () {
	this.render.Looper( this.graph.Get("nodes") );
}

new App();
