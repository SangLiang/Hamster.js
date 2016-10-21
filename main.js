Hamster.init("main",1200,800);

var sa = new Hamster.sprite('sa',"circle",0,0);
Hamster.add(sa,0,0);

var hero = new Hamster.sprite('hero',"hero",100,0);
Hamster.add(hero,100,100);

Hamster.ani.moveDirect(hero,500,500,100);

// console.dir(hero.texture);



