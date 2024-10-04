import {orders, customers, inventories,orderItems} from "../db/db.js";
import OrderModel from "../model/orderModel.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import {OrderItemTableList} from "../model/tm/orderItemTableList.js";

loadOrderDataFromDataBase();

function loadOrderDataFromDataBase(){
    const http = new XMLHttpRequest();

    http.onreadystatechange =() =>{
        //check state
        if (http.readyState == 4){
            if (http.status == 200){
                const data = JSON.parse(http.responseText);
                data.forEach((item) => {
                    orders.push(new OrderModel(item.id,item.customer_id,item.customer_name,item.date,item.amount,item.type));
                });
                loadOrderTable();
            }else {
                console.error("Failed");
                console.error("Status Received" , http.status);
                console.error("Processing Stage" , http.readyState);
            }
        }else{
            console.log("Processing stage", http.readyState);
        }
    }

   

    http.open("GET","http://localhost:8080/inventory/order",true);
    http.setRequestHeader("Content-Type","application/json");
    http.send();
}

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
        if (itemCOde == item.iCode) {
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
        if (custId == customer.customerId) {
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
        let order = orders[orders.length - 1].orderId;
        genaratedOrderId = order+1;
        console.log(genaratedOrderId);
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
    $("#netPay").val(netTotal);
}


$("#discountValue").on('keyup',()=>{
    let pre = $("#discountValue").val();
    let dis = netTotal / 100 ;
    $("#netPay").val(netTotal - (dis * +pre));
});

$("#placeOrderEndingBtn").on('click',function (){
    genarateOrderId();
    let custId = $('#customerDrpBtn').text();
    let cusN = $("#CustomerNameOrder").val();
    let number = new Date();
    let netP = $("#netPay").val();
    let orderModel = new OrderModel(genaratedOrderId , custId , cusN , number.getUTCFullYear() +" /"+ number.getMonth()+ "/ "+ number.getDate() , netP);
    orders.push(orderModel);

    let modelel = $("#placeOrderModel");
    var modal = bootstrap.Modal.getInstance(modelel)
    modal.hide()
    loadOrderTable();
    $("#placeOrderTable").empty();

    
    const OrderDTO = {
        "id":genaratedOrderId,
        "customer_id" : custId,
        "customer_name" :cusN,
        "date" : number,
        "amount" : netP,
        "type" :"cash"
    }
    console.log("Order DTO",OrderDTO);

    // const OrderJson = JSON.stringify(OrderDTO);
    const http = new XMLHttpRequest();
    const list = [];
    orderItems.map(function (item){
        let OrderItemDTO ={
            "order_id" : genaratedOrderId,
            "item_id" : item.orderDetailItemCode
        }
        list.push(OrderItemDTO);
        
    })
    const JsonOBJ = new FormData();
    JsonOBJ.append("obj1",JSON.stringify(OrderDTO));
    JsonOBJ.append("obj2",JSON.stringify(list));


    http.onreadystatechange = ()=>{
        if(http.readyState == 4){
            if(http.status == 200){
                alert("Order Placed!")
            }else{
                console.log("status ",http.status)
            }
        }else{
            console.log("Processing stage ",http.readyState)
        }
    }
    http.open("POST","http://localhost:8080/inventory/transaction",true);
    http.setRequestHeader("Content-Type","application/json");
    http.setRequestHeader("obj1",JSON.stringify(OrderDTO));
    http.send(JSON.stringify(list));


});



function loadOrderTable() {
    $("#OrderTbl").empty();
    orders.map(function (order) {
        let val = `<tr>
                <td>${order.orderId}</td>
                <td>${order.orderCustomerId}</td>
                <td>${order.orderCustomerName}</td>
                <td>${order.orderDate}</td>
                <td>${order.orderAmount}</td>
                <td>Cash</td>
                <td><input type="button" value="Delete"></td>
            </tr>`;

        $("#OrderTbl").append(val);
    });


}