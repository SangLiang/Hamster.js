window.Hamster = window.Hamster || {};

Hamster.spriteList = [];    //需要被渲染的sprite数组
Hamster.uiList = [];        //需要被渲染的ui数组

Hamster.ctx = null;         //main canvas context
Hamster.timeloop = null;    //main gameloop
Hamster.gameWidth = null;   //the game stage width
Hamster.gameHeight = null;  //the game stage height

Hamster.spriteId = 0; // 相当于界面中所有sprite的计数器