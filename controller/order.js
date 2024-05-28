import {orders, customers, inventories,orderItems} from "../db/db.js";
import OrderModel from "../model/orderModel.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import {OrderItemTableList} from "../model/tm/orderItemTableList.js";


let genaratedOrderId;
let orderItemTableArray = [];
let netTotal  = 0 ;
$("#AddOrderBtn").on('click', () => {
    $("#placeOrderModel").modal('show');
    setCustomerIds();
    setItemCodes();

    $("#customerDrpBtn").text("Select Customer Id");
    clearItemFields();
    $("#CustomerNameOrder").val("");
    $("#CustomerAddressOrder").val("");


    $("#itemQtygetting").removeClass('is-valid');
    $("#itemQtygetting").removeClass('is-invalid');
    genarateOrderId();
});

function clearItemFields() {
    $("#itemDropbtn").text("Select Item Code");
    $("#ItemName").val("");
    $("#ItemPrice").val("");
    $("#ItemQtyOnHand").val("");
}
function setCustomerIds() {
    $("#customerIdsDropDown").empty();
    customers.map(function (customer) {
        var v = ` <li><a class="dropdown-item" href="#">${customer.customerId}</a></li>`;

        $("#customerIdsDropDown").append(v)
    });
}

function setItemCodes() {
    $("#itemorderDrop").empty();
    inventories.map(function (item) {
        var v = ` <li><a class="dropdown-item" href="#">${item.iCode}</a></li>`;

        $("#itemorderDrop").append(v)
    });
}

$("#itemorderDrop").on('click', 'li', function () {
    let itemCOde = $(this).find('.dropdown-item').text();

    $("#itemDropbtn").text(itemCOde)

    inventories.map(function (item) {
        if (itemCOde === item.iCode) {
            $("#ItemName").val(item.iName);
            $("#ItemPrice").val(item.iSelPrice);
            $("#ItemQtyOnHand").val(item.iQty);
        }
        $("#itemQtygetting").focus();
    })


})

$("#customerIdsDropDown").on('click', 'li', function () {
    let custId = $(this).find('.dropdown-item').text();

    $("#customerDrpBtn").text(custId)

    customers.map(function (customer) {
        if (custId === customer.customerId) {
            $("#CustomerNameOrder").val(customer.customerName);
            $("#CustomerAddressOrder").val(customer.customerAddress);
        }
    })


});

$("#itemQtygetting").on('keyup',()=>{
    let getQTY = $("#itemQtygetting").val();
    let onHnd = $("#ItemQtyOnHand").val();

    if (+onHnd < +getQTY){
        $("#itemQtygetting").addClass('is-invalid');
        $("#itemQtygetting").removeClass('is-valid');
    }else {
        $("#itemQtygetting").addClass('is-valid');
        $("#itemQtygetting").removeClass('is-invalid');
    }
});

function genarateOrderId() {
    if (orders.length > 0){
        let order = orders[orders.length - 1];
    }else {
        genaratedOrderId = 1 ;
    }

}
$("#btnAddcart").on('click',function () {
    let itemCode = $("#itemDropbtn").text();
    let itemName = $("#ItemName").val();
    let itemPrice = $("#ItemPrice").val();
    let itemQTYGET = $("#itemQtygetting").val();


    let p = +itemPrice;
    let q = + itemQTYGET;
    let total = p*q;
    netTotal += total;
    settingNetTotal();
    let orderDetailsModel = new OrderDetailsModel(genaratedOrderId,itemCode);
    let orderItemTableList = new OrderItemTableList(itemCode,itemName,itemPrice,itemQTYGET,total);
    orderItemTableArray.push(orderItemTableList);
    orderItems.push(orderDetailsModel);
    loadTablePlaceOrder();
    $("#itemQtygetting").val("");
    clearItemFields();

});

function loadTablePlaceOrder() {
    $("#placeOrderTable").empty();
    orderItemTableArray.map(function (orderItem) {
        let s = `<tr>
                            <td>${orderItem.oiiCode}</td>
                            <td>${orderItem.oiiName}</td>
                            <td>${orderItem.oiiUnitPrice}</td>
                            <td>${orderItem.oiiQty}</td>
                            <td>${orderItem.oiiAmount}</td>
                            <td><input type="button" value="Delete"></td>
                        </tr>`;
        $("#placeOrderTable").append(s);
    })
}

function settingNetTotal() {
    $("#orderTotal").val(netTotal);
}


$("#discountValue").on('keyup',()=>{
    let pre = $("#discountValue").val();
    let dis = netTotal / 100 ;
    $("#netPay").val(netTotal - (dis * +pre));
});

