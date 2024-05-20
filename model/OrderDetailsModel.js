 export default class OrderDetailsModel{

    get orderDetailCustomerId() {
        return this._orderDetailCustomerId;
    }

    set orderDetailCustomerId(value) {
        this._orderDetailCustomerId = value;
    }

    get orderDetailItemCode() {
        return this._orderDetailItemCode;
    }

    set orderDetailItemCode(value) {
        this._orderDetailItemCode = value;
    }

    constructor(orderDetailCustomerId, orderDetailItemCode) {
        this._orderDetailCustomerId = orderDetailCustomerId;
        this._orderDetailItemCode = orderDetailItemCode;
    }
}