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
		"name": "freshwater_crocodile",
		"fee": 2,
		"attack": 2,
		"hp": 3
	},
	{
		"name": "ogre",
		"fee": 4,
		"attack": 4,
		"hp": 4
	}

];

var background = new Hamster.sprite({
	"name": "background",
	"imageName": "background",
	"x": 0,
	"y": 0
});
Hamster.add(background);

var myHero = new Hamster.sprite({
	"name": "myHero",
	"imageName": "fighter_hero",
	"x": 10,
	"y": 20
});
Hamster.add(myHero);

var enemyHero = new Hamster.sprite({
	"name": "enemyHero",
	"imageName": "fighter_hero",
	"x": 10,
	"y": 450
});
Hamster.add(enemyHero);

// 回合结束按钮
var turn_over_button = new Hamster.UI.Button({
	"name": "turn_over_button",
	"imageName": "enemy_turn_button",
	"x": 670,
	"y": 280
});
Hamster.addEventListener(turn_over_button, "click", function () {
	console.log("lalala");
});
Hamster.add(turn_over_button);

var handCard = new Hamster.UI.Button({
	"name": "handCard",
	"imageName": "fishman_baby",
	"x": 180,
	"y": 470
});
handCard.setSize(85, 120);

// 用户手牌class
function HandCard() {
	this.cardList = this.buildHandCardList(15, 3);
	this.showHandCardFive(this.cardList);
}

// 生成所有的卡组，暂定15张
HandCard.prototype.buildHandCardList = function (num, randomRange) {
	var _list = [];
	for (var i = 0; i < num; i++) {
		var _num = Math.floor(Math.random() * randomRange);
		var _temp = new Hamster.UI.Button({
			"name": "_temp",
			"imageName": CARD_INFO[_num]["name"],
			"x": 180 + 80 * i,
			"y": 460
		});
		_temp.setSize(85, 120);
		_temp.status = "normal";  //卡牌的状态
		_temp.fee = CARD_INFO[_num]["fee"];
		_temp.attack = CARD_INFO[_num]["attack"];
		_temp.hp = CARD_INFO[_num]["hp"];
		_temp.name = CARD_INFO[_num]["name"];
		console.log(_temp);
		_list.push(_temp);
	}
	return _list;
}
// 展示手上的五张卡牌
HandCard.prototype.showHandCardFive = function (handCardList) {
	var _templist = handCardList.splice(1, 5);
	for (var i = 0; i < _templist.length; i++) {
		_templist[i].x = 180 + 80 * i;
		Hamster.add(_templist[i]);

		// 给生成出来的卡片添加点击事件
		Hamster.addEventListener(_templist[i], "click", function () {
			if (this.status == "normal") {
				for (var i = 0; i < _templist.length; i++) {
					_templist[i].status = "normal";
					_templist[i].setSize(85, 120);
					_templist[i].y = 460;
					_templist[i].index = 0;
				}
				this.setSize(150, 180);
				this.y = 420;
				this.setIndex(1000);
				this.status = "click";
			} else {
				this.setSize(85, 120);
				this.status = "normal";
				this.y = 460;
				this.index = 0;
			}

		});

	}
}

var sa = new HandCard();
// console.log(sa.m);
