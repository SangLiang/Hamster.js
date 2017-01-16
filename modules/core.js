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

	Hamster.width = self.width;
	Hamster.height = self.height;
	Hamster.timeloop = (1 / 60);
	Hamster.gameWidth = width;
	Hamster.gameHeight = height;
	Hamster.backgroundColor = background || "#333";

	// 载入时的背景颜色
	Hamster.cvs.style.background = "#000";
	Hamster.cvs.width = width;
	Hamster.cvs.height = height;
	Hamster.cvs.style.display = "block";
	Hamster.cvs.style.position = "relative";
	Hamster.cvs.style.margin = "0 auto";

	Hamster.Preload.init();
};

/**
 *  Preload资源载入完成后调用start方法
 */
Hamster.start = function () {
	var self = this;
	var _cvs = Hamster.cvs;
	_cvs.width = Hamster.gameWidth;
	_cvs.height = Hamster.gameHeight;
	_cvs.style.background = Hamster.backgroundColor;
	_cvs.style.margin = "0px auto";
	_cvs.style.display = "block";
	_cvs.style.boxShadow = "4px 4px 4px #888888";
	_cvs.style.position = "relative";
	Hamster.update();

	// 注册事件系统
	var sys = new EventListenerSystem(Hamster.cvs);
	Hamster.sys = sys;
}

Hamster.update = function () {
	// 开启游戏主循环
	Hamster.setGameLoop(Hamster.rendingStage);
}

function _Extend(child, parent) {
	var F = function () { };
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;

	child.superclass = parent.prototype;

	if (parent.prototype.constructor == Object.prototype.constructor) {
		parent.prototype.constructor = parent;
	}
}

Hamster.extend = function (child, parent) {
	return _Extend(child, parent);
}

/** 
 * spritelist和uilist 通过index来做排序渲染,数值越大的，说明渲染越靠前
 * @param {array}  objArray
 * @return {array}  
 * */
function sortListByIndex(objectArray) {
	var objArray = objectArray;
	// var objArray = [].concat(objectArray);
	// 跳出递归的条件
	if (objArray.length <= 0) {
		return objArray;
	}

	var pivotIndex = Math.floor(objArray.length / 2);
	var pivotObj = objArray.splice(objArray[pivotIndex], 1)[0];
	var pivot = pivotObj["index"];
	var left = [];
	var right = [];

	for (var i = 0; i < objArray.length; i++) {
		if (objArray[i]["index"] < pivot) {
			left.push(objArray[i]);
		} else {
			right.push(objArray[i]);
		}
	}

	return sortListByIndex(left).concat([pivotObj], sortListByIndex(right))
}

/**
 * rend all sprite in the list of Hamster.spriteList
 * 刷新在Hamster中的所有元素
 */
Hamster.rendingStage = function () {
	var self = this;
	//对两个需要渲染的数组按index进行排序
	Hamster.spriteList = sortListByIndex(Hamster.spriteList);
	Hamster.uiList = sortListByIndex(Hamster.uiList);

	Hamster.ctx.clearRect(0, 0, Hamster.gameWidth, Hamster.gameHeight);

	if (Hamster.spriteList.length == 0 && Hamster.uiList.length == 0) {
		return;
	}
	// spriteList渲染
	for (var i = 0; i < Hamster.spriteList.length; i++) {
		if (Hamster.spriteList[i].awake) {
			Hamster.spriteList[i].draw();
		}
	}
	// uiList渲染
	for (var i = 0; i < Hamster.uiList.length; i++) {
		if (Hamster.uiList[i].awake) {
			Hamster.uiList[i].draw();
		}
	}
}

/**rend single sprite that texture has been loaded */
Hamster.rending = function (image, x, y, w, h) {
	Hamster.ctx.drawImage(image, x, y, w, h);
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
 * class Sprite
 * @name {string}
 * @image {string}
 * @x {number} x轴
 * @y {number} y轴
 * @w {number} 宽度
 * @h {number} 高度
 * _Sprite(name, imageName, x, y, w, h) 
 */
function _Sprite(obj) {
	var self = this;
	self.layer = "Sprite";
	self.name = obj.name || "no name";
	self.x = obj.x || 0;
	self.y = obj.y || 0;
	self.width = obj.w || null;
	self.height = obj.h || null;
	self.child = []; //子元素
	self.width = null;
	self.height = null;
	self.imageName = obj.imageName || null;
	self.index = 0;
	self.texture = null;
	self.isTrigger = false; //默认不可以点击
	self.awake = true; //是否在舞台上展示
	self.id = 0;
}

_Sprite.prototype.draw = function () {
	if (!this.texture) {
		this.texture = Hamster.getImageTexture(this.imageName);
	}
	if (this.width == null) {
		this.width = this.texture.width;
	}

	if (this.height == null) {
		this.height = this.texture.height;
	}

	Hamster.rending(this.texture, this.x, this.y, this.width || this.texture.width, this.height || this.texture.height);
}

_Sprite.prototype.setTexture = function (textureName) {
	this.imageName = textureName;
	this.texture = Hamster.getImageTexture(this.imageName);
}

_Sprite.prototype.add = function (gameObj, x, y) {
	gameObj._parent = this.gameObj.name;
}

_Sprite.prototype.setPosition = function (m, n) {
	this.x = m;
	this.y = n;
}

_Sprite.prototype.scale = function (m, n) {
	if (m < 0 || n < 0) {
		console.error('放大的倍数不能小于0');
	}
	this.width = this.width * m;
	this.height = this.height * n;
}

_Sprite.prototype.setSize = function (w, h) {
	this.width = w;
	this.height = h;
}

_Sprite.prototype.setWidth = function (w) {
	this.width = w;
}

_Sprite.prototype.setHeight = function (h) {
	self.height = h;
}

_Sprite.prototype.setIndex = function (i) {
	this.index = i;
}
// 点击事件
_Sprite.prototype.onClick = function (callback) {
	if (!callback) {
		return;
	}
	callback();
}
// 生成类的方法
Hamster.Sprite = function (name, imageName, x, y, w, h) {
	return new _Sprite(name, imageName, x, y, w, h);
};

Hamster.freshList = {};

Hamster.freshList.pushList = function (gameObj) {
	if (gameObj.layer == "Sprite") {
		Hamster.spriteList.push(gameObj);
	} else if (gameObj.layer == "UI") {
		Hamster.uiList.push(gameObj);
	}
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
	}, Hamster.timeloop);
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
	gameObj.id = Hamster.spriteId;
	self.x = x || gameObj.x;
	self.y = y || gameObj.y;
	gameObj.x = self.x;
	gameObj.y = self.y;
	Hamster.freshList.pushList(gameObj);
	Hamster.spriteId++;
};

// 清除某个元素
Hamster.remove = function (obj) {
	var self = this;
	for (var i = 0; i < Hamster.uiList.length; i++) {

		if (obj.id == Hamster.uiList[i].id) {
			Hamster.uiList.splice(i, 1);
			return;
		}
	}

	for (var i = 0; i < Hamster.spriteList.length; i++) {

		if (obj.id == Hamster.spriteList[i].id) {
			Hamster.spriteList.splice(i, 1);
			return;
		}
	}
}

// 清楚某个tag
Hamster.removeTag = function (tagName) {
	for (var i = 0; i < Hamster.uiList.length; i++) {
		if (Hamster.uiList[i].tag == tagName) {
			Hamster.uiList.splice(i, 1);
		}
	}

	for (var j = 0; j < Hamster.spriteList.length; j++) {
		if (Hamster.spriteList[i].tag == tagName) {
			Hamster.spriteList.splice(i, 1);
		}
	}
}

// 清除所有元素
Hamster.removeAll = function () {
	// 清除所有的渲染数组
	Hamster.uiList = [];
	Hamster.spriteList = [];
}

/**
 * 事件系统
 */
function EventListenerSystem(canvas) {
	var self = this;
	var spriteList = Hamster.spriteList;
	canvas.addEventListener("click", function (e) {
		var position = self.getClickEventPosition(e);
		// 事件分发
		for (var i = Hamster.uiList.length - 1; i >= 0; i--) {
			if (Hamster.uiList[i]["isTrigger"] == true && position.x <= (Hamster.uiList[i].x + Hamster.uiList[i].width) && position.x >= Hamster.uiList[i].x && position.y >= Hamster.uiList[i].y && (position.y <= Hamster.uiList[i].y + Hamster.uiList[i].height)) {
				Hamster.uiList[i].onClick();
				return;
			}
		}
		// sprite的分发
		for (var i = Hamster.spriteList.length - 1; i >= 0; i--) {
			if (Hamster.spriteList[i]["isTrigger"] == true && position.x <= (Hamster.spriteList[i].x + Hamster.spriteList[i].width) && position.x >= Hamster.spriteList[i].x && position.y >= Hamster.spriteList[i].y && (position.y <= Hamster.spriteList[i].y + Hamster.spriteList[i].height)) {
				Hamster.spriteList[i].onClick();
				return;
			}
		}

		console.log(position.x, position.y);
	});
}

EventListenerSystem.prototype.getClickEventPosition = function (ev) {
	var x, y;
	if (ev.layerX || ev.layerX == 0) {
		x = ev.layerX;
		y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}
	return {
		x: x,
		y: y
	};
}

EventListenerSystem.prototype.keyEvent = function (callback, eventName) {
	if (!window) {
		console.log("window is undefined");
		return;
	}
	if (eventName == "keyDown") {
		window.addEventListener("keydown", function (e) {
			callback(e);
		}, true);
	} else if (eventName == "keyUp") {
		window.addEventListener("keyup", function (e) {
			callback(e);
		}, true);
	} else if (eventName == "keyPress") {
		window.addEventListener("keypress", function (e) {
			callback(e);
		}, true);
	}

}

Hamster.addEventListener = function (obj, eventName, callback) {

	if (eventName == "click") {
		obj.onClick = callback;
	}
	if (eventName == "keyDown" || eventName == "keyUp" || eventName == "keyPress") {
		var sys = new EventListenerSystem(Hamster.cvs);
		sys.keyEvent(callback, eventName);
	}
}