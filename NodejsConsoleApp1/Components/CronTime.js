"use strict"

class CronTime {
	constructor(minute, hour, dayOfMonth, month, dayOfWeek) {
		this.minute = minute;
		this.hour = hour;
		this.dayOfMonth = dayOfMonth;
		this.month = month;
		this.dayOfWeek = dayOfWeek;
	}
	//type dayOfWeek
	
	//dayOfWeekString
	
    static MON() {
        return "MON";
    }
    static TUE() {
        return "TUE";
    }
    static WED() {
        return "WED";
    }
    static THU() {
        return "THU";
    }
    static FRI() {
        return "FRI";
    }
    static SAR() {
        return "SAR";
    }
    static SUN() {
        return "SUN";
    }

	//static TUE = "TUE";
	//static WED = "WED";
	//static THU = "THU";
	//static FRI = "FRI";
	//static SAR = "SAR";
	//static SUN = "SUN";
	
	getRangeValuesDow(v) {
		var r;
		if (v.indexOf('-') > -1) {
			var res = this.dayOfWeek.split('-');
			if (res[1].indexOf('/') > -1) {
				var tmp = res[1].split('/');
				if (tmp[1] === '1') {
                    for ( let i = res[0]; i < (tmp[0] + 1); i++) {
						r.push(i);
					}
				}
				else {
					r.push(res[0] + tmp[1] - 1);
				}
			}
			else {
                for (let i = res[0]; i < res[1] + 1; i++) {
					r.push(i);
				}
			}
		}
		return r;
	}
	
	getStepValuesDow(v) {
		var r;
		if (v.indexOf('/') > -1) {
			var res = v.split('/');
			if (res[1] === '1') {
				if (res[0] === '*') {
                    for (let i = 1; i < 8; i++) {
						r.push(i);
					}
				}
				else {
                    for (let i = res[0]; i < 8; i++) {
						r.push(i);
					}
				}
				
			}
			else {
				r.push(res[0] + res[1] - 1);
			}
		}
	}
	
    getValueDayOfWeek() {
        if (this.dayOfWeek == "*") {
            r = [];
            r.push(new Date(Date.now()).getDay());
            return r;
        }
		if (this.dayOfWeek.indexOf(',') > -1) {
			var r = [];
			var res = this.dayOfWeek.split(',');
            for (let i = 0; i < res.length; i++) {
				if (res[i].indexOf('-') > -1) {
					var tmp = getRangeValuesDow(res[i]);
                    for (let j = 0; j < tmp.length; j++) {
						r.push(tmp[j]);
					}
				}
				else {
					if (res[i].indexOf('/')) {
						var tmp = getStepValuesDow(res[i]);
                        for (let j = 0; j < tmp.length; j++) {
							r.push(tmp[j]);
						}
					}
					else {
						r.push(res[i]);
					}
				}
			}
		}
		else {
			if (this.dayOfWeek.indexOf('-') > -1) {
				var res = this.getRangeValuesDow();
                for (let i = 0; i < res.length; i++) {
					r.push(res[i]);
				}
			}
		}
	return r;

	}
}

module.exports = CronTime;