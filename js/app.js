// Selecting All Elements   // İlk önce kullanıcağım HTML elementlerini değişkenlere atıyorum

const form = document.getElementById("items-form");
const itemInput = document.getElementById("item");
const itemList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.getElementById("clear-items");


eventListeners();

// Putting All Event Listeners in a Function   

function eventListeners() {
    form.addEventListener("submit", addItem);
    document.addEventListener("DOMContentLoaded", loadAllItemsToPage);
    secondCardBody.addEventListener("click", deleteItem);
    filter.addEventListener("keyup", filterItems);
    clearButton.addEventListener("click", clearAllItems);
}

function clearAllItems(e) {
    itemList.innerHTML = ""; // Deleting from the Page / Sayfadan Silme
    localStorage.removeItem("items"); // Deleting from the storage
}

function filterItems(e) {
    console.log(e.target.value);
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) { // We check with indexof method
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}



function deleteItem(e) {

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteItemsFromStorage(e.target.parentElement.parentElement.textContent);
        alert("succes", "Item has been removed");
    }
}

function deleteItemsFromStorage(deleteitem) {
    let items = getItemsFromStorage();
    items.forEach(function(item, index) {
        if (item === deleteitem) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}

function loadAllItemsToPage() {
    let items = getItemsFromStorage();

    items.forEach(function(item) {
        addNewitemToPage(item);
    })
}

function addItem(e) {
    const newItem = itemInput.value.trim(); // Trim methodunu eğer girilen değerde boşluk varsa diye kullandım
    if (newItem === "") {
        alert("danger", "Please enter a shopping item !");

    } else {
        addNewitemToPage(newItem);
        addItemToStorage(newItem);
    }

    e.preventDefault();
}

function getItemsFromStorage() { // Storagedan item ları aldık
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    return items;

}

function addItemToStorage(newItem) {

    let items = getItemsFromStorage();

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));


}

// Kullanıcı eğer bir değer girmeden ekleme yapmaya çalışırsa / If user tries to add an item without typing anything
function alert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`,
        alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 1500);
}


function addNewitemToPage(newItem) {

    const listItem = document.createElement("li"); // Creating new li element
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.className = "delete-item";
    anchor.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newItem));
    listItem.appendChild(anchor);


    itemList.appendChild(listItem);


    itemInput.value = "";
}