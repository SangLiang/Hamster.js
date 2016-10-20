(function(){
	var test = function(){};

	test.prototype.showName = function(){
		console.log(1);
		return test;
	}

	var sa = new test();
	sa.showName();
})();