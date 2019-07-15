var ITEM = require('./Components/Item');
var RULE = require('./Components/RuleItem');
var CONTAINER = require('./Components/RuleContainer');
var UTILS = require("./utils/RuleUtils");
var readline = require('readline');

var ruleConfig = UTILS.readJSonFile("./utils/rule.json");
console.log(ruleConfig);
CONTAINER.initAndStartScheduler(ruleConfig);

var stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();

stdin.setEncoding('utf8');

stdin.on('data', function (key) {
    var dv_1 = {
        ItemID: '0x000B57FFFE4F4F12-3', ItemStateValue: 1
    };
    var dv_2 = {
        ItemID: '0x000B57FFFE4F4F12-3', ItemStateValue: 0
    };
    var dv_3 = {
        ItemID: '0x000B57FFFE4F4F12-7', ItemStateValue: 0
    };
    var dv_4 = {
        ItemID: '0x000B57FFFE4F4F12-7', ItemStateValue: 1
    };
    var dv_5 = {
        ItemID: '12361', ItemStateValue: 1
    };
    var dv_6 = {
        ItemID: '12361', ItemStateValue: 0
    };

    if (key == '1') {
        CONTAINER.setDeviceState(dv_1);
    }
    else if (key == '2') {
        CONTAINER.setDeviceState(dv_2);
    }
    else if (key=='3') {
        CONTAINER.setDeviceState(dv_3);
    }
    else if (key == '4') {
        CONTAINER.setDeviceState(dv_4);
    }
    else if (key == '5') {
        CONTAINER.setDeviceState(dv_5);
    }
    else if (key == '6') {
        CONTAINER.setDeviceState(dv_6);
    }
});

//process.stdin.on('data', function () {
//    

//    if (dem > 0) {
//        console.log(11);
//        CONTAINER.setDeviceState(dv_3);

//    }
//    else {
//        CONTAINER.setDeviceState(dv_2);
//    }
//    dem++;
//});

//for (i = 0; i < 10; i++) {
//    item.push(new ITEM(i + 1, "device", "onOff", Math.floor(Math.random() * 2), Math.floor(Math.random() * 10) * 2000));
//}

//console.log(item);

//var rule = new RULE("R1", "Rule1", "TimeBasedTrigger", null, item, "AND");

//rule.execute();
