/** 
 * sprite animation
 *  sprite动画模块
*/

Hamster.ani = {};
Hamster.ani.moveDirect = function (obj, targetX, targetY, moveTime, callback) {
	if (!obj || !targetX || !targetY || !moveTime) {
		console.error("have error parm");
		return;
	}
	var self = this;
	var _t = moveTime * 10;
	var _time = null;
	var _speedX = (targetX - obj.x) / moveTime;
	var _speedY = (targetY - obj.y) / moveTime;

	var _x = 0;
	var _y = 0;
	var _tick = function () {
		if (targetX - obj.x > 0) {
			_x = obj.x + _speedX;
		}
		if (targetY - obj.y > 0) {
			_y = obj.y + _speedY;
		}
		if (targetX - obj.x <= 0 && targetY - obj.y <= 0) {
			if (_time) {
				clearInterval(_time);
			}
			
			if (callback && typeof callback == 'function') {
				callback();
			}else{
				console.error("callback is not a function");
			}
		}
		obj.setPosition(_x, _y);
		// Hamster.rendingStage();
	}
	// _tick();
	// _time = setInterval(function () {
	// 	_tick();
	// }, _t / Hamster.timeloop);
	_time = setInterval(function () {
		_tick();
	}, Hamster.timeloop);
}