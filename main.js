Hamster.init("main", 800, 600);

// 卡片的配置信息
var CARD_INFO = [
	{
		"name": "fishman_baby",
		"fee": 1,
		"attack": 1,
		"hp": 1
	},
	{
		"name": "fishman_baby",
		"fee": 1,
		"attack": 1,
		"hp": 1
	},

];

var background = new Hamster.sprite("background", "background", 0, 0);
Hamster.add(background);

var myHero = new Hamster.sprite("myHero", "fighter_hero", 10, 450);
Hamster.add(myHero);

var enemyHero = new Hamster.sprite("enemyHero", "fighter_hero", 10, 20);
Hamster.add(enemyHero);

// 回合结束按钮
var turn_over_button = new Hamster.UI.Button("turn_over_button", "enemy_turn_button", null, 670, 280);
Hamster.addEventListener(turn_over_button, "click", function () {
	console.log("lalala");
});
Hamster.add(turn_over_button);

var handCard = new Hamster.UI.Button("handCard", "fishman_baby", null, 180, 470);
handCard.setSize(85, 120);
// Hamster.add(handCard);

for (var i = 0; i < 7; i++) {
	var _temp = new Hamster.UI.Button("_temp", "fishman_baby", null, 180 + 80 * i, 470);
	_temp.setSize(85, 120);
	_temp.status = "normal";
	Hamster.addEventListener(_temp, "click", function () {
		if(this.status == "normal"){
			this.setSize(100,135);
			this.setIndex(1000);
			this.status = "click";
			
		}else{
			this.setSize(85,120);
			this.status = "normal";
		}
		
	});
	Hamster.add(_temp);
}
