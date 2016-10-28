window.Hamster = window.Hamster || {};

Hamster.spriteList = [];    //the list of sprites which need to be rended
Hamster.uiList = [];        //ui list

Hamster.ctx = null;         //main canvas context
Hamster.timeloop = null;    //main gameloop
Hamster.gameWidth = null;   //the game stage width
Hamster.gameHeight = null;  //the game stage height

Hamster.spriteId = 0; // 相当于界面中所有sprite的计数器