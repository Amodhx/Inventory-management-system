export default class OrderModel{

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get orderCustomerId() {
        return this._orderCustomerId;
    }

    set orderCustomerId(value) {
        this._orderCustomerId = value;
    }

    get orderCustomerName() {
        return this._orderCustomerName;
    }

    set orderCustomerName(value) {
        this._orderCustomerName = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get orderAmount() {
        return this._orderAmount;
    }

    set orderAmount(value) {
        this._orderAmount = value;
    }

    constructor(orderId, orderCustomerId, orderCustomerName, orderDate, orderAmount) {
        this._orderId = orderId;
        this._orderCustomerId = orderCustomerId;
        this._orderCustomerName = orderCustomerName;
        this._orderDate = orderDate;
        this._orderAmount = orderAmount;
    }
}