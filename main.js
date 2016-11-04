/**
 * description:Hamster测试游戏，简化版炉石传说
 * author:Sa
 * e-mail:378305868@qq.com
 * engine version:Hamster-v0.0.1
 * date:2016-11-3
 */
Hamster.init("main", 800, 600);

/**
 * 用户手牌class
 */
function HandCard() {
	this.cardList = this.buildHandCardList(15, 3);
	this.showHandCardFive(this.cardList);
}

// 生成所有的卡组，暂定15张
HandCard.prototype.buildHandCardList = function(num, randomRange) {
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
			_temp.status = "normal"; //卡牌的状态
			_temp.fee = CARD_INFO[_num]["fee"];
			_temp.attack = CARD_INFO[_num]["attack"];
			_temp.hp = CARD_INFO[_num]["hp"];
			_temp.name = CARD_INFO[_num]["name"];
			_list.push(_temp);
		}
		return _list;
	}
	// 展示手上的4张卡牌
HandCard.prototype.showHandCardFive = function(handCardList) {
	var _templist = handCardList.splice(1, 4);
	GAME_DATA.heroHandCardList = _templist;
	for (var i = 0; i < _templist.length; i++) {
		_templist[i].x = 180 + 80 * i;

		// 给生成出来的卡片添加点击事件
		Hamster.addEventListener(_templist[i], "click", function() {
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
				GAME_DATA.choiseCard = null;
				this.y = 460;
				this.index = 0;
			}
		});
		Hamster.add(_templist[i]);
	}
}

HandCard.prototype.refresh = function(side) {
	if (side == "hero") {
		var temp = GAME_DATA.heroHandCardList;
		var _distant = 80;
	} else if (side == "enemy") {
		var temp = GAME_DATA.enemyHandCardList;
		var _distant = 85;
	}

	for (var i = 0; i < temp.length; i++) {
		temp[i].x = 180 + _distant * i;
		// Hamster.add(temp[i]);
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

EnemyCard.prototype.buildHandCardList = function(num, randomRange) {
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
EnemyCard.prototype.showHandCardFive = function(handCardList) {
	var _templist = handCardList.splice(1, 4);
	GAME_DATA.enemyHandCardList = _templist;
	for (var i = 0; i < _templist.length; i++) {
		Hamster.add(_templist[i]);
	}
}

/**
 * 玩家战斗角色类
 */
function HeroFighter() {

}

/**
 * 生成战斗角色
 * @obj 
 * @side {string} "hero":本方角色  "enemy":敌方角色
 */
HeroFighter.prototype.buildFighter = function(obj, side) {
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
	_temp.action = false;
	_temp.side = side; //角色阵营
	return _temp;
}

// 展示战斗角色
HeroFighter.prototype.showHeroFighter = function(side) {
	if (side == "enemy") {
		for (var i = 0; i < GAME_DATA.enemyFightFieldList.length; i++) {
			GAME_DATA.enemyFightFieldList[i].y = 180;
			GAME_DATA.enemyFightFieldList[i].setTexture(GAME_DATA.enemyFightFieldList[i].name + "_fight");
			// console.log(GAME_DATA.enemyFightFieldList[i]);
			GAME_DATA.enemyFightFieldList[i].x = 180 + i * 85;
			Hamster.add(GAME_DATA.enemyFightFieldList[i]);
			var fighterAttack = new Hamster.UI.Text({
				"name": GAME_DATA.enemyFightFieldList[i].name + "_attack",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.enemyFightFieldList[i].attack,
				"x": GAME_DATA.enemyFightFieldList[i].x + 10,
				"y": GAME_DATA.enemyFightFieldList[i].y + 110
			});
			var fighterHp = new Hamster.UI.Text({
				"name": GAME_DATA.enemyFightFieldList[i].name + "_hp",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.enemyFightFieldList[i].attack,
				"x": GAME_DATA.enemyFightFieldList[i].x + 66,
				"y": GAME_DATA.enemyFightFieldList[i].y + 110
			});

			Hamster.addEventListener(GAME_DATA.enemyFightFieldList[i], "click", function() {
				if (this.action == false) {
					alert("你目前不能操作该随从！");
					return;
				}
				Hamster.cvs.style.cursor = "url(./public/resource/attack_icon.png),auto";
			});

			Hamster.add(fighterAttack);
			Hamster.add(fighterHp);
		}

	} else if (side == "hero") {
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

			Hamster.addEventListener(GAME_DATA.heroFightFieldList[i], "click", function() {
				if (this.action == false) {
					alert("你目前不能操作该随从！");
					return;
				}
				Hamster.cvs.style.cursor = "url(./public/resource/attack_icon.png),auto";
			});

			Hamster.add(fighterAttack);
			Hamster.add(fighterHp);
		}
	}


}

/**
 * 费用管理 
 */
function FeeManager(currentFee, round, x, y) {
	this.currentFee = currentFee;
	this.round = round;
	this.feeCount = null;
	this.currentFeeText = null;
	this.x = x;
	this.y = y;
	this.init();
}

FeeManager.prototype.init = function() {
	// 玩家计费器
	this.feeCount = new Hamster.UI.Button({
		"name": "FeeCount",
		"imageName": "fee",
		"x": this.x,
		"y": this.y
	});

	this.currentFeeText = new Hamster.UI.Text({
		"fontSize": 18,
		"x": this.feeCount.x + 45,
		"y": this.feeCount.y + 32,
		"text": this.currentFee + "/" + this.round,
		"color": "#fff"
	});
	Hamster.add(this.feeCount);
	Hamster.add(this.currentFeeText);
}

FeeManager.prototype.setCurrentFee = function(currentFee) {
	this.currentFee = currentFee;
	this.reFreshText();
}

FeeManager.prototype.setRound = function(round) {
	this.round = round;
	this.reFreshText();
}

FeeManager.prototype.reFreshText = function() {
	this.currentFeeText.setText(this.currentFee + "/" + this.round);
}

// 进入下一轮
FeeManager.prototype.addTurn = function() {
	this.round++;
	this.currentFee = this.round;
	this.reFreshText();
}

/**
 * [EnemyAIController 电脑Ai类]
 */
function EnemyAIController() {
	this.enemyFighter = new HeroFighter();
}

// 出牌
EnemyAIController.prototype.shotCard = function() {
	// 遍历所有的
	for (var i = 0; i < GAME_DATA.enemyHandCardList.length; i++) {
		if (GAME_DATA.enemyHandCardList[i].fee <= enemyFee.currentFee) {
			GAME_DATA.enemyFightFieldList.push(GAME_DATA.enemyHandCardList[i]);
			this.enemyFighter.buildFighter(GAME_DATA.enemyHandCardList[i], "enemy");
			this.enemyFighter.showHeroFighter("enemy");
			GAME_DATA.enemyHandCardList.splice(i, 1);
			enemy.refresh("enemy");
			actionSide = true;
			turn_over_button.setTexture("hero_turn_button");
			heroFee.addTurn();
			enemyFee.addTurn();
			console.log("heroFee:");
			console.log(heroFee);
			console.log("enemyFee:");
			console.log(enemyFee);
			return;
		} else {
			actionSide = true;
			turn_over_button.setTexture("hero_turn_button");
			alert("电脑选择了不出牌，不知道是不是他得阴谋诡计");
			heroFee.addTurn();
			enemyFee.addTurn();
			console.log("heroFee:");
			console.log(heroFee);
			console.log("enemyFee:");
			console.log(enemyFee);
			return;
		}
	}


}

// ---卡片的配置信息
var CARD_INFO = [{
	"name": "fishman_baby",
	"fee": 1,
	"attack": 1,
	"hp": 1
}, {
	"name": "freshwater_crocodile",
	"fee": 2,
	"attack": 2,
	"hp": 3
}, {
	"name": "ogre",
	"fee": 4,
	"attack": 4,
	"hp": 4
}];

// ---游戏中所有用到的公共数据
var GAME_DATA = {
	"choiseCard": null,
	"heroHandCardList": [], //玩家手牌列表
	"heroFightFieldList": [], //玩家战斗角色列表
	"enemyHandCardList": [], // 敌人手牌列表
	"enemyFightFieldList": [] //敌人战斗角色列表
};

/**
 *  行动对象
 * 	true:代表用户行动
 *  false:代表敌人行动
 **/
var actionSide = true;

var turn_count = 1; // 回合数
var hero_fee = 1; // 水晶数量
var enemy_fee = 1; // 敌人的水晶数量

var hf = new HeroFighter();

//  enemyFighter在ai中作管理
var ai = new EnemyAIController();

var hero = new HandCard();
var enemy = new EnemyCard();
var heroFee = new FeeManager(hero_fee, turn_count, 650, 350);
var enemyFee = new FeeManager(hero_fee, turn_count, 650, 200);

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
	"imageName": "hero_turn_button",
	"x": 670,
	"y": 260
});
Hamster.addEventListener(turn_over_button, "click", function() {
	if (actionSide) {
		this.setTexture("enemy_turn_button");
	} else {
		return;
	}
	actionSide = !actionSide;
	// 电脑在思考哦
	setTimeout(function() {
		ai.shotCard();
	}, 500);
});
Hamster.add(turn_over_button);


// 出牌按钮
var shot_card_button = new Hamster.UI.Button({
	"name": "shot_card_button",
	"imageName": "shot_card",
	"x": 20,
	"y": 260
});
Hamster.add(shot_card_button);

Hamster.addEventListener(shot_card_button, "click", function() {
	if (!GAME_DATA.choiseCard) {
		return;
	}

	if (heroFee.currentFee - GAME_DATA.choiseCard.fee < 0) {
		alert("费用不够");
		return;
	} else {
		heroFee.setCurrentFee(heroFee.currentFee - GAME_DATA.choiseCard.fee);
	}

	if (GAME_DATA.choiseCard.status == "click") {
		// 战斗场景添加角色
		GAME_DATA.heroFightFieldList.push(hf.buildFighter(GAME_DATA.choiseCard, "hero"));
		hf.showHeroFighter("hero");
		for (var i = 0; i < GAME_DATA.heroHandCardList.length; i++) {
			//从手牌数组中删除
			if (GAME_DATA.choiseCard.id == GAME_DATA.heroHandCardList[i].id) {
				GAME_DATA.heroHandCardList.splice(i, 1);
			}
		}

		Hamster.remove(GAME_DATA.choiseCard);
		hero.refresh("hero");
		GAME_DATA.choiseCard = null;
	}
});
Hamster.add(turn_over_button);

// setTimeout(function(){
// 	heroFee.setCurrentFee(10);
// },1000);