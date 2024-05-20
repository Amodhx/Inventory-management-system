

export default class InventoryModel{

    get iCode() {
        return this._iCode;
    }

    set iCode(value) {
        this._iCode = value;
    }

    get iName() {
        return this._iName;
    }

    set iName(value) {
        this._iName = value;
    }

    get iBuyPrice() {
        return this._iBuyPrice;
    }

    set iBuyPrice(value) {
        this._iBuyPrice = value;
    }

    get iQty() {
        return this._iQty;
    }

    set iQty(value) {
        this._iQty = value;
    }

    get iBrand() {
        return this._iBrand;
    }

    set iBrand(value) {
        this._iBrand = value;
    }

    get iSelPrice() {
        return this._iSelPrice;
    }

    set iSelPrice(value) {
        this._iSelPrice = value;
    }

    get iEXDate() {
        return this._iEXDate;
    }

    set iEXDate(value) {
        this._iEXDate = value;
    }

    constructor(iCode, iName, iBuyPrice, iQty, iBrand, iSelPrice, iEXDate) {
        this._iCode = iCode;
        this._iName = iName;
        this._iBuyPrice = iBuyPrice;
        this._iQty = iQty;
        this._iBrand = iBrand;
        this._iSelPrice = iSelPrice;
        this._iEXDate = iEXDate;
    }
}