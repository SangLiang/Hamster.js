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
	}
}

// 补牌
HandCard.prototype.addCard = function() {
	GAME_DATA.heroHandCardList.push(this.cardList.splice(1, 1));
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

EnemyCard.prototype.addCard = function() {
	var _temp = this.cardList.splice(1, 1)[0];
	_temp.x = 180 + (GAME_DATA.enemyHandCardList.length) * 85;
	GAME_DATA.enemyHandCardList.push(_temp);
	Hamster.add(_temp);
	console.log(GAME_DATA.enemyHandCardList);
}

/**
 * 玩家战斗角色类
 */
function HeroFighter(side) {
	this.side = side;
}

/**
 * 生成战斗角色
 * @obj 
 * @side {string} "hero":本方角色  "enemy":敌方角色
 */
HeroFighter.prototype.buildFighter = function(obj) {
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
	_temp.action = 0;
	_temp.side = this.side; //角色阵营
	return _temp;
}

// 展示战斗角色
HeroFighter.prototype.showHeroFighter = function() {
	var self = this;
	if (this.side == "enemy") {
		if (GAME_DATA.enemyFightFieldList.length > 0) {
			for (var j = 0; j < GAME_DATA.enemyFightFieldList.length; j++) {
				Hamster.remove(GAME_DATA.enemyFightFieldList[j]);
				if (GAME_DATA.enemyFightFieldList[j].fighterAttack !=undefined) {
					Hamster.remove(GAME_DATA.enemyFightFieldList[j].fighterAttack);
					Hamster.remove(GAME_DATA.enemyFightFieldList[j].fighterHp);
				}

			}
		}

		for (var i = 0; i < GAME_DATA.enemyFightFieldList.length; i++) {
			GAME_DATA.enemyFightFieldList[i].y = 180;
			GAME_DATA.enemyFightFieldList[i].setTexture(GAME_DATA.enemyFightFieldList[i].name + "_fight");
			GAME_DATA.enemyFightFieldList[i].x = 180 + i * 85;
			Hamster.add(GAME_DATA.enemyFightFieldList[i]);
			GAME_DATA.enemyFightFieldList[i].fighterAttack = new Hamster.UI.Text({
				"name": GAME_DATA.enemyFightFieldList[i].name + "_attack",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.enemyFightFieldList[i].attack,
				"x": GAME_DATA.enemyFightFieldList[i].x + 10,
				"y": GAME_DATA.enemyFightFieldList[i].y + 110
			});
			GAME_DATA.enemyFightFieldList[i].fighterHp = new Hamster.UI.Text({
				"name": GAME_DATA.enemyFightFieldList[i].name + "_hp",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.enemyFightFieldList[i].hp,
				"x": GAME_DATA.enemyFightFieldList[i].x + 66,
				"y": GAME_DATA.enemyFightFieldList[i].y + 110
			});

			Hamster.addEventListener(GAME_DATA.enemyFightFieldList[i], "click", function() {
				GAME_DATA.fight_enemyChoise = this;
				alert("我方" + GAME_DATA.fight_heroChoise.name + "攻击了敌人的" + GAME_DATA.fight_enemyChoise.name);

				var nenmyResult = null;
				var heroResult = null;

				nenmyResult = GAME_DATA.fight_enemyChoise.hp - GAME_DATA.fight_heroChoise.attack;
				heroResult = GAME_DATA.fight_heroChoise.hp - GAME_DATA.fight_enemyChoise.attack;

				if (nenmyResult <= 0) {
					alert("敌人死翘翘了");
					for (var j = 0; j < GAME_DATA.enemyFightFieldList.length; j++) {
						Hamster.remove(GAME_DATA.enemyFightFieldList[j].fighterAttack);
						Hamster.remove(GAME_DATA.enemyFightFieldList[j].fighterHp);
					}
					ai.enemyFighter.showHeroFighter();
					Hamster.remove(GAME_DATA.fight_enemyChoise);

					for (var i = 0; i < GAME_DATA.enemyFightFieldList.length; i++) {
						if (GAME_DATA.enemyFightFieldList[i].id == GAME_DATA.fight_enemyChoise.id) {
							GAME_DATA.enemyFightFieldList.splice(i, 1);
						}
					}

					Hamster.remove(GAME_DATA.fight_enemyChoise.fighterAttack);
					Hamster.remove(GAME_DATA.fight_enemyChoise.fighterHp);
				}

				if (heroResult <= 0) {
					alert("我的随从也嗝屁了");
					Hamster.remove(GAME_DATA.fight_heroChoise);
					for (var i = 0; i < GAME_DATA.heroFightFieldList.length; i++) {
						if (GAME_DATA.heroFightFieldList[i].id == GAME_DATA.fight_heroChoise.id) {
							GAME_DATA.heroFightFieldList.splice(i, 1);
						}
					}
					Hamster.remove(GAME_DATA.fight_heroChoise.fighterAttack);
					Hamster.remove(GAME_DATA.fight_heroChoise.fighterHp);
				}
				Hamster.cvs.style.cursor = "default";
			});

			Hamster.add(GAME_DATA.enemyFightFieldList[i].fighterAttack);
			Hamster.add(GAME_DATA.enemyFightFieldList[i].fighterHp);
		}

	} else if (this.side == "hero") {
		// 玩家的战场随从事件
		for (var i = 0; i < GAME_DATA.heroFightFieldList.length; i++) {

			GAME_DATA.heroFightFieldList[i].x = 180 + i * 85;
			Hamster.add(GAME_DATA.heroFightFieldList[i]);
			GAME_DATA.heroFightFieldList[i].fighterAttack = new Hamster.UI.Text({
				"name": GAME_DATA.heroFightFieldList[i].name + "_attack",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.heroFightFieldList[i].attack,
				"x": GAME_DATA.heroFightFieldList[i].x + 10,
				"y": GAME_DATA.heroFightFieldList[i].y + 110
			});
			GAME_DATA.heroFightFieldList[i].fighterHp = new Hamster.UI.Text({
				"name": GAME_DATA.heroFightFieldList[i].name + "_hp",
				"fontSize": 18,
				"color": "#fff",
				"text": GAME_DATA.heroFightFieldList[i].hp,
				"x": GAME_DATA.heroFightFieldList[i].x + 66,
				"y": GAME_DATA.heroFightFieldList[i].y + 110
			});

			Hamster.addEventListener(GAME_DATA.heroFightFieldList[i], "click", function() {
				if (this.action == 0) {
					alert("你目前不能操作该随从！");
					return;
				} else if (this.action != 0) {
					GAME_DATA.fight_heroChoise = this;
					console.log(GAME_DATA.fight_heroChoise);
				}

				Hamster.cvs.style.cursor = "url(./public/resource/attack_icon.png),auto";
			});

			Hamster.add(GAME_DATA.heroFightFieldList[i].fighterAttack);
			Hamster.add(GAME_DATA.heroFightFieldList[i].fighterHp);
		}
	}
}

// 改变战场角色,将睡眠角色转换为攻击状态
HeroFighter.prototype.changeAction = function() {
	for (var i = 0; i < GAME_DATA.heroFightFieldList.length; i++) {
		if (GAME_DATA.heroFightFieldList[i].action == 0) {
			GAME_DATA.heroFightFieldList[i].action = 1;
		}
	}
}


// 战斗结算
HeroFighter.prototype.getFightResult = function() {

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
	this.enemyFighter = new HeroFighter("enemy");
}

// 出牌
EnemyAIController.prototype.shotCard = function(enemy) {
	var self = this;
	enemy.addCard();
	setTimeout(function() {
		// 选择合适的卡
		for (var i = 0; i < GAME_DATA.enemyHandCardList.length; i++) {
			if (GAME_DATA.enemyHandCardList[i].fee <= enemyFee.currentFee) {
				GAME_DATA.enemyFightFieldList.push(GAME_DATA.enemyHandCardList[i]);
				self.enemyFighter.buildFighter(GAME_DATA.enemyHandCardList[i]);
				GAME_DATA.enemyHandCardList.splice(i, 1);
				enemy.refresh("enemy");
				actionSide = true;
				turn_over_button.setTexture("hero_turn_button");
				self.enemyFighter.showHeroFighter();
				
				// 改变角色状态
				hf.changeAction();

				// 增加回合数
				heroFee.addTurn();
				enemyFee.addTurn();
				return;
			}
		}
		actionSide = true;
		turn_over_button.setTexture("hero_turn_button");
		alert("电脑选择了不出牌，不知道他有什么阴谋诡计");
		hf.changeAction();
		heroFee.addTurn();
		enemyFee.addTurn();
	}, 500);

}

// 电脑Ai角色开始发动进攻
EnemyAIController.prototype.attack = function() {

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

	// 手牌和战场角色管理
	"heroHandCardList": [], //玩家手牌列表
	"heroFightFieldList": [], //玩家战斗角色列表
	"enemyHandCardList": [], // 敌人手牌列表
	"enemyFightFieldList": [], //敌人战斗角色列表

	//战斗结算参数
	"fight_heroChoise": null,
	"fight_enemyChoise": null
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

var hf = new HeroFighter("hero");

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
		ai.shotCard(enemy);
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
		GAME_DATA.heroFightFieldList.push(hf.buildFighter(GAME_DATA.choiseCard));
		hf.showHeroFighter();
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