

var ITEM = require('./Components/Item');
var RULE = require('./Components/Rule');


//async function getStateDelayed(delay, getState) {
//    await sleep(delay);
//    getState(delay);
//}

//function sleep(ms) {
//    return new Promise(resolve => {
//        setTimeout(resolve, ms)
//    })
//}

//function ahi(r) {
//    console.log("Event: " + r);

//}
//ham thuc thi cac output cua rule

var item = [];
var rule;

for (i = 0; i < 10; i++) {
    item.push(new ITEM(i + 1, "device", "onOff", Math.floor(Math.random() * 2), Math.floor(Math.random() * 10) * 2000));
}

console.log(item);

var rule = new RULE("R1", "Rule1", "TimeBasedTrigger", null, item, "AND");

rule.execute();
