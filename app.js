var Hamster = Hamster || {};

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
	// 开启游戏主循环
	Hamster.setGameLoop();
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
	self.texture = new Image();
	self.texture.src = image;

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

	return self;
};

Hamster.freshList = {};

Hamster.freshList.pushList = function (gameObj) {
	Hamster.spriteList.push(gameObj);
}

/**游戏的主循环 */
Hamster.timeInterval = null;
Hamster.setGameLoop = function (callback) {
	var self = this;
	self.callback = callback;
	Hamster.timeInterval = setInterval(function () {
		if(self.callback){
			self.callback();
		}
	}, 1 / Hamster.timeloop);
}

Hamster.removeGameLoop = function () {
	if (Hamster.timeInterval) {
		clearInterval(Hamster.timeInterval);
	}
}

/**加入到场景中 */
Hamster.add = function (gameObj, x, y) {
	var self = this;
	console.log(gameObj);
	self.x = x || gameObj.x;
	self.y = y || gameObj.y;
	gameObj.x = self.x;
	gameObj.y = self.y;
	Hamster.freshList.pushList(gameObj);
	gameObj.draw();
	console.log(Hamster.spriteList);
};

Hamster.ani = {};
Hamster.ani.moveDirect = function (obj, targetX, targetY, moveTime) {
	if (!obj || !targetX || !targetY || !moveTime) {
		console.error("have error parm");
		return;
	}
	console.log(obj);

	var self = this;
	// var distance = Math.sqrt((obj.x - targetX)(obj.x - targetX) + (obj.y - targetY)(obj.y - targetY));
	// l = speed *time
	var _speedX = (targetX - obj.x) / moveTime;
	var _speedY = (targetY - obj.y) / moveTime;
	console.log(_speedX);
	console.log(_speedY);

	// obj.x = 500;
	var tick = function () {
		if (targetX - obj.x > 0) {
			obj.x = obj.x+_speedX;
			console.log(obj.x);
		}
		if (targetY - obj.y > 0) {
			obj.y = obj.y+_speedY;
			console.log(obj.y);
		}
		if(targetX - obj.x <= 0 && targetY-obj.y<=0){
			Hamster.removeGameLoop(tick);
		}	
	}
	Hamster.setGameLoop(tick);
}

; +(function () {
	Hamster.name = "仓鼠";
	Hamster.start = function () {
	};
})();