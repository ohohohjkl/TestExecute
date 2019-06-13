//"use strict"
//var schedule = require("node-schedule");

//function ahi(endVal, inVal) {
//    if (endVal === inVal) {
//        InputFlag= true;
//    } else {
//        InternalFlag = true;
//        InputFlag = false;
//    }
//}

//class RuleItem {
//    constructor(id, name, trigger, input, out, logic) {
//        this.RuleId = id;
//        this.RuleName = name;
//        this.RuleTrigger = trigger;
//        this.RuleInput = input;
//        this.RuleOutput = out;
//        this.RuleLogic = logic;
//        this.InputFlag = false;
//        this.InternalFlag = false;
//    }

//    getRuleId() {
//        return this.RuleId;
//    }

//    setRuleId(id) {
//        this.RuleId = id;
//    }

//    getRuleInput() {
//        return this.RuleInput;
//    }

//    setRuleInput(RuleInput) {
//        this.RuleInput = RuleInput;
//    }

//    getRuleOutput() {
//        return this.RuleOutput;
//    }

//    setRuleOutput(RuleOutput) {
//        this.RuleOutput = RuleOutput;
//    }

//    getRuleName() {
//        return this.RuleName;
//    }

//    setRuleName(name) {
//        this.RuleName = name;
//    }

//    getRuleTrigger() {
//        return this.RuleTrigger;
//    }

//    setRuleTrigger(trigger) {
//        this.RuleTrigger = trigger;
//    }

//    getRuleLogic() {
//        return this.RuleLogic;
//    }

//    setRuleLogic(logic) {
//        this.RuleLogic = logic;
//    }

//    getDeviceState() {
//        var dvState = [];
//        var dv_1 = {
//            ItemID: '0x00dc526737282-1', ItemStateValue: 0
//        };
//        var dv_2 = {
//            ItemID: '0x00dc526628564-3', ItemStateValue: 0
//        };
//        dvState.push(dv_1);
//        dvState.push(dv_2);
//        return dvState;
//    }

//    async getStateDBDelayed(delay, inVal, getStateDB) {
//        await sleep(delay);
//        this.InputFlag = getStateDB(this.getDeviceState(), inVal);
//    }

//    checkFlag() {
//        if (InternalFlag === true) {
//            console.log("failed!");
//        }
//        if (this.InputFlag == true) {
//            this.execute();
//        }
//    }
//    async checkFlagDelayed(delay, checkFlag) {
//        await sleep(delay);
//        this.checkFlag();
//    }


//    inputCheck() {
//        if (this.RuleInSeq !== undefined && this.RuleInSeq.length !== 0) {
//            var delayArray;
//            var InputFlag = false;

//            for (i = 0; i < this.RuleInput.length; i++) {
//                if (this.RuleInput.delay != 0) {
//                    this.getStateDBDelayed(this.RuleInput.delay, this.RuleInput[i].ItemStateValue, ahi);
//                }

//                //var dvState = RuleContainer.getDeviceState();
//                //if (dvState.ItemStateValue === this.RuleInput[j].ItemStateValue) {
//                //    InputFlag = true;
//                //}
//                //else
//                //    return false;
//            }
//            this.checkFlagDelayed(5050, checkFlag);
//            //if (flag === true) {
//            //    return true;
//            //}
//        }
//    }

//    cronExe() {
//        this.inputCheck();
//    }

//    //checkcrontime
//    crontimeCheck() {
//        if (this.RuleTrigger !== undefined) {
//            var start = this.RuleTrigger.start;
//            var end = this.RuleTrigger.end;
//            schedule.scheduleJob(start, this.cronExe);
//        }
//        else {
//            this.cronExe();
//        }



//    }

//    //ham thuc thi cac output cua rule
//    execute() {
//        console.log(123, "ahi");
//        for (i = 0; i < this.RuleOutput.length; i++) {
//            this.RuleOutput[i].getStateDelayed(this.RuleOutput[i].getNStateDelay(), ahi);
//        }
//    }
//};

//module.exports = RuleItem;