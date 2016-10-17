Hamster.init("main",1200,800);

var sa = new Hamster.sprite('sa',"./public/resource/1.jpg",0,0);
// Hamster.add(sa,0,0);
var hero = new Hamster.sprite('hero',"./public/resource/curry.jpg",0,0);
Hamster.add(hero);
Hamster.ani.moveDirect(hero,500,500,1000);
