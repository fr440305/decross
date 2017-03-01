
///author.name = 'FIRERAIN';
///author.email = 'fr440305@gmail.com';
///project.appjs.name = 'app.js';

function Log (txt) {console.log(txt);}

//Graph::$
//the structure of nodes and branches needs to be explained.
function Graph () {
	this.nodes = [{x: 100, y: 100}, {x:200, y:200}, {x:300, y:300}, {x:100, y:300}];
	this.branches = [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]]; // two-dimension array
}

Graph.prototype.Move = function (index, new_x, new_y) {
	//Log ("Move - " + index.toString());
	this.nodes[index].x = new_x;
	this.nodes[index].y = new_y;
}

Graph.prototype.LoadLevel = function (level_json) {
}

Graph.prototype.AddNode = function () {
}

Graph.prototype.Get = function (what) {
	return {
		"nodes": this.nodes, // need to change it to deep_copy.
		"branches": this.branches
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

///Render::$
function Render () {
	this.appui = document.getElementById("app");
	this.appcx = this.appui.getContext("2d");
	//this.rect('green', 0, 0, 100, 100);
}

Render.prototype.Line = function (color, x0, y0, x1, y1) {
	this.appcx.strokeStyle = color;
	this.appcx.beginPath();
	this.appcx.moveTo(x0, y0);
	this.appcx.lineTo(x1, y1);
	this.appcx.stroke();
}

Render.prototype.Text = function (color, text) {
	this.appcx.fillStyle = color; 
	this.appcx.fillText(text, 10, 10);
}

Render.prototype.Clear =  function () {
	this.rect("white", 0, 0, this.appui.width, this.appui.height);
}

Render.prototype.Circle = function (color, x0, y0, r) {
	this.appcx.fillStyle = color;
	this.appcx.beginPath();
	this.appcx.arc(x0, y0, r, 0, 6.28, false);
	this.appcx.fill();
}

Render.prototype.rect = function (color, x0, y0, dx, dy) {
	this.appcx.fillStyle = color;
	this.appcx.fillRect(x0, y0, dx, dy);
}

Render.prototype.Looper = function (touch_point, nodes, branches) {
	this.Clear();
	this.Text("blue", touch_point.x.toString()+', '+touch_point.y.toString());
	//this.Text("blue", touch_stat.toString());
	//draw the nodes.
	var x0, y0, x1, y1;
	for (var i = 0; i < nodes.length; i++) {
		this.Circle("black", nodes[i].x, nodes[i].y, 25);
	}
	for (var i = 0; i < branches.length; i++) {
		for (var j = 0; j < branches[i].length; j++) {
			x0 = nodes[i].x; y0 = nodes[i].y;
			x1 = nodes[j].x; y1 = nodes[j].y;
			//Log("connect:");
			this.Line("red", x0, y0, x1, y1);
		}
	}
	//Log("123");
}

function App () {
	//Log("asd");
	this.stat = undefined;
	this.graph = new Graph();
	this.render = new Render();
	this.eventer = new Eventer();
	this.frame_rate = 60; //fps
	var Me = this;
	setInterval(function(){Me.looper()}, 1000 / Me.frame_rate);
}

App.prototype.looper = function () {
	//Log("ad");
	var nodes = this.graph.Get("nodes");
	var branches = this.graph.Get("branches");
	var toustat = this.eventer.Get("touch-stat");
	var toupoint = this.eventer.Get("touch-point");
	var dx, dy;
	//check if player touches the nodes. if it is then move that node.
	for (var i = 0; i < nodes.length; i++) {
		dx = toupoint.x - nodes[i].x;
		dy = toupoint.y - nodes[i].y;
		if((Math.pow(dx, 2)+Math.pow(dy, 2) <= 25*25) && toustat === 1 ) {
			this.graph.Move(i, toupoint.x, toupoint.y);
		}
	}
	this.render.Looper(toupoint, nodes, branches);
}

new App();
