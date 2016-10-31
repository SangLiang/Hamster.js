
Hamster.UI = {};

function _Button(name, imageName, x, y, w, h){
	_Sprite.call(this,name, imageName, x, y, w, h);
	this.index = 0;
	this.layer = "UI";    //ui层永远位于顶层
	this.isTrigger = true; //默认可以点击
	
};

Hamster.extend(_Button,_Sprite);

Hamster.UI.Button = function(name, imageName, x, y, w, h){
	return new _Button(name, imageName, x, y, w, h);
}
// 按钮