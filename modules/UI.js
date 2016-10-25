/** 
 * UI模块
 */
Hamster.UI = {};

function Button(name, imageName, x, y, w, h){
	Sprite.call(this,name, imageName, x, y, w, h);
	this.index = Number.MAX_VALUE;
};

Hamster.extend(Button,Sprite);

Hamster.UI.Button = function(name, imageName, x, y, w, h){
	return new Button(name, imageName, x, y, w, h);
}
// 按钮
// Hamster.UI.Button = obj.create(this.sprite);
