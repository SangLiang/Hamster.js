var Hamster = {};

// 主canvas
Hamster.init = function(id,width,height){
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');
	Hamster.ctx = ctx;
	canvas.width = width;
	canvas.height = height;
	canvas.style.background = "#333";
	canvas.style.margin = "0px auto";
	canvas.style.display = "block";
	canvas.style.boxShadow = "4px 4px 4px #888888";
	// Hamster.add();
};

// 游戏角色
Hamster.sprite = function(x,y,image){
	var self = this;
	this.name = "name";
	this.x = x||0;
	this.y = y||0;
	this.child = [];
	this.texture = new Image();
	this.texture.src = image;
	this.texture.onload = function(){

	}
	this.texture.onerror = function(){
		console.log(this.name + "image load error");
	}
	
	this.add = function(){
		
	}
	console.warn(Hamster.ctx);
		// Hamster.ctx.drawImage(self.texture,self.x,self.y);
	
};

// 填加元素
Hamster.add = function(gameObj){
	console.log(gameObj);
	gameObj.texture.onload = function(){
		Hamster.ctx.drawImage(gameObj.texture,gameObj.x,gameObj.y);
	}
	
};

;+(function(){
	Hamster.name = "仓鼠哥";
	Hamster.start = function(){
	};
})();