Hamster.init("main", 800, 600);

// ---卡片的配置信息
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

// ---游戏中所有用到的公共数据
var GAME_DATA = {
	"choiseCard": null,
	"heroHandCardList": [],//玩家手牌列表
	"heroFightFieldList": [],//玩家战斗角色列表
	"enemyHandCardList": [], // 敌人手牌列表
	"enemyFightFieldList": []//敌人战斗角色列表
};

/**
 *  行动对象
 * 	true:代表用户行动
 *  false:代表敌人行动
 **/
var actionSide = true;

//---游戏主逻辑
// 背景
var background = new Hamster.sprite({
	"name": "background",
	"imageName": "background",
	"x": 0,
	"y": 0
});
Hamster.add(background);

// 我的英雄头像
var myHero = new Hamster.sprite({
	"name": "myHero",
	"imageName": "fighter_hero",
	"x": 10,
	"y": 20
});
Hamster.add(myHero);

var myHeroHpBackground = new Hamster.UI.Button({
	"name": "myHeroHpBackground",
	"imageName": "hp_background",
	"x": 10,
	"y": 400
});
Hamster.add(myHeroHpBackground);

var myHeroHp = new Hamster.UI.Text({
	"name": "myHeroHp",
	"text": "30",
	"fontSize": "25",
	"color": "#fff",
	"x": 55,
	"y": 435
});
Hamster.add(myHeroHp);

var enemyHeroHpBackground = new Hamster.UI.Button({
	"name": "enemyHeroHpBackground",
	"imageName": "hp_background",
	"x": 10,
	"y": 180
});
Hamster.add(enemyHeroHpBackground);

var enemyHeroHp = new Hamster.UI.Text({
	"name": "enemyHeroHp",
	"text": "30",
	"fontSize": "25",
	"color": "#fff",
	"x": 55,
	"y": 215
});
Hamster.add(enemyHeroHp);

// 敌人英雄头像
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
	"y": 260
});
Hamster.addEventListener(turn_over_button, "click", function () {
	console.log("lalala");
});
Hamster.add(turn_over_button);

// 玩家计费器
var heroFeeCount = new Hamster.UI.Button({
	"name": "heroFeeCount",
	"imageName": "fee",
	"x": 650,
	"y": 350
});
Hamster.add(heroFeeCount);

// 敌人计费器
var enemyFeeCount = new Hamster.UI.Button({
	"name": "enemyFeeCount",
	"imageName": "fee",
	"x": 650,
	"y": 200
});
Hamster.add(enemyFeeCount);

var hf = new HeroFighter();

// 出牌按钮
var shot_card_button = new Hamster.UI.Button({
	"name": "shot_card_button",
	"imageName": "shot_card",
	"x": 20,
	"y": 260
});
Hamster.add(shot_card_button);

Hamster.addEventListener(shot_card_button, "click", function () {
	if (!GAME_DATA.choiseCard) {
		return;
	}
	if (GAME_DATA.choiseCard.status == "click") {
		GAME_DATA.heroFightFieldList.push(hf.buildFighter(GAME_DATA.choiseCard));
		hf.showHeroFighter();
		Hamster.remove(GAME_DATA.choiseCard);
		GAME_DATA.choiseCard = null;
	}
});
Hamster.add(turn_over_button);

/**
 * 用户手牌class
 */
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
		_list.push(_temp);
	}
	return _list;
}
// 展示手上的4张卡牌
HandCard.prototype.showHandCardFive = function (handCardList) {
	var _templist = handCardList.splice(1, 4);
	GAME_DATA.heroHandCardList = _templist;
	for (var i = 0; i < _templist.length; i++) {
		_templist[i].x = 180 + 80 * i;

		// 给生成出来的卡片添加点击事件
		Hamster.addEventListener(_templist[i], "click", function () {
			if (this.status == "normal") {
				for (var i = 0; i < _templist.length; i++) {
					_templist[i].status = "normal";
					_templist[i].setSize(85, 120);
					_templist[i].y = 460;
					_templist[i].index = 0;
				}
				GAME_DATA.choiseCard = null;
				GAME_DATA.choiseCard = this;
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
			console.log(GAME_DATA);
		});
		Hamster.add(_templist[i]);

	}
}

/**
 * ---敌人手牌类
 */
function EnemyCard() {
	this.cardList = this.buildHandCardList(15, 3);
	this.showHandCardFive(this.cardList);
}
Hamster.extend(EnemyCard, HandCard);

EnemyCard.prototype.buildHandCardList = function (num, randomRange) {
	var _list = [];
	for (var i = 0; i < num; i++) {
		var _num = Math.floor(Math.random() * randomRange);
		var _temp = new Hamster.UI.Button({
			"name": CARD_INFO[_num]["name"],
			"imageName": "card_back",
			"x": 110 + (85 * i),
			"y": 20
		});
		_temp.setSize(85, 120);
		_temp.fee = CARD_INFO[_num]["fee"];
		_temp.attack = CARD_INFO[_num]["attack"];
		_temp.hp = CARD_INFO[_num]["hp"];
		_temp.name = CARD_INFO[_num]["name"];
		_list.push(_temp);
	}
	return _list;
}

// 重写show方法
EnemyCard.prototype.showHandCardFive = function (handCardList) {
	var _templist = handCardList.splice(1, 4);
	for (var i = 0; i < _templist.length; i++) {

		Hamster.add(_templist[i]);
	}
}

/**
 * 玩家战斗角色类
 */
function HeroFighter() {

}
HeroFighter.prototype.buildFighter = function (obj) {
	if (!obj) {
		return;
	}
	var _temp = new Hamster.UI.Button({
		"name": obj.name + "_fighter",
		"imageName": obj.imageName + "_fight",
		"x": 0,
		"y": 300
	});
	_temp.fee = obj.fee;
	_temp.attack = obj.attack;
	_temp.hp = obj.hp;

	return _temp;
}

HeroFighter.prototype.showHeroFighter = function () {
	for (var i = 0; i < GAME_DATA.heroFightFieldList.length; i++) {
		GAME_DATA.heroFightFieldList[i].x = 180 + i * 85;
		Hamster.add(GAME_DATA.heroFightFieldList[i]);
		var fighterAttack = new Hamster.UI.Text({
			"name": GAME_DATA.heroFightFieldList[i].name + "_attack",
			"fontSize": 18,
			"color": "#fff",
			"text": GAME_DATA.heroFightFieldList[i].attack,
			"x": GAME_DATA.heroFightFieldList[i].x + 10,
			"y": GAME_DATA.heroFightFieldList[i].y + 110
		});
		var fighterHp = new Hamster.UI.Text({
			"name": GAME_DATA.heroFightFieldList[i].name + "_hp",
			"fontSize": 18,
			"color": "#fff",
			"text": GAME_DATA.heroFightFieldList[i].attack,
			"x": GAME_DATA.heroFightFieldList[i].x + 66,
			"y": GAME_DATA.heroFightFieldList[i].y + 110
		});

		Hamster.addEventListener(GAME_DATA.heroFightFieldList[i], "click", function () {
			Hamster.cvs.style.cursor = "url(./public/resource/attack_icon.png),auto";
			console.log(this);
		});

		Hamster.add(fighterAttack);
		Hamster.add(fighterHp);
	}
}

var myhero = new HandCard();
var enemy = new EnemyCard();