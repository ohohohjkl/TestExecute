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


//async specificInputCheck(dvState) {

//    if (this.onRun == true) {
//        console.log(this.RuleName, "OneTimeADay has being Activated!!");
//        return 0;
//    }
//    console.log(this.RuleName, "StartCheckInput");

//    var input = CONTAINER.getDeviceState(dvState.ItemID);

//    if (dvState) {
//        let defineState = input.getItemState();
//        let receiveState = dvState.ItemStateValue;
//        let opt = input.getItemStateOpt();
//        if (this.OperatorFilter(defineState, receiveState, opt)) {
//            if (input.getItemAliveTime()) {
//                await this.sleepIn(input.getItemAliveTime());
//                ahi(input.ItemStateValue, input.ItemDelay, input.getItemID(), "ahi");
//                let dvState2 = CONTAINER.getDeviceState(input.getItemID());
//                if (this.OperatorFilter(defineState, dvState2.ItemStateValue, opt))
//                    return 1;
//            }
//            else {
//                if (input.checkItemCounter()) {
//                    ahi(input.ItemStateValue, input.ItemDelay, input.getItemID(), this.RuleName)
//                    input.restartItemInit();
//                    return 1;
//                }
//                else {
//                    input.IncreaseItemInit();
//                    return 2;
//                }
//            }

//        } else {
//            ahi(input.ItemStateValue, input.ItemDelay, input.getItemID(), this.RuleName)
//            return 0;
//        }

//    }
//}


//"use strict"
//function sleep(ms) {
//    return new Promise(resolve => {
//        setTimeout(resolve, ms)
//    })
//}

//class Item {
//    //constructor(id, type, name, prop, value, delay) {
//    //    this.ItemID = id;
//    //    this.ItemType = type;
//    //    this.ItemName = name;
//    //    this.ItemStateProp = prop;
//    //    this.ItemStateValue = value;
//    //    this.ItemDelay = delay;
//    //    this.getItemID = this.getItemID.bind(this);
//    //}

//    constructor(id, type, name, state, delay) {
//        this.ItemID = id;
//        this.ItemType = type;
//        this.ItemName = name;
//        this.ItemState = state;
//        this.ItemDelay = delay;
//        this.getItemID = this.getItemID.bind(this);
//    }
//    //get ItemID() {
//    //    return this.ItemID;
//    //}
//    //set ItemID(id) {
//    //    this.ItemID = id;
//    //}
//    //get ItemType() {
//    //    return this.ItemType;
//    //}
//    //set ItemType(type) {
//    //    this.ItemType = type;
//    //}
//    //get ItemStateProp() {
//    //    return this.ItemStateProp;
//    //}
//    //set ItemStateProp(prop) {
//    //    this.ItemStateProp = prop;
//    //}
//    //get ItemStateValue() {
//    //    return this.ItemStateValue;
//    //}
//    //set ItemStateValue(value) {
//    //    this.ItemStateValue = value;
//    //}
//    //get ItemDelay() {
//    //    return this.ItemDelay;
//    //}
//    //set ItemDelay(delay) {
//    //    this.ItemDelay = delay;
//    //}

//    getItemID() {
//        return this.ItemID;
//    }

//    getItemName() {
//        return this.ItemName;
//    }

//    getNStateDelay() {
//        return this.ItemDelay;
//    }
//    getItemStateValue(index) {
//        return this.ItemState[index].value;
//    }
//    getItemStateProp(index) {
//        return this.ItemState[index].prop;
//    }
//    getItemStateLength() {
//        return this.ItemState.length;
//    }
//    async getStateDelayed(delay,ruleName, getState) {
//        await sleep(delay);
//        getState(this.ItemStateValue, this.ItemDelay, this.ItemName, ruleName);
//    }

//    async setStateDelayed(delay, setState) {
//        await sleep(delay);
//        if (type == "device") {
//            setState(this.ItemStateValue);
//        }
//    }
//}

//module.exports = Item

//async cronExe(deviceEndpoint) {
//    if (this.RuleLogic == "or") {
//        this.specificInputCheck(deviceEndpoint).then((val) => {
//            if (val == 1) {
//                this.execute();
//                this.executeVaild = true;
//            }
//            else if (val === 0) {
//                console.log(111);
//                this.executeVaild = false;
//                this.resetTimeOut();
//            }
//            else {
//                this.executeVaild = false;
//            }
//        });

//    }
//    else {
//        this.inputCheck(deviceEndpoint.ItemID);
//        let val = this.inputCheck(deviceEndpoint.ItemID);

//        if (val === 1) {
//            this.executeVaild = true;
//            this.execute();
//        }
//        else if (val === 0) {
//            console.log(this.RuleName + " F");
//            this.executeVaild = false;
//            this.resetTimeOut();
//        }
//        else if (val === 2) {
//            console.log(this.RuleName + " Counter F");
//            this.executeVaild = false;
//        }
//        else {
//            console.log(this.RuleName + " KeepAlive time is not run out yet!");
//        }
//    }
//}