import CustomerModel from "../model/customerModel.js";
import {customers} from "../db/db.js";


let index;
$("#customerSavebtn").on('click', () => {
    let btnText = $("#customerSavebtn").text();
    if (btnText == "Update") {
        customers[index].customerId = $("#customerIdField").val();
        customers[index].customerName = $("#cusrtomerNameField").val();
        customers[index].customerAddress = $("#customerAddressField").val();
        customers[index].customerContact = $("#customerContactField").val();

        loadCustomerValues();
        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide();
    } else {

        var regexContact = /^\d{10}$/;
        if (regexContact.test($("#customerContactField").val())) {
            let cusId = $("#customerIdField").val();
            let cusContact = $("#customerContactField").val();
            let cusName = $("#cusrtomerNameField").val();
            let cusAddress = $("#customerAddressField").val();
            let date = Date.now();

            let customer = new CustomerModel(cusId, cusName, cusAddress, cusContact, date);
            customers.push(customer);
            loadCustomerValues();
            let modelel = $("#modelAddCustomer");
            var modal = bootstrap.Modal.getInstance(modelel)
            modal.hide();
        }else {
            alert("Wrong Contact Number!!");
        }
    }
});


function loadCustomerValues() {
    $("#customerTbody").empty();

    customers.map(function (customer) {
        var value =
            ` <tr>
                <td class="customerId-val">${customer.customerId}</td>
                <td class="customerName-val">${customer.customerName}</td>
                <td class="customerAddress-val">${customer.customerAddress}</td>
                <td class="customerContact-val">${customer.customerContact}</td>
                <td class="customerDate-val">${customer.customerAddDate}</td>
            </tr>`

        $("#customerTbody").append(value);
    });
}

// table row click
$("#customerTbody").on('click', 'tr', function () {
    console.log("AMOdh")
    let id = $(this).find('.customerId-val').text();
    let name = $(this).find('.customerName-val').text();
    let address = $(this).find('.customerAddress-val').text();
    let contact = $(this).find('.customerContact-val').text();
    index = $(this).index();

    $('#modelAddCustomer').modal('show');

    $("#customerSavebtn").text("Update");
    $("#customerModelHeader").text("Update Customer");

    $("#customerDeleteBtn").text("Delete");
    $("#customerDeleteBtn").css({
        background : "red"
    })
    $("#customerIdField").val(id);
    $("#customerContactField").val(contact);
    $("#cusrtomerNameField").val(name);
    $("#customerAddressField").val(address);

});

$("#customerDeleteBtn").on('click',function () {
    let btnText = $("#customerDeleteBtn").text();
    if (btnText == "Delete") {
        customers.splice(index, 1);
        loadCustomerValues();
        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }else {
        let modelel = $("#modelAddCustomer");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }
})

$("#btn").on('click', function () {
    $('#modelAddCustomer').modal('show');
    $("#customerSavebtn").text("Save Changes");
    $("#customerModelHeader").text("Add Customer");
    $("#customerIdField").val("");
    $("#customerContactField").val("");
    $("#cusrtomerNameField").val("");
    $("#customerAddressField").val("");
    $("#customerDeleteBtn").text("Close");
    $("#customerDeleteBtn").css({
        background : "gray"
    })
})