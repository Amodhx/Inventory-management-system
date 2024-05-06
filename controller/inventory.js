import InventoryModel from "../model/inventoryModel.js";
import {inventories} from "../db/db.js";



// inventory save item on btn click
$("#inventorySavebtn").on('click',()=>{
        let productName = $("#inputProduct").val();
        let buyPrice = $("#inputbuyPrice").val();
        let exDate = $("#inputEXDate").val();
        let selPrice = $("#inputSelprice").val();
        let qty = $("#inputQTY").val();
        let brand = $("#inputBrand").val();

        let item = new InventoryModel(productName,buyPrice,selPrice,qty,brand,exDate);
        inventories.push(item);
        loadInventoryTable();


        let modelel = $("#exampleModalInventory");
        var modal = bootstrap.Modal.getInstance(modelel)
        modal.hide();
});



// load inventory table
function loadInventoryTable(){
    $("#inventoryTbody").empty();

    inventories.map(function (item) {
        var value =
           ` <tr>
                <td>${item.productName}</td>
                <td>${item.buyingPrice}</td>
                <td>${item.qty}</td>
                <td>${item.brand}</td>
                <td>${item.sellingPrice}</td>
                <td>${item.expireDate}</td>
                <td>"In Stock"</td>
                <td><input type="button" value="Update"></td>
                <td><input type="button" value="Delete"></td>
            </tr>`

        $("#inventoryTbody").append(value);
    });
}
