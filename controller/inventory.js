import InventoryModel from "../model/inventoryModel.js";
import {customers, inventories} from "../db/db.js";



// inventory save item on btn click
$("#inventorySavebtn").on('click',()=>{

    let text = $("#inventorySavebtn").text();
    if (text == "Update"){
        console.log("Update")
        inventories[index].productName = $("#inputProduct").val();
        inventories[index].buyingPrice = $("#inputbuyPrice").val();
        inventories[index].sellingPrice = $("#inputSelprice").val();
        inventories[index].qty = $("#inputQTY").val();
        inventories[index].brand = $("#inputBrand").val();
        inventories[index].expireDate = $("#inputEXDate").val();

        loadInventoryTable();
        let modelel = $("#exampleModalInventory");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide();

    }else {
        let id = $("#inputProductId").val();
        let productName = $("#inputProduct").val();
        let buyPrice = $("#inputbuyPrice").val();
        let exDate = $("#inputEXDate").val();
        let selPrice = $("#inputSelprice").val();
        let qty = $("#inputQTY").val();
        let brand = $("#inputBrand").val();

        let item = new InventoryModel(id,productName, buyPrice,qty,brand, selPrice, exDate);
        inventories.push(item);
        loadInventoryTable();

        clearFileds();

        let modelel = $("#exampleModalInventory");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide();
    }
});



// load inventory table
function loadInventoryTable(){
    $("#inventoryTbody").empty();

    inventories.map(function (item) {
        var value =
           ` <tr>
                <td class="itemCode-val">${item.iCode}</td>
                <td class="itemName-val" >${item.iName}</td>
                <td class="itemBuyPrice-val">${item.iBuyPrice}</td>
                <td class="itemQty-val">${item.iQty}</td>
                <td class="itemBrand-val">${item.iBrand}</td>
                <td class="itemSelPrice-val">${item.iSelPrice}</td>
                <td class="itemExDate-val">${item.iEXDate}</td>
                <td>"In Stock"</td>
            </tr>`

        $("#inventoryTbody").append(value);
    });
}
function clearFileds() {
    $("#inputProductId").val("");
    $("#inputProduct").val("");
    $("#inputbuyPrice").val("");
    $("#inputEXDate").val("");
    $("#inputSelprice").val("");
    $("#inputQTY").val("");
    $("#inputBrand").val("");
}

let index;



// table row click
$("#inventoryTbody").on('click','tr',function () {
    let iid = $(this).find('.itemCode-val').text();
    let iname = $(this).find('.itemName-val').text();
    let ibuyPrice = $(this).find('.itemBuyPrice-val').text();
    let iqty = $(this).find('.itemQty-val').text();
    let ibrand = $(this).find('.itemBrand-val').text();
    let iselPrice = $(this).find('.itemSelPrice-val').text();
    let iexDate = $(this).find('.itemExDate-val').text();

    index = $(this).index();
    console.log( iexDate )

    $("#inputProductId").val(iid);
    $("#inputProduct").val(iname);
    $("#inputbuyPrice").val(ibuyPrice);
    $("#inputEXDate").val(iexDate);
    $("#inputSelprice").val(iselPrice);
    $("#inputQTY").val(iqty);
    $("#inputBrand").val(ibrand);


    $("#exampleModalInventory").modal('show');


    $("#itemModelClose").text("Delete")
    $("#itemModelClose").css({
        background:"red"
    })

    $("#ItemModelHeader").text("Update Item")
    $("#inventorySavebtn").text("Update")

    removeValidation()
});

function removeValidation() {
    $("#inputProductId").removeClass('is-invalid');

    $("#inputProductId").removeClass('is-valid');
}

// validation

$("#inputProductId").on('keyup',()=>{
    const regex = /^I\d{2}-\d{3}$/;
    let val = $("#inputProductId").val();
    if (regex.test(val)){
        $("#inputProductId").addClass('is-valid');
        $("#inputProductId").removeClass('is-invalid');
    }else {
        $("#inputProductId").addClass('is-invalid');
        $("#inputProductId").removeClass('is-valid');
    }
})



// item delete or model close
$("#itemModelClose").on('click',function (){
    let btnText = $("#itemModelClose").text();
    if (btnText == "Delete") {
        console.log("delete")
        inventories.splice(index, 1);
        loadInventoryTable();
        let modelel = $("#exampleModalInventory");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }else {
        console.log("close")
        let modelel = $("#exampleModalInventory");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide()
    }
});



// btn addItem on click
$("#btnAddItem").on('click',function () {

    $("#exampleModalInventory").modal('show');
    $("#itemModelClose").text("Close")
    $("#itemModelClose").css({
        background:"gray"
    })

    $("#ItemModelHeader").text("Add Item")
    $("#inventorySavebtn").text("Save Changes")



 removeValidation()


})
