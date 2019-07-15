var fs = require('fs');
var CronTime = require('../components/CronTime');
var ITEM = require('../Components/Item');


class RuleUtils {
    constructor() {
    }

    static readJSonFile(filePath) {
        var rawData = fs.readFileSync(filePath);
        var value = JSON.parse(rawData);
        return value;
    }

    //static getRuleFromJsonObj(ruleConfig) {
    //    let listRules = [];
    //    var lengthOfRule = RuleUtils.lengthOfObject(ruleConfig);


    //    ruleConfig.map(rule => {
    //        let startCron, endCron, counter;
    //        let inputRuleList = [];
    //        let outputRuleList = [];
    //        let trigger;
    //        let defOpt = "eq";
    //        let defLoop = 1;

    //        if (rule.input && rule.input.length > 0) {
    //            let input = rule.input;
    //            input.map(inputItem => {
    //                let inputRule;
    //                let inputOpt;
    //                let inputLoop;

    //                if (inputItem.state.operator)
    //                    inputOpt = inputItem.state.operator;
    //                else
    //                    inputOpt = defOpt;

    //                if (inputItem.loop)
    //                    inputLoop = inputItem.loop;
    //                else
    //                    inputLoop = defLoop;

    //                inputRule = new ITEM(inputItem.id, inputItem.type, inputItem.name, inputItem.state.prop,
    //                    inputItem.state.value, inputOpt, inputItem.delay, inputLoop);

    //                inputRuleList.push(inputRule);
    //            });
    //        }

    //        if (rule.output && rule.output.length > 0) {
    //            let output = rule.output;
    //            let outputRule;

    //            output.map(outputItem => {
    //                if (outputItem.type === 'device') {
    //                    outputRule = new ITEM(outputItem.id, outputItem.type, outputItem.name, outputItem.state.prop,
    //                        outputItem.state.value, null, outputItem.delay, defItemLoop);
    //                } else if (outputItem.type === 'notice') {
    //                    outputRule = new ITEM(null, outputItem.type, null, null, outputItem.value, null
    //                        , outputItem.delay, defItemLoop);
    //                }
    //                if (outputRule)
    //                    outputRuleList.push(outputRule);
    //            })
    //        }

    //        if (rule.trigger) {
    //            let configuration = rule.trigger.configuration;
    //            if (configuration) {
    //                startCron = configuration.start;
    //                endCron = configuration.end;
    //                counter = configuration.counter;
    //                trigger = {
    //                    type: rule.trigger.type,
    //                    start: startCron,
    //                    end: endCron,
    //                    counter: counter
    //                };
    //            }
    //        }
    //        let ruleItem = new RULE(rule.id, rule.name, rule.active, trigger, inputRuleList, outputRuleList, "AND");
    //        listRules.push(ruleItem);
    //    })
    //    return listRules;
    //}

    static getRuleFromJsonObj(ruleConfig) {
        var lengthOfRule = RuleUtils.lengthOfObject(ruleConfig);
        var rule_list = [];
        if (!RuleUtils.isEmptyObject(ruleConfig) && lengthOfRule !== 0) {
            for (var u = 0; u < lengthOfRule; u++) {
                let key = Object.keys(ruleConfig)[u];

                let startCron, endCron, counter;
                let inputRuleList = [];
                let outputRuleList = [];
                let trigger;
                let defOpt = "eq";
                let defLoop = 1;

                if (!RuleUtils.isEmptyObject(ruleConfig[key].input) && ruleConfig[key].input.length !== 0) {
                    let inputItem = ruleConfig[key].input;
                    for (let i = 0; i < inputItem.length; i++) {
                        //flag = false;
                        //for (var j = 0; j < ruleConfig[key].seq_in.length; j++) {
                        //    if (ruleConfig[key].seq_in[j].id === ruleConfig[key].input[i].id) {
                        //        flag = true;
                        //        break;
                        //    }
                        //}
                        //if (flag === true) {
                        //    delay = ruleConfig[key].seq_in[j].delay;
                        //}
                        //else
                        //delay = 0;
                        //console.log(ruleConfig[key].input[i].id);

                        let inputRule;
                        let inputOpt;
                        let inputLoop;
                        let inputKeepAlive;

                        if (inputItem[i].state.operator)
                            inputOpt = inputItem[i].state.operator;
                        else
                            inputOpt = defOpt;
                        if (inputItem[i].repeat) {
                            inputLoop = inputItem[i].repeat;
                            inputKeepAlive = null;
                        }
                        else {
                            inputLoop = defLoop;
                            inputKeepAlive = null;
                            if (inputItem[i].keep_alive) {
                                inputKeepAlive = inputItem[i].keep_alive;
                            }
                        }


                        inputRule = new ITEM(inputItem[i].id, inputItem[i].type, inputItem[i].name, inputItem[i].state.prop,
                            inputItem[i].state.value, inputOpt, null, inputLoop, inputKeepAlive);

                        inputRuleList.push(inputRule);

                        //for (var k = 0; k < ruleConfig[key].input.state.length; k++) {
                        //    var inputRule = new ITEM(ruleConfig[key].input[i].id, ruleConfig[key].input[i].type
                        //        , ruleConfig[key].input[i].name
                        //        , ruleConfig[key].input[i].state[k].prop, ruleConfig[key].input[i].state[k].value, "undefined"
                        //    );
                        //}

                        //inputRuleList.push(inputRule);
                        //console.log(222, inputRuleList);
                    }
                }

                if (!RuleUtils.isEmptyObject(ruleConfig[key].output) && ruleConfig[key].output.length !== 0) {
                    for (let i = 0; i < ruleConfig[key].output.length; i++) {
                        //for(var k = 0; k < ruleConfig[key].output.state.length; k++) {

                        let outRule = new ITEM(ruleConfig[key].output[i].id
                            , ruleConfig[key].output[i].type
                            , ruleConfig[key].output[i].name
                            , ruleConfig[key].output[i].state.prop
                            , ruleConfig[key].output[i].state.value
                            , defOpt
                            , ruleConfig[key].output[i].delay
                            , null
                            , null
                        );
                        //}
                        outputRuleList.push(outRule);
                        //console.log(222, outputRuleList);
                    }
                }
                if (!RuleUtils.isEmptyObject(ruleConfig[key].trigger)) {

                    //var cron = ruleConfig[key].trigger.configuration.cronExpression;
                    //startCron = ruleConfig[key].trigger.configuration.startTime;
                    //var res = cron.split(" ");
                    //startCron = endCron = cron;
                    //if (start !== undefined) {
                    //    var index = start.indexOf(':');
                    //    var hour = start.substring(0, index);
                    //    var minute = start.substring(index + 1);
                    //    startCron = minute + " " + hour + " " + res[3] + " " + res[4] + " " + res[5];
                    //}
                    //endCron = ruleConfig[key].trigger.configuration.endTime;
                    //if (end !== undefined) {
                    //    var index = end.indexOf(':');
                    //    var hour = end.substring(0, index);
                    //    var minute = end.substring(index + 1);
                    //    endCron = minute + " " + hour + " " + res[3] + " " + res[4] + " " + res[5];
                    //}
                    //trigger = {
                    //    type: ruleConfig[key].trigger.type
                    //    , start: startCron, end: endCron
                    //    , counter: ruleConfig[key].trigger.configuration.counter
                    //};
                    //console.log(333, start + ": " + end + ": " + counter.toString());

                    let configuration = ruleConfig[key].trigger.configuration;
                    if (configuration) {
                        startCron = configuration.start;
                        endCron = configuration.end;
                        counter = configuration.counter;
                        trigger = {
                            type: ruleConfig[key].trigger.type,
                            start: startCron,
                            end: endCron,
                            counter: counter
                        };
                    }
                }

                //var ruleItem = new RULE(ruleConfig[key].id, ruleConfig[key].name, ruleConfig[key].type, trigger
                //    , inputRuleList, outputRuleList, "AND");
                var RULE = require('../Components/RuleItem');
                rule_list.push(new RULE(ruleConfig[key].id, ruleConfig[key].name, ruleConfig[key].type, trigger
                    , inputRuleList, outputRuleList, ruleConfig[key].mode, ruleConfig[key].order_input));
                //trigger to activate rule
            }
        }
        console.log(rule_list);
        return rule_list;
    }

    //check if time input is between start and end time
    static checkTime(t, start, end) {
        var minute = t.getMinutes();
        var hour = t.getHours();
        var dayOfMonth = t.getDate();
        var month = t.getMonth();
        var dayOfWeek = t.getDay();
        //if (dayOfWeek === 0) {
        //    dayOfWeek = 7;
        //}
        var crontime = new CronTime(minute, hour, dayOfMonth, month, dayOfWeek);
        var startObj = this.getCronObjFromExpression(start);
        var endObj = this.getCronObjFromExpression(end);

        //console.log(startObj.getValueDayOfWeek());

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

    static lengthOfObject(obj) {
        return Object.keys(obj).length;
    }

    static getCronObjFromExpression(c) {
        var res = c.split(" ");
        return new CronTime(res[0], res[1], res[2], res[3], res[4]);
    }

    static sleep(ms) {
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

module.exports = RuleUtils;