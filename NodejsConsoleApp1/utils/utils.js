var fs = require('fs');
var CronTime = require('../components/CronTime');

class Util {
    constructor() {
    }

	static readJSonFile(filePath){
		var rawData = fs.readFileSync(filePath);
		var value = JSON.parse(rawData);
		return value;
    }
	
	//check if time input is between start and end time
	static checkTime(t, start, end) {
		var minute = t.getMinutes();
		var hour = t.getHours();
		var dayOfMonth = t.getDate();
		var month = t.getMonth();
		var dayOfWeek = t.getDay();
		
		var crontime = new CronTime(minute, hour, dayOfMonth, month, dayOfWeek);
		var startObj = getCronObjFromExpression(start);
		var endObj = getCronObjFromExpression(end);
		
		
		if (startObj.getValueDayOfWeek().indexOf(crontime.dayOfWeek) > -1) {
			var dateCron = new Date();
			var dateStart = new Date();
			var dateEnd = new Date();
			dateCron.setMinutes(crontime.minute);
			dateCron.setHours(crontime.hour);
			dateStart.setMinutes(startObj.minute);
			dateStart.setHours(startObj.hour);
			dateEnd.setMinutes(endObj.minute);
			dateEnd.setHours(endObj.hour);
			
			if (dateCron.getTime() >= dateStart.getTime() && dateCron.getTime() < dateEnd.getTime()) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	
	static lengthOfObject (obj) {
		return Object.keys(obj).length;
	}
	
	static getCronObjFromExpression (c) {
		var res = c.split(" ");
		return new CronTime(res[0], res[1], res[2], res[3], res[4]);
	}
	
	static sleep (ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
		})
	}
	static isEmptyObject(obj) {
		for (var key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				return false;
			}
		}
		return true;
	}

}

module.exports = Util;