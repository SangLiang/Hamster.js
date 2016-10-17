var Hamster = {};

Hamster.spriteList = [];
Hamster.ctx = null;
Hamster.timeloop = null;
/**
 * 主canvas,设置canvas的值
 * @id {id}
 * @width {number}
 * @height {number}
 * @background {css color}
 */
Hamster.init = function (id, width, height, timeloop, background) {
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');
	Hamster.ctx = ctx;
	Hamster.timeloop = timeloop || 60;
	canvas.width = width;
	canvas.height = height;
	canvas.style.background = background || "#333";
	canvas.style.margin = "0px auto";
	canvas.style.display = "block";
	canvas.style.boxShadow = "4px 4px 4px #888888";

	// Hamster.gameLoop();
};

/**
 * 游戏精灵
 * @name {string}
 * @image {string}
 * @x {number}
 * @y {number}
 */
Hamster.sprite = function (name, image, x, y) {
	var self = this;
	self.name = "name";
	self.x = x || 0;
	self.y = y || 0;
	self.child = [];
	self.width = null;
	self.height = null;
	self.texture = image;
	// self.texture.src = image;

	self.draw = function () {
		self.texture.onload = function () {
			Hamster.ctx.drawImage(self.texture, self.x, self.y, self.width || self.texture.height, self.texture.height || self.texture.weight);
		}
		self.texture.onerror = function () {
			console.log(self.name + "image load error");
		}
	}

	self.add = function (gameObj, _x, _y) {
		gameObj._parent = this.gameObj.name;
	}
};

Hamster.freshList = {};

Hamster.freshList.pushList = function(gameObj){
	Hamster.spriteList.push(gameObj);
}

/**游戏的主循环 */
Hamster.gameLoop = function () {
	var timeInterval = setInterval(function () {
		console.log(1);
	}, 1 / Hamster.timeloop);
}

// 添加到
Hamster.add = function (gameObj, x, y) {
	var self = this;
	console.log(gameObj);
	self.x = x || gameObj.x;
	self.y = y || gameObj.y;
	gameObj.x = self.x;
	gameObj.y = self.y;
	// console.log(Hamster.freshList.pushList);
	Hamster.freshList.pushList(gameObj);
	gameObj.draw();
};

; +(function () {
	Hamster.name = "仓鼠哥";
	Hamster.start = function () {
	};
})();