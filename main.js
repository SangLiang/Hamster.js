Hamster.init("main",600,600);

var list = [];

// 入口函数
(function init(){
	var lala = new Hamster.UI.Button('lala','baolei',100,100);
	Hamster.add(lala,0,0);
	lala.setIndex(3);
	lala.setSize(200,200);

	var lala2 = new Hamster.UI.Button("lala2","baolei",100,150);
	lala2.setIndex(2);
	Hamster.add(lala2);
	
	var lala3 = new Hamster.UI.Button("lala3","circle",100,200);
	lala3.setIndex(2);
	Hamster.add(lala3);
	makeSmallPic();

	Hamster.ani.moveDirect(lala,400,400,200);
	console.log(lala.x);
})();

function makeSmallPic(){
	for (var i = 0; i<10;i++){
		var _temp = new Hamster.sprite('sa',"circle",i*50,0);
		_temp.setSize(50,50);
		Hamster.add(_temp,0,0);
		list.push(_temp);
	}
}


