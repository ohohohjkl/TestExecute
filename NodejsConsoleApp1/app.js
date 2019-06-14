

var ITEM = require('./Components/Item');
var RULE = require('./Components/RuleItem');
var CONTAINER = require('./Components/RuleContainer');
var UTILS = require('./utils/utils');



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
var rule_list = [];
var ruleConfig = UTILS.readJSonFile("./utils/rule_def_temp.json");

ruleContainer = new CONTAINER();


lengthOfRule = UTILS.lengthOfObject(ruleConfig);
if (!UTILS.isEmptyObject(ruleConfig) && lengthOfRule !== 0) {
    for (u = 0; u < lengthOfRule; u++) {
        var key = Object.keys(ruleConfig)[u];
        var start,end,counter;
        var inputRuleList = [];
        var outputRuleList = [];

        if (!UTILS.isEmptyObject(ruleConfig[key].input) && ruleConfig[key].input.length !== 0) {
            var flag ;
            var delay;
            var trigger;
            for (i = 0; i < ruleConfig[key].input.length; i++) {
                flag = false;
                for (j = 0; j < ruleConfig[key].seq_in.length;j++) {
                    if (ruleConfig[key].seq_in[j].id === ruleConfig[key].input[i].id) {
                        flag = true;
                        break;
                    }
                } 
                if (flag === true) {
                    delay = ruleConfig[key].seq_in[j].delay;
                }
                else
                    delay = 0;
                var inputRule = new ITEM (ruleConfig[key].input[i].id, ruleConfig[key].input[i].type
                    , ruleConfig[key].input[i].state.prop, ruleConfig[key].input[i].state.value, delay
                    );
                inputRuleList.push(inputRule);
            }
        }

        if (!UTILS.isEmptyObject(ruleConfig[key].output) && ruleConfig[key].output.length !== 0) {
            var flag;
            var delay;
            for (i = 0; i < ruleConfig[key].output.length; i++) {
                flag = false;
                for (j = 0; j < ruleConfig[key].seq_out.length; j++) {
                    if (ruleConfig[key].seq_out[j].id === ruleConfig[key].output[i].id) {
                        flag = true;
                        break;
                    }
                }
                if (flag === true) {
                    delay = ruleConfig[key].seq_out[j].delay;
                }
                else
                    delay = 0;
                var outRule = new ITEM(ruleConfig[key].output[i].type, ruleConfig[key].output[i].id
                    , ruleConfig[key].output[i].state.prop, ruleConfig[key].output[i].state.value, delay
                );
                outputRuleList.push(outRule);
                //console.log(222, outputRuleList);
            }
        }
        if (!UTILS.isEmptyObject(ruleConfig[key].trigger)) {
            start = ruleConfig[key].trigger.configuration.start;
            end = ruleConfig[key].trigger.configuration.end;
            counter = ruleConfig[key].trigger.configuration.counter;
            trigger = {
                start: start, end: end, counter: counter
            };
            //console.log(333, start + ": " + end + ": " + counter.toString());
        }

        var ruleItem = new RULE(ruleConfig[key].id, ruleConfig[key].name, trigger
            , inputRuleList, outputRuleList,"AND");

        rule_list.push(ruleItem);
        //trigger to activate rule
    }
}

console.log(111, rule_list);

ruleContainer.RuleList = rule_list;
ruleContainer.startRuleList();



//for (i = 0; i < 10; i++) {
//    item.push(new ITEM(i + 1, "device", "onOff", Math.floor(Math.random() * 2), Math.floor(Math.random() * 10) * 2000));
//}

//console.log(item);

//var rule = new RULE("R1", "Rule1", "TimeBasedTrigger", null, item, "AND");

//rule.execute();
