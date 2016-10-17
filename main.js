Hamster.init("main",1200,800);

var sa_pic = document.getElementById('background');
var sa = new Hamster.sprite('sa',sa_pic,0,0);
Hamster.add(sa,0,0);

var hero_pic = document.getElementById('hero');
var hero = new Hamster.sprite('hero',hero_pic,0,0);
Hamster.add(hero);

// hero.setX(200);
// hero.index = 100;