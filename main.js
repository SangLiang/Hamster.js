Hamster.init("main",600,600);

var list = [];

// 入口函数
(function init(){
	makeSmallPic();
	// var ui = new Hamster.UI.Button();
	// console.log(ui);
})();

function makeSmallPic(){
	for (var i = 0; i<10;i++){
		var _temp = new Hamster.sprite('sa',"circle",i*30,0);
		_temp.setSize(30,30);
		Hamster.add(_temp,0,0);
		list.push(_temp);
	}
}

// Hamster.add(hero,100,100);
// Hamster.ani.moveDirect(hero,500,500,100);
