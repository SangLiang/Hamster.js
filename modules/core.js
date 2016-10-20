
/**
 * main canvas,canvas data setting
 * @id {id}
 * @width {number}
 * @height {number}
 * @background {css color}
 */
Hamster.init = function(id, width, height, timeloop, background) {
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');
	Hamster.ctx = ctx;
	Hamster.timeloop = timeloop || 60;
	canvas.width = width;
	canvas.height = height;

	Hamster.gameWidth = width;
	Hamster.gameHeight = height;

	canvas.style.background = background || "#333";
	canvas.style.margin = "0px auto";
	canvas.style.display = "block";
	canvas.style.boxShadow = "4px 4px 4px #888888";

	// 开启游戏主循环
	Hamster.setGameLoop();
};

/**
 * rend all sprite in the list of Hamster.spriteList
 */
Hamster.rendingStage = function(){
	var self = this;
	console.warn(Hamster.spriteList);
	if(Hamster.spriteList.length==0){return;}

	for(var i = 0;i<Hamster.spriteList.length;i++){
		Hamster.spriteList[i].draw();
	}
}

/**rend single sprite that texture has been loaded */
Hamster.rending = function(obj){
	Hamster.ctx.drawImage(obj.texture, obj.x, obj.y, obj.width || obj.texture.height, obj.texture.height || obj.texture.weight);	
}

/**
 * Game sprite
 * @name {string}
 * @image {string}
 * @x {number}
 * @y {number}
 */
Hamster.sprite = function(name, image, x, y) {
	var self = this;
	self.name = "name";
	self.x = x || 0;
	self.y = y || 0;
	self.child = [];
	self.width = null;
	self.height = null;
	self.texture = new Image();
	self.texture.src = image;

	//first draw while textures load complete
	self.draw = function() {
		Hamster.rending(self);

		self.texture.onload = function() {
			Hamster.rending(self);
		}
		self.texture.onerror = function() {
			console.log(self.name + "image load error");
		}
	}

	self.add = function(gameObj, _x, _y) {
		gameObj._parent = this.gameObj.name;
	}

	self.setPosition = function(m, n) {
		self.x = m;
		self.y = n;
		Hamster.ctx.clearRect(0, 0, Hamster.gameWidth, Hamster.gameHeight);
		Hamster.rending(self);
		return self.x;
	}

	return self;
};

Hamster.freshList = {};

Hamster.freshList.pushList = function(gameObj) {
	Hamster.spriteList.push(gameObj);
}

/**main loop */
Hamster.timeInterval = null;
Hamster.setGameLoop = function(callback) {
	var self = this;
	self.callback = callback;
	Hamster.timeInterval = setInterval(function() {
		if (self.callback) {
			self.callback();
		}
	}, 10 / Hamster.timeloop);

}

/**clear loop */
Hamster.removeGameLoop = function() {
	if (Hamster.timeInterval) {
		clearInterval(Hamster.timeInterval);
	}
}

/**add to stage */
Hamster.add = function(gameObj, x, y) {
	var self = this;
	self.x = x || gameObj.x;
	self.y = y || gameObj.y;
	gameObj.x = self.x;
	gameObj.y = self.y;
	Hamster.freshList.pushList(gameObj);
	gameObj.draw();
};

/*sprite animation*/
Hamster.ani = {};
Hamster.ani.moveDirect = function(obj, targetX, targetY, moveTime) {
	if (!obj || !targetX || !targetY || !moveTime) {
		console.error("have error parm");
		return;
	}
	var self = this;
	var _t = moveTime*10;
	var _time = null;
	var _speedX = (targetX - obj.x) / moveTime;
	var _speedY = (targetY - obj.y) / moveTime;

	var _x = 0;
	var _y = 0;
	var _tick = function() {
		if (targetX - obj.x > 0) {
			_x = obj.x + _speedX;
		}
		if (targetY - obj.y > 0) {
			_y = obj.y + _speedY;
		}
		if (targetX - obj.x <= 0 && targetY - obj.y <= 0) {
			if (_time) {
				clearInterval(_time);
			}
		}
		obj.setPosition(_x, _y);
		Hamster.rendingStage();
	}
	_time = setInterval(function() {
		_tick();
	}, _t / Hamster.timeloop);

}

; + (function() {
	Hamster.name = "仓鼠";
	Hamster.start = function() {};
})();