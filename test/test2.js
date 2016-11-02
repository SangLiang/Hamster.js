// console.log(Res);
Hamster.init("main", 800, 600);

var myText = new Hamster.UI.Text({
    "name": "myText",
    "fontSize": 18,
    "text": "lalallala",
    "x": 20,
    "y": 20,
    "color":"#fff"
});

Hamster.add(myText);

setTimeout(function(){
    myText.setText("我是天才");
},2000);