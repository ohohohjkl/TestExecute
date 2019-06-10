"use strict"

function ahi(r,delay) {
    if (r == 1) {
        console.log("Event/Delayed: on " + delay);
    } else {
        console.log("Event/Delayed: off " + delay);
    }
}

class Rule {
    constructor(id, name, trigger, input, out, logic) {
        this.RuleId = id;
        this.RuleName = name;
        this.RuleTrigger = trigger;
        this.RuleInput = input;
        this.RuleOutput = out;
        this.RuleLogic = logic;
    }

    //get RuleId() {
    //    return this.RuleId;
    //}

    //set RuleId(id) {
    //    this.RuleId = id;
    //}

    //get RuleInput() {
    //    return this.RuleInput;
    //}

    //set RuleInput(RuleInput) {
    //    this.RuleInput = RuleInput;
    //}

    //get RuleOutput() {
    //    return this.RuleOutput;
    //}

    //set RuleOutput(RuleOutput) {
    //    this.RuleOutput = RuleOutput;
    //}

    //get RuleName() {
    //    return this.RuleName;
    //}

    //set RuleName(name) {
    //    this.RuleName = name;
    //}

    //get RuleTrigger() {
    //    return this.RuleTrigger;
    //}

    //set RuleTrigger(trigger) {
    //    this.RuleTrigger = trigger;
    //}

    //get RuleLogic() {
    //    return this.RuleLogic;
    //}

    //set RuleLogic(logic) {
    //    this.RuleLogic = logic;
    //}


    //ham thuc thi cac output cua rule
    execute() {
        for (i = 0; i < this.RuleOutput.length; i++) {
            this.RuleOutput[i].getStateDelayed(this.RuleOutput[i].getNStateDelay(), ahi);
        }
    }
};

module.exports = Rule;