export default class CustomerModel{


     get customerId() {
         return this._customerId;
     }

     set customerId(value) {
         this._customerId = value;
     }

     get customerName() {
         return this._customerName;
     }

     set customerName(value) {
         this._customerName = value;
     }

     get customerAddress() {
         return this._customerAddress;
     }

     set customerAddress(value) {
         this._customerAddress = value;
     }

     get customerContact() {
         return this._customerContact;
     }

     set customerContact(value) {
         this._customerContact = value;
     }

     get customerAddDate() {
         return this._customerAddDate;
     }

     set customerAddDate(value) {
         this._customerAddDate = value;
     }

     constructor(customerId, customerName, customerAddress, customerContact, customerAddDate) {
         this._customerId = customerId;
         this._customerName = customerName;
         this._customerAddress = customerAddress;
         this._customerContact = customerContact;
         this._customerAddDate = customerAddDate;
     }
 }