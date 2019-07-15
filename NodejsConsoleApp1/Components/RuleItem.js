"use strict"
var schedule = require("node-schedule");
var UTIL = require("../utils/RuleUtils");
var CONTAINER = require("./RuleContainer");
function ahi(r, delay, id, ruleName) {
    if (r == 1) {
        console.log(ruleName + ": " + id + " Event/Delayed: on/" + delay);
    } else {
        console.log(ruleName + ": " + id + " Event/Delayed: off/" + delay);
    }
}

class RuleItem {
    constructor(id, name, type, trigger, input, out, logic, in_order) {
        this.RuleId = id;
        this.RuleName = name;
        this.RuleType = type;
        this.RuleTrigger = trigger;
        this.RuleInput = input;
        this.RuleOutput = out;
        this.RuleLogic = logic;
        this.RuleInputOrder = in_order;
        this.onRun = false;

        this.executeTimeout = null;
        this.executeVaild = false;
        this.scheduleStart = null;
        this.scheduleEnd = null;

        //atrib dung cho ordered logic
        this.expectedID = this.RuleInput[0].getItemID();       //ID cua item duoc xet
        this.expectedID2 = this.RuleInput[0].getItemID();       //ID cua item KeepAlive chua Item dang xet

        this.cronExe = this.cronExe.bind(this);
        this.resetFlag = this.resetFlag.bind(this);
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

    getRuleInputOrder() {
        return this.RuleInputOrder;
    }

    setRuleLogic(logic) {
        this.RuleLogic = logic;
    }

    resetExpectedID() {
        this.expectedID = this.RuleInput[0].getItemID();
        this.expectedID2 = this.RuleInput[0].getItemID();
    }

    reArrangeInList(ID) {       //ID xet dau tien
        let temp = this.RuleInput.indexOf();
        let i = 0;
        let flag = false;
        this.RuleInput.map(input => {
            if (input.getItemID() === ID) {
                temp = input;
                flag = true;
            }
            if (!flag)
                i++;
        });
        this.RuleInput.splice(i, 1);
        this.RuleInput.unshift(temp);
    }

    setVisitedForItem(ID,val) {     
        this.RuleInput.map(input => {
            if (input.getItemID() == ID) {
                input.setItemVisited(val);
                return;
            }
        });
    }
    async inputCheck(endpoint) {
        var InputFlag = false;
        var ID = endpoint.ItemID;

        console.log(this.RuleName, "StartCheckInput");
        //one time per start:end period
        if (this.onRun == true) {
            console.log(this.RuleName, "OneTimeADay has being Activated!!");
            return 0;
        }

        //input have the right order
        if (this.RuleInputOrder) {
            let expItem = false;
            if (ID === this.expectedID || ID === this.expectedID2) {
                for (let i = 0; i < this.RuleInput.length; i++) {
                    if (!expItem)
                        if (ID != this.RuleInput[i].getItemID())
                            continue;
                    expItem = true;
                    let dvState = CONTAINER.getDeviceState(this.RuleInput[i].getItemID());
                    if (dvState) {
                        let defineState = this.RuleInput[i].getItemState();
                        let receiveState = dvState.ItemStateValue;
                        let opt = this.RuleInput[i].getItemStateOpt();
                        if (this.OperatorFilter(defineState, receiveState, opt)) {
                            if (this.RuleInput[i].getItemAliveTime()) {
                                if (ID == this.RuleInput[i].getItemIncluded()) {
                                    this.resetItemParams();
                                    this.resetExpectedID();
                                    return 0;
                                }
                                if (this.RuleInput[i].getItemTimeOut() !== null) {
                                    return 3;
                                }
                                if (ID === dvState.ItemID) {
                                    let nextIndex = i + 1;
                                    if (nextIndex == this.RuleInput.length) {
                                        this.resetExpectedID();
                                        nextIndex = 0;
                                    }
                                    else {      //set parents node
                                        this.expectedID = this.RuleInput[nextIndex].getItemID();
                                        this.RuleInput[nextIndex].IncludedByItem(ID);
                                    }
                                    this.expectedID2 = ID;
                                    await this.RuleInput[i].itemAwait();
                                    //this.RuleInput[i].setItemVisited(true);
                                    if (nextIndex == this.RuleInput.length) {
                                        this.RuleInput[i].setItemVisited(true);
                                    }
                                    if (this.RuleInput[i].getItemIncluded()) {
                                        this.setVisitedForItem(this.RuleInput[i].getItemIncluded(), true);
                                    }
                                    continue;
                                }
                                
                                if (this.RuleInput[i].checkTimeoutValid()) {
                                    this.RuleInput[i].resetItemTimeout();
                                    this.RuleInput[i].setItemVisited(true);
                                }
                                else {
                                    return 4;
                                }
                            }
                            else {
                                if (ID === dvState.ItemID || (this.RuleInput[i].getItemLoop()==1))
                                    this.RuleInput[i].IncreaseItemInit();

                                if (this.RuleInput[i].checkItemCounter()) {
                                    console.log(this.RuleInput[i]);
                                    let nextIndex = i + 1;
                                    if (nextIndex == this.RuleInput.length) {
                                        nextIndex = 0;
                                    }
                                    this.expectedID = this.RuleInput[nextIndex].getItemID();
                                    this.expectedID2 = this.expectedID;

                                    this.RuleInput[i].setItemVisited(true);
                                    if (this.RuleInput[i].getItemIncluded()) {
                                        this.setVisitedForItem(this.RuleInput[i].getItemIncluded(),true);
                                    }
                                    if ((this.RuleInput[i].getItemLoop() == 1)) {
                                        this.RuleInput[i].restartItemInitTo(0);
                                    }
                                }
                                else {
                                    if (ID == this.RuleInput[i].getItemIncluded()) {
                                        this.resetItemParams();
                                        this.resetExpectedID();
                                        return 0;
                                    }
                                    console.log(this.RuleInput[i]);
                                    return 2;
                                }
                            }
                        }
                        else {
                            if (this.RuleInput[i].getItemAliveTime()) {
                                this.RuleInput[i].resetItemTimeout();
                                this.RuleInput[i].setTimeoutValid(false);
                            }
                            else {
                                this.RuleInput[i].restartItemInitTo(0);
                            }
                            return 0;
                        }
                    }
                }

                this.RuleInput.map(input => {
                    if (!input.getItemVisited) {
                        return 0;
                    }
                });
                this.resetExpectedID();
                this.resetItemParams();
                return 1;
            }
            else {
                this.resetItemParams();
                this.resetExpectedID();
                return 0;
            }
        }
        else if (this.RuleLogic === "and") {    //logic "AND" of an un-ordered the Input arr 
            this.reArrangeInList(ID);
        }
        for (let i = 0; i < this.RuleInput.length; i++) {
            if (this.RuleLogic === "or") {      //or logic
                if (ID != this.RuleInput[i].getItemID())
                    continue;
            }
            let dvState;
            if (i == 0 || this.RuleLogic === "or") {
                dvState = endpoint;
            }
            else {
                dvState = CONTAINER.getDeviceState(this.RuleInput[i].getItemID());
            }
            if (dvState) {
                let defineState = this.RuleInput[i].getItemState();
                let receiveState = dvState.ItemStateValue;
                let opt = this.RuleInput[i].getItemStateOpt();
                if (this.OperatorFilter(defineState, receiveState, opt)) {
                    if (this.RuleInput[i].getItemAliveTime()) {
                        if (this.RuleInput[i].getItemTimeOut() !== null) {
                            return 3;
                        }
                        if (ID === dvState.ItemID) {
                            this.reArrangeInList(await this.RuleInput[i].itemAwait());
                            InputFlag = true;
                            continue;
                        }
                        if (this.RuleInput[i].checkTimeoutValid()) {
                            this.RuleInput[i].resetItemTimeout();
                            InputFlag = true;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if (ID === dvState.ItemID||(this.RuleInput[i].getItemLoop() == 1)) {
                            this.RuleInput[i].IncreaseItemInit();
                            console.log(this.RuleInput[i]);
                        }

                        if (this.RuleInput[i].checkItemCounter()) {
                            ahi(dvState.ItemStateValue, null, dvState.ItemID, this.RuleName);
                            InputFlag = true;
                            if ((this.RuleInput[i].getItemLoop() == 1)) {
                                this.RuleInput[i].restartItemInitTo(0);
                            }
                        }
                        else if (this.RuleInput[i].checkItemCounterForReset()) {
                            this.RuleInput[i].restartItemInitTo(1);
                            
                                InputFlag = true;
                            
                            return 2;
                        }
                        else {
                            return 2;
                        }
                    }
                } else {
                    if (this.RuleInput[i].getItemAliveTime()) {
                        this.RuleInput[i].resetItemTimeout();
                        this.RuleInput[i].setTimeoutValid(false);
                    }
                    else {
                        this.RuleInput[i].restartItemInitTo(0);
                    }
                    return 0;
                }
            }
        }
        if (InputFlag === true) return 1;
        else return 0;
    }

    resetItemParams() {     //reset ItemTimeout/Iteminit
        this.RuleInput.map(input => {
            input.setItemVisited(false);
            if (input.getItemAliveTime()) {
                input.resetItemTimeout();
                input.setTimeoutValid(false);
            }
            else {
                input.restartItemInitTo(0);
            }

        });
    }

    OperatorFilter(stateA, stateB, Opt) {
        switch (Opt) {
            case "eq":
                if (stateA === stateB)
                    return true;
                break;
            case "lt":
                if (stateA <= stateB)
                    return true;
                break;
            case "gt":
                if (stateA >= stateB)
                    return true;
                break;
            case "l":
                if (stateA < stateB)
                    return true;
                break;
            case "g":
                if (stateA > stateB)
                    return true;
                break;
        }
        return false;
    }

    async cronExe(deviceEndpoint) {
        this.inputCheck(deviceEndpoint).then(
            (val) => {
                if (val === 1) {            //rule met requirements
                    this.executeVaild = true;
                    this.execute();
                }
                else if (val === 0) {       //discard rule operation
                    console.log(this.RuleName + " F");
                    this.executeVaild = false;
                    this.resetTimeOut();
                }
                else if (val === 2) {       //repeat cond hasn't met
                    console.log(this.RuleName + " Counter F");
                    this.executeVaild = false;
                }

                else if (val == 3) {        //
                    console.log(this.RuleName + " KeepAlive time is not run out yet!");
                }
                else {                      //Wait for next KeepAlive
                    console.log(this.RuleName + " wait!");

                }
            }
        ).catch(
            function (reason) {
                console.log("1111", reason);
            }
        );
    }

    resetAllInputTimeOut() {
        this.RuleInput.map(input => {
            input.resetItemTimeout();
        });
    }

    resetTimeOut() {
        if (this.executeTimeout) {
            clearTimeout(this.executeTimeout);
        }
        this.executeTimeout = null;
    }

    resetFlag() {
        this.resetTimeOut();
        this.resetAllInputTimeOut();
        this.runOnlyPerDay = false;
        this.executeVaild = false;
    }

    sleep(ms) {
        return new Promise(resolve => {
            this.executeTimeout = setTimeout(resolve, ms);
        })
    }

    crontimeCheck() {
        if (this.RuleTrigger !== undefined) {
            var start = this.RuleTrigger.start;
            var end = this.RuleTrigger.end;

            schedule.scheduleJob(start, this.cronExe);
            schedule.scheduleJob(end, this.resetFlag);

        }
        else {
            this.cronExe();
        }
    }

    async execute() {
        console.log(this.RuleName + " start Execute");
        if (this.RuleTrigger.counter == true) {
            this.onRun = true;
        }
        for (var i = 0; i < this.RuleOutput.length; i++) {
            if (this.RuleOutput[i].getNStateDelay() !== 0) {
                await this.sleep(this.RuleOutput[i].getNStateDelay());
            }
            ahi(this.RuleOutput[i].getItemState(), this.RuleOutput[i].getNStateDelay(), this.RuleOutput[i].getItemID(), this.RuleName);

            // }
            // }
        }

        //
        //for (let i = 0; i < this.RuleOutput.length; i++) {
        //    this.RuleOutput[i].getStateDelayed(this.RuleOutput[i].getNStateDelay(), this.RuleName, ahi);
        //}
    }
};

module.exports = RuleItem;