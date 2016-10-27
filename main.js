Hamster.init("main",600,600);

var list = [];

// 入口函数
(function init(){
	var lala = new Hamster.UI.Button('lala','baolei',100,100);
	Hamster.add(lala,0,0);
	lala.setSize(200,200);
	makeSmallPic();

	// var sa = new Hamster.sprite('sa',"circle",140,0);

	// Hamster.add(sa);
	// var ui = new Hamster.UI.Button();
	// console.log(ui);
})();

function makeSmallPic(){
	for (var i = 0; i<10;i++){
		var _temp = new Hamster.sprite('sa',"circle",i*50,0);
		_temp.setSize(50,50);
		Hamster.add(_temp,0,0);
		list.push(_temp);
		// console.log(_temp);
	}
}
