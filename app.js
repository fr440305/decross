function Log (txt) {
	console.log(txt);
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

function App () {
	Log("asd");
	this.render = new Render();
}



new App();
