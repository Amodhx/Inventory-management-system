

export default class InventoryModel{

    get productName() {
        return this._productName;
    }

    set productName(value) {
        this._productName = value;
    }

    get buyingPrice() {
        return this._buyingPrice;
    }

    set buyingPrice(value) {
        this._buyingPrice = value;
    }

    get sellingPrice() {
        return this._sellingPrice;
    }

    set sellingPrice(value) {
        this._sellingPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value;
    }

    get expireDate() {
        return this._expireDate;
    }

    set expireDate(value) {
        this._expireDate = value;
    }

    constructor(productName, buyingPrice, sellingPrice, qty, brand, expireDate) {
        this._productName = productName;
        this._buyingPrice = buyingPrice;
        this._sellingPrice = sellingPrice;
        this._qty = qty;
        this._brand = brand;
        this._expireDate = expireDate;
    }
}