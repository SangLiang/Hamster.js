
/**
 * main canvas,canvas data setting
 * @id {id}
 * @width {number}
 * @height {number}
 * @background {css color}
 */
Hamster.init = function (id, width, height, timeloop, background) {
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');
	var self = this;
	self.width = width;
	self.height = height;
	Hamster.ctx = ctx;
	Hamster.cvs = canvas;
	Hamster.timeloop = timeloop*1000 || 60000;
	Hamster.gameWidth = width;
	Hamster.gameHeight = height;
	Hamster.backgroundColor = background || "#333";
};

Hamster.start = function () {
	var self = this;
	var _cvs = Hamster.cvs;
	_cvs.width = Hamster.gameWidth;
	_cvs.height = Hamster.gameHeight;
	_cvs.style.background = Hamster.backgroundColor;
	_cvs.style.margin = "0px auto";
	_cvs.style.display = "block";
	_cvs.style.boxShadow = "4px 4px 4px #888888";
	Hamster.update();
}

Hamster.update = function () {
	// 开启游戏主循环
	Hamster.setGameLoop(Hamster.rendingStage);
}

/**
 * rend all sprite in the list of Hamster.spriteList
 * 刷新在Hamster中的所有元素
 */
Hamster.rendingStage = function () {
	var self = this;

	Hamster.ctx.clearRect(0, 0, Hamster.gameWidth, Hamster.gameHeight);

	if (Hamster.spriteList.length == 0) { return; }

	for (var i = 0; i < Hamster.spriteList.length; i++) {
		Hamster.spriteList[i].draw();
	}
}

/**rend single sprite that texture has been loaded */
Hamster.rending = function (image, x, y, w, h) {
	Hamster.ctx.drawImage(image, x, y);
}

Hamster.getImageTexture = function (imageName) {
	var texture = null;
	for (var i = 0; i < Hamster.Preload.imageList.length; i++) {
		if (imageName == Hamster.Preload.imageList[i].name) {
			texture = Hamster.Preload.imageList[i].texture;
		}
	}
	if (!texture) {
		console.error("图片参数错误");
		return;
	} else {
		return texture;
	}
}

/**
 * Game sprite
 * @name {string}
 * @image {string}
 * @x {number}
 * @y {number}
 */
Hamster.sprite = function (name, imageName, x, y) {
	var self = this;
	self.name = "name";
	self.x = x || 0;
	self.y = y || 0;
	self.child = [];
	self.width = null;
	self.height = null;
	self.imageName = null;
	
	//first draw while textures load complete
	self.draw = function () {
		if(!self.texture){
			self.texture = Hamster.getImageTexture(imageName);
		}
		Hamster.rending(self.texture, self.x, self.y);
	}

	self.add = function (gameObj, _x, _y) {
		gameObj._parent = this.gameObj.name;
	}

	self.setPosition = function (m, n) {
		self.x = m;
		self.y = n;
	}
	return self;
};

Hamster.freshList = {};

Hamster.freshList.pushList = function (gameObj) {
	Hamster.spriteList.push(gameObj);
}

/**main loop */
Hamster.timeInterval = null;
Hamster.setGameLoop = function (callback) {
	var self = this;
	self.callback = callback;
	Hamster.timeInterval = setInterval(function () {
		if (self.callback) {
			self.callback();
		}
	}, 1000 / Hamster.timeloop);
}

/**clear loop */
Hamster.removeGameLoop = function () {
	if (Hamster.timeInterval) {
		clearInterval(Hamster.timeInterval);
	}
}

/**add to stage */
Hamster.add = function (gameObj, x, y) {
	var self = this;
	self.x = x || gameObj.x;
	self.y = y || gameObj.y;
	gameObj.x = self.x;
	gameObj.y = self.y;
	Hamster.freshList.pushList(gameObj);
};
