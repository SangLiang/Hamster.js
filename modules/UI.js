/** 
 * UI模块
 */
Hamster.UI = {};

function _Button(name, imageName, x, y, w, h){
	_Sprite.call(this,name, imageName, x, y, w, h);
	this.index = Number.MAX_VALUE;
};

Hamster.extend(_Button,_Sprite);

Hamster.UI.Button = function(name, imageName, x, y, w, h){
	return new _Button(name, imageName, x, y, w, h);
}
// 按钮
// Hamster.UI.Button = obj.create(this.sprite);
