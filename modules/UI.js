
Hamster.UI = {};

function _Button(name, imageName, text, x, y, w, h) {
	this.text = text || null;
	_Sprite.call(this, name, imageName, x, y, w, h);
	this.index = 0;
	this.layer = "UI";    			//ui层永远位于顶层
	this.isTrigger = true; 			//默认可以点击
	// this.draw = function(){
	// 	console.log(1);
	// }
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
// 按钮


