// 插入排序
function sort1(array) {
	var len = array.length,
		i, j, tmp, result;

	// 设置数组副本
	result = array.slice(0);
	for (i = 1; i < len; i++) {
		tmp = result[i];
		j = i - 1;
		while (j >= 0 && tmp < result[j]) {
			result[j + 1] = result[j];
			j--;
		}
		result[j + 1] = tmp;
	}
	return result;
}

// 二分法排序
function sort2(array) {
	var len = array.length,
		i, j, tmp, low, high, mid, result;
	// 赋予数组副本
	result = array.slice(0);
	for (i = 1; i < len; i++) {
		tmp = result[i];
		low = 0;
		high = i - 1;
		while (low <= high) {
			mid = parseInt((low + high) / 2, 10);
			if (tmp < result[mid]) high = mid - 1;
			else low = mid + 1;
		}
		for (j = i - 1; j >= high + 1; j--) {
			result[j + 1] = result[j];
		}
		result[j + 1] = tmp;
	}
	return result;
}

var list = [8,2,4,65,2,4,7,1,9,0,2,34,12];
var m = sort2(list);
console.log(m);