/**
 * Res is a resource manager ,you can define images,fonts ,sound's name and path
 * When game init , the resource which define in Res will load first
 */

var Res = {
    "images": [
        //---UI
        { "src": "./public/resource/background.png", "name": "background" },//背景图片
        { "src": "./public/resource/hp_background.png", "name": "hp_background" },
        { "src": "./public/resource/fighter_hero.png", "name": "fighter_hero" },//战士头像
        { "src": "./public/resource/enemy_turn_button.png", "name": "enemy_turn_button" },//对手回合按钮
        { "src": "./public/resource/hero_turn_button.png", "name": "hero_turn_button" },//玩家回合
        { "src": "./public/resource/shot_card.png", "name": "shot_card" },//出牌按钮
        { "src": "./public/resource/card_back.png", "name": "card_back" },//卡背
        { "src": "./public/resource/fee.png", "name": "fee" },//水晶计数器
        
        //---卡片和战斗角色
        { "src": "./public/resource/fishman_baby.png", "name": "fishman_baby" },//鱼人宝宝卡片
        { "src": "./public/resource/fishman_baby_fight.png", "name": "fishman_baby_fight" },//鱼人宝宝战斗
        { "src": "./public/resource/freshwater_crocodile.png", "name": "freshwater_crocodile" },//淡水鳄卡片
        { "src": "./public/resource/freshwater_crocodile_fight.png", "name": "freshwater_crocodile_fight" },//淡水鳄战斗
        { "src": "./public/resource/ogre.png", "name": "ogre" }, //蓝胖子
        { "src": "./public/resource/ogre_fight.png", "name": "ogre_fight" }, //蓝胖子战斗
        { "src": "./public/resource/dead_wing.png", "name": "dead_wing" },
        { "src": "./public/resource/dead_wing_fight.png", "name": "dead_wing_fight" },

        // 测试加载进度界面图片
        // { "src": "./public/resource/1.jpg", "name": "1" },
        // { "src": "./public/resource/2.jpg", "name": "2" },
        // { "src": "./public/resource/3.jpg", "name": "3" },
        // { "src": "./public/resource/4.jpg", "name": "4" },
        // { "src": "./public/resource/5.jpg", "name": "5" },
    ],
    "fonts": [],
    "sound": []
};