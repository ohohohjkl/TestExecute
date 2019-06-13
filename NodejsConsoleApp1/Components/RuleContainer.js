"use strict"

var Util = require('../utils/utils');

class RuleContainer {
    constructor(rules) {
        this.RuleList = rules;
    }

    getRuleList() {
        return this.RuleList;
    }

    setRuleList(list) {
        this.RuleList = list;
    }

    getItemList() {
        return this.ItemList;
    }

    setItemList(list) {
        this.ItemList = list;
    }

    getTriggerList() {
        var x;
        if (this.RuleList !== undefined && this.RuleList.length !== 0) {
            for (i = 0; i < this.RuleList.length; i++) {
                if (!UTILS.isEmptyObject(this.RuleList[i].trigger)) {
                    var t = {
                        id: this.RuleList[i].RuleId,
                        trigger: this.RuleList[i].RuleTrigger
                    };
                    x.push(t);
                }
            }
        }
        return x;
    }

    getInputList() {
        var x;
        if (this.RuleList !== undefined && this.RuleList.length !== 0) {
            for (i = 0; i < this.RuleList.length; i++) {
                if (this.RuleList[i].RuleInput.length > 0) {
                    var t = {
                        id: this.RuleList[i].RuleId,
                        input: this.RuleList[i].RuleInput
                    };
                    x.push(t);
                }
            }
        }
        return x;
    }

    //get Rule from id
    getRuleFromId(id) {
        if (this.RuleList !== undefined && this.RuleList.length !== 0) {
            for (i = 0; i < this.RuleList.length; i++) {
                if (this.RuleList[i].RuleId === id) {
                    return this.RuleList[i];
                }
            }
        }
        return null;
    }

    //start list rule()
    startRuleList() {
        //set rulelist run phuong thuc crontime
        if (this.RuleList !== undefined && this.RuleList.length !== 0) {
            for (i = 0; i < this.RuleList.length; i++) {
                this.RuleList[i].crontimeCheck();
            }
        }
        
    }

    //Ham getDeviceState su dung API cua gateway de cap nhat state cua tat ca cac thiet bi
//    "type": "device",
//    "id": "0x000B57FFFE4F4F12-3",
//    "state": {
//        "prop": "onOff",
//        "value": 1
//    }
//},
//{
//    "type": "device",
//        "id": "0x000B57FFFE4F4F12-7",
//            "state": {
//        "prop": "onOff",
//           
    static getDeviceState() {
        var dvState = [];
        var dv_1 = {
            ItemID: '0x00dc526737282-1',ItemStateValue: 0
        };
        var dv_2 = {
            ItemID: '0x00dc526628564-3', ItemStateValue: 0
        };
        dvState.push(dv_1);
        dvState.push(dv_2);
        return dvState;
    }

    setDeviceState(deviceEndpoint) {
        //1. goi danh sach cac rule dang chay, quet danh sach rule
        // kiem tra neu rule.cronEx != null => rule.cronEx(deviceEndpoint);
        var ruleValid = MapRule(deviceEndpoint, new Date(Date.now()));
        if (ruleValid !== undefined && ruleValid.length !== 0) {
            for (i = 0; i < ruleValid.length; i++) {
                if (ruleValid[i].inputCheck() == true) {
                    ruleValid[i].execute();
                }
            }
        }
    }

    //Ham check su kien trong khi su kien Device_List_Updated duoc call
    //Su kien Device_List_Updated se duoc loopback trong khoang thoi gian t(s) de check state cua tat ca cac item
    //Khi do function MapRule se co nhiem vu, check tai thoi diem Device_List_Updated nhan duoc ket qua tra ve tu gateway
    //xem co nam trong trigger time cua rule nao khong
    //Neu co thi check input dau tien cua rule do voi state cua thiet bi xem co phu hop khong
    //Neu hai dieu kien tren thoa man, ta check seqInput va cac input con lai
    //Neu tat ca cac dieu kien khop thi thuc thi rule bang cach call toi ham execute cua doi tuong RuleItem
    MapRule(deviceEndpoint, currentTime) {
        var ruleMapArr;
        var inputList = getInputList();
        var triggerList = getTriggerList();
        var ruleValid;
        if (inputList !== undefined && inputList.length !== 0) {
            for (i = 0; i < inputList.length; i++) {
                for (j = 0; j < inputList[i].input.RuleInput.length; j++) {
                    if (inputList[i].input.RuleInput[j].ItemID === deviceEndpoint.ItemID) {
                        var r = getRuleFromId(inputList[i].id);
                        ruleMapArr.push(r);
                        break;
                    }
                }

            }
        }
        if (ruleMapArr !== undefined && ruleMapArr.length !== 0) {
            for (i = 0; i < ruleMapArr.length; i++) {
                if (ruleMapArr[i].RuleTrigger !== undefined && Util.UTILS.isEmptyObject(ruleMapArr[i].RuleTrigger) === false) {
                    if (Util.checkTime(currentTime, ruleMapArr[i].RuleTrigger.configuration.start, ruleMapArr[i].RuleTrigger.configuration.end) === true) {
                        ruleValid.push(ruleMapArr[i]);
                    }
                }
                else {
                    ruleValid.push(ruleMapArr[i]);
                }
            }
        }
    }
}

module.exports = RuleContainer;