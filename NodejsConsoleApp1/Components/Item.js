
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

class Item {
    constructor(id, type, name, prop, value, opt, delay, loop, keep_alive) {
        this.ItemID = id;
        this.ItemType = type;
        this.ItemName = name;
        this.ItemStateProp = prop;
        this.ItemStateValue = value;
        this.ItemStateOperator = opt;
        this.ItemDelay = delay;
        this.ItemLoop = loop;
        this.ItemInit = 0;
        this.ItemAliveTime = keep_alive;
        this.ItemTimeout = null;
        this.ItemTimeoutValid = false;
        this.ItemVisited = false;
        this.IncludedBy = null;
    }

    getItemID() {
        return this.ItemID;
    }

    getItemName() {
        return this.ItemName;
    }

    getNStateDelay() {
        return this.ItemDelay;
    }

    getItemState() {
        return this.ItemStateValue;
    }

    getItemStateProp() {
        return this.ItemStateProp;
    }

    getItemStateOpt() {
        return this.ItemStateOperator;
    }

    getItemType() {
        return this.ItemType;
    }

    getItemLoop() {
        return this.ItemLoop;
    }

    getItemInit() {
        return this.ItemInit;
    }

    getItemTimeOut() {
        return this.ItemTimeout;
    }

    getItemAliveTime() {
        return this.ItemAliveTime;
    }

    getItemIncluded() {
        return this.IncludedBy;
    }
    setTimeoutValid(valid) {
        this.ItemTimeoutValid = valid;
    }

    checkTimeoutValid() {
        return this.ItemTimeoutValid === true ? true : false;
    }
    async sleepIn() {
        return new Promise(resolve => {
            this.ItemTimeout = setTimeout(resolve, this.ItemAliveTime);
        })
    }

    async itemAwait() {
        //await new Promise(resolve => {
        //    this.ItemTimeout = setTimeout(resolve, this.ItemAliveTime);
        //})
        await this.sleepIn();
        this.setTimeoutValid(true);
        this.resetItemTimeout();
        console.log(this);
        return this.ItemID;
    }
    resetItemTimeout() {
        if (this.ItemTimeout) {
            clearTimeout(this.ItemTimeout);
        }
        this.ItemTimeout = null;
    }
    restartItemInitTo(val) {
        this.ItemInit = val;
    }

    IncreaseItemInit() {
        this.ItemInit += 1;
    }

    checkItemCounter() {
        return this.ItemInit === this.ItemLoop ? true : false
    }

    checkItemCounterForReset() {
        return this.ItemInit === (this.ItemLoop + 1) ? true : false
    }

    setItemVisited(val) {
        this.ItemVisited = true;
    }

    IncludedByItem(ID) {
        this.IncludedBy = ID;
    }
}

module.exports = Item;