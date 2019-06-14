"use strict"
var schedule = require("node-schedule");
var UTIL = require("../utils/utils");
var CONTAINER = require("../Components/RuleContainer");
function ahi(r,delay,id,ruleName) {
    if (r == 1) {
        console.log(ruleName+ ": " +id+ " Event/Delayed: on " + delay);
    } else {
        console.log(ruleName + ": "+ id+ " Event/Delayed: off " + delay);
    }
}

class RuleItem {
    constructor(id, name, trigger, input, out, logic) {
        this.RuleId = id;
        this.RuleName = name;
        this.RuleTrigger = trigger;
        this.RuleInput = input;
        this.RuleOutput = out;
        this.RuleLogic = logic;
        this.cronExe = this.cronExe.bind(this);
        this.inputCheck = this.inputCheck.bind(this);
        this.execute = this.execute.bind(this);
        this.getRuleInput = this.getRuleInput.bind(this);
    }

    getRuleId() {
        return this.RuleId;
    }

    setRuleId(id) {
        this.RuleId = id;
    }

    getRuleInput() {
        return this.RuleInput;
    }

    setRuleInput(RuleInput) {
        this.RuleInput = RuleInput;
    }

    getRuleOutput() {
        return this.RuleOutput;
    }

    setRuleOutput(RuleOutput) {
        this.RuleOutput = RuleOutput;
    }

    getRuleName() {
        return this.RuleName;
    }

    setRuleName(name) {
        this.RuleName = name;
    }

    getRuleTrigger() {
        return this.RuleTrigger;
    }

    setRuleTrigger(trigger) {
        this.RuleTrigger = trigger;
    }

    getRuleLogic() {
        return this.RuleLogic;
    }

    setRuleLogic(logic) {
        this.RuleLogic = logic;
    }


    async inputCheck() {
        var delayArray;
        var InputFlag = false;
        console.log(this.RuleName, "StartCheckInput");
        for (let i = 0; i < this.RuleInput.length; i++) {
            if (this.RuleInput[i].getNStateDelay() !== 0) {
                try {
                    await UTIL.sleep(this.RuleInput[i].getNStateDelay());
                }
                catch (err) {
                    console.error(err);
                }
            }
            
            var dvState = CONTAINER.getDeviceState();
            var input = this.getRuleInput();
            for (let j = 0; j < dvState.length; j++) {
                //console.log(i);
                if (dvState[j].ItemID === this.getRuleInput()[i].ItemID) {
                    if (dvState[j].ItemStateValue === input[i].getItemState()) {
                        InputFlag = true;
                    }
                    else {
                        return false;
                    }
                }
            }
                
                
        }
    if (InputFlag === true) {
        return true;
    }
    else {
        return false;
    }
}

    cronExe() {
        this.inputCheck().then(
            (val) => {
                if (val === true) {
                    this.execute();
                }
                else {
                    console.log(this.RuleName + " F")
                }
            }
        ).catch(
            function (reason) {
                console.log("1111", reason);
            }
        );
        //if (this.inputCheck() === true) {
        //    this.execute();
        //}
        //else {
        //    console.log("cc");
        //    return;
        //}
    }

    //checkcrontime
    crontimeCheck() {
        if (this.RuleTrigger !== undefined) {
            var start = this.RuleTrigger.start;
            var end = this.RuleTrigger.end;
            
            schedule.scheduleJob(start, this.cronExe);
        }
        else {
            this.cronExe();
        }
    }

    crontimeCheck() {
            this.cronExe();
    }

    //ham thuc thi cac output cua rule
    execute() {
        console.log(this.RuleName+ " start Execute");
        for (let i = 0; i < this.RuleOutput.length; i++) {
            this.RuleOutput[i].getStateDelayed(this.RuleOutput[i].getNStateDelay(), this.RuleName, ahi);
        }
    }
};

module.exports = RuleItem;