
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
	this.touch_stat = 0; // 0 for untouched and 1 for touched.
	this.touch_point = {x: 0, y: 0};
	this.appui = document.getElementById("app");
	//this.stat = {};
	this.bind();
}

//Eventer::Get
Eventer.prototype.Get = function (what) {
	return {
		"touch-point": {x: this.touch_point.x, y:this.touch_point.y},
		"touch-stat": this.touch_stat
	}[what];
}

//Eventer::bind
Eventer.prototype.bind = function () {
	var Me = this;
	Me.appui.addEventListener("touchend", function (e) {
		e.preventDefault();
		Me.touch_stat = 0;
		//Log("touchend");
	}, false);
	Me.appui.addEventListener("touchmove", function (e) {
		e.preventDefault();
		Me.touch_stat = 1;
		Me.touch_point = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
		//Log("touchmove");
	}, false);
	Me.appui.addEventListener("touchstart", function (e) {
		e.preventDefault();
		Me.touch_stat = 1;
		Me.touch_point = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
		//Log("touchstart");
	}, false);
}

function Render () {
	this.appui = document.getElementById("app");
	this.appctx = this.appui.getContext("2d");
	this.Rect('green', 0, 0, 100, 100);
}

Render.prototype.Text = function (color, text) {
	this.appctx.fillStyle = color; 
	this.appctx.fillText(text, 10, 10);
}

Render.prototype.Clear =  function () {
	this.Rect("white", 0, 0, this.appui.width, this.appui.height);
}

Render.prototype.Rect = function (color, x0, y0, dx, dy) {
	this.appctx.fillStyle = color;
	this.appctx.fillRect(x0, y0, dx, dy);
}

Render.prototype.Looper = function (touch_point, nodes) {
	this.Clear();
	this.Text("blue", touch_point.x.toString()+', '+touch_point.y.toString());
	//this.Text("blue", touch_stat.toString());
	for (var i = 0; i < nodes.length; i++) {
		this.Rect("black", nodes[i].x - 25, nodes[i].y - 25, 50, 50);
	}
	//Log("123");
}

function App () {
	//Log("asd");
	this.stat = undefined;
	this.graph = new Graph();
	this.render = new Render();
	this.eventer = new Eventer();
	this.frame_rate = 25; //fps
	var Me = this;
	setInterval(function(){Me.looper()}, 1000 / Me.frame_rate);
}

App.prototype.looper = function () {
	//Log("ad");
	this.render.Looper(this.eventer.Get("touch-point"), this.graph.Get("nodes") );
}

new App();
