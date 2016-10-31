Hamster.init("main", 600, 600);

var list = [];

// 入口函数
(function init() {
	function Back() {
		console.log("我到达了目的地了哟");
	}

	var lala = new Hamster.UI.Button('lala', 'baolei', 100, 100);
	Hamster.add(lala, 0, 0);
	lala.setIndex(3);
	lala.setSize(200, 200);

	// Hamster.ani.moveDirect(lala, 400, 400, 200, function () {
	// 	Hamster.remove(lala);
	// });


	var lala2 = new Hamster.UI.Button("lala2", "baolei", 100, 150);
	lala2.setIndex(2);
	Hamster.add(lala2);

	var lala3 = new Hamster.UI.Button("lala3", "circle", 100, 300);
	lala3.setIndex(2);
	lala3.setSize(200, 200);
	Hamster.add(lala3);
	lala3.isTrigger = true;
	Hamster.addEventListener(lala3,"click",function(){
		Hamster.remove(this);
		console.log(this.x);
	});

	// makeSmallPic();
	
})();

function makeSmallPic() {
	for (var i = 0; i < 10; i++) {
		var _temp = new Hamster.sprite('sa', "circle", i * 50, 0);
		_temp.setSize(50, 50);
		Hamster.add(_temp, 0, 0);
		list.push(_temp);
	}
}
