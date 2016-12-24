/**
 * UI库，button和text都继承自sprite
 */

Hamster.UI = {};

// 按钮
function _Button(obj) {
	this.text = obj.text || null;
	_Sprite.call(this, obj);
	this.index = 0;
	this.layer = "UI";    			//ui层永远位于顶层
	this.isTrigger = true; 			//默认可以点击
};

Hamster.extend(_Button, _Sprite);

//设置按钮上的文字 
_Button.prototype.setText = function (text) {
	this.text = text;
}

_Button.prototype.draw = function (text) {
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

	if (text != null) {
		console.log(text);
	}
}

Hamster.UI.Button = function (name, imageName, x, y, w, h) {
	return new _Button(name, imageName, x, y, w, h);
}

// 文本类
function _Text(obj) {
	_Sprite.call(this, obj);
	this.fontSize = obj.fontSize || 14;
	this.text = obj.text || "文本";
	this.layer = "UI";
	this.color = obj.color;
	this.fontFamily = obj.fontFamily || "Microsoft Yahei,serif";
	this.index = 0;
	this.isTrigger = false;
}

_Text.prototype.draw = function () {
	Hamster.ctx.fillStyle = this.color;
	Hamster.ctx.font = this.fontSize + "px " + this.fontFamily;
	Hamster.ctx.fillText(this.text, this.x, this.y);
}

_Text.prototype.setText = function (text) {
	this.text = text;
}

_Text.prototype.setFontSize = function (fontSize) {
	this.fontSize = fontSize;
}

_Text.prototype.setFontFamily = function (fontFamily) {
	this.fontFamily = fontFamily;
}

Hamster.UI.Text = function (obj) {
	return new _Text(obj);
}
