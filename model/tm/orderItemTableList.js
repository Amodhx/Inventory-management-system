export class OrderItemTableList{
    get oiiCode() {
        return this._oiiCode;
    }

    set oiiCode(value) {
        this._oiiCode = value;
    }

    get oiiName() {
        return this._oiiName;
    }

    set oiiName(value) {
        this._oiiName = value;
    }

    get oiiUnitPrice() {
        return this._oiiUnitPrice;
    }

    set oiiUnitPrice(value) {
        this._oiiUnitPrice = value;
    }

    get oiiQty() {
        return this._oiiQty;
    }

    set oiiQty(value) {
        this._oiiQty = value;
    }

    get oiiAmount() {
        return this._oiiAmount;
    }

    set oiiAmount(value) {
        this._oiiAmount = value;
    }

    constructor(oiiCode, oiiName, oiiUnitPrice, oiiQty, oiiAmount) {
        this._oiiCode = oiiCode;
        this._oiiName = oiiName;
        this._oiiUnitPrice = oiiUnitPrice;
        this._oiiQty = oiiQty;
        this._oiiAmount = oiiAmount;
    }
}