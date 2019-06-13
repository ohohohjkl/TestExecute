"use strict"
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

class Item {

    constructor(id, type, prop, value, delay) {
        this.ItemID = id;
        this.ItemType = type;
        this.ItemStateProp = prop;
        this.ItemStateValue = value;
        this.ItemDelay = delay;
    }
    //get ItemID() {
    //    return this.ItemID;
    //}
    //set ItemID(id) {
    //    this.ItemID = id;
    //}
    //get ItemType() {
    //    return this.ItemType;
    //}
    //set ItemType(type) {
    //    this.ItemType = type;
    //}
    //get ItemStateProp() {
    //    return this.ItemStateProp;
    //}
    //set ItemStateProp(prop) {
    //    this.ItemStateProp = prop;
    //}
    //get ItemStateValue() {
    //    return this.ItemStateValue;
    //}
    //set ItemStateValue(value) {
    //    this.ItemStateValue = value;
    //}
    //get ItemDelay() {
    //    return this.ItemDelay;
    //}
    //set ItemDelay(delay) {
    //    this.ItemDelay = delay;
    //}

    getNStateDelay() {
        return this.ItemDelay;
    }
    getItemState() {
        return this.ItemStateValue;
    }

    async getStateDelayed(delay, getState) {
        await sleep(delay);
        getState(this.ItemStateValue, this.ItemDelay);
    }

    async setStateDelayed(delay, setState) {
        await sleep(delay);
        if (type == "device") {
            setState(this.ItemStateValue);
        }

    }
}

module.exports = Item