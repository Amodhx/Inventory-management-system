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
        console.log("save")
        let productName = $("#inputProduct").val();
        let buyPrice = $("#inputbuyPrice").val();
        let exDate = $("#inputEXDate").val();
        let selPrice = $("#inputSelprice").val();
        let qty = $("#inputQTY").val();
        let brand = $("#inputBrand").val();

        let item = new InventoryModel(productName, buyPrice, selPrice, qty, brand, exDate);
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
                <td class="itemName-val" >${item.productName}</td>
                <td class="itemBuyPrice-val">${item.buyingPrice}</td>
                <td class="itemQty-val">${item.qty}</td>
                <td class="itemBrand-val">${item.brand}</td>
                <td class="itemSelPrice-val">${item.sellingPrice}</td>
                <td class="itemExDate-val">${item.expireDate}</td>
                <td>"In Stock"</td>
            </tr>`

        $("#inventoryTbody").append(value);
    });
}
function clearFileds() {
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
    let iname = $(this).find('.itemName-val').text();
    let ibuyPrice = $(this).find('.itemBuyPrice-val').text();
    let iqty = $(this).find('.itemQty-val').text();
    let ibrand = $(this).find('.itemBrand-val').text();
    let iselPrice = $(this).find('.itemSelPrice-val').text();
    let iexDate = $(this).find('.itemExDate-val').text();

    index = $(this).index();
    console.log( iexDate )

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



});




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

})
