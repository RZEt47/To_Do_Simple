

let form = document.getElementById("addForm");
let itemsList = document.getElementById("items");
let filter = document.getElementById("filter");

const arrVal = []

const valObj = JSON.parse(localStorage.getItem("toDO"))

if (valObj) {
    valObj.forEach(function (item) {
        renderVal(item)
    })
}


form.addEventListener("submit", addItem);

itemsList.addEventListener("click", removeItem);

filter.addEventListener("keyup", filterItems);


function addItem(e) {
    e.preventDefault();

    let newItemInput = document.getElementById("newItemText");

    let newItemText = newItemInput.value;

    renderVal(newItemText)

    newItemInput.value = ""
}


function renderVal(text) {

    arrVal.push(text)

    localStorage.setItem("toDO", JSON.stringify(arrVal))


    let newElement = document.createElement("li");

    newElement.className = "list-group-item";

    let newTextNode = document.createTextNode(text);

    newElement.appendChild(newTextNode);



    let deleteBtn = document.createElement("button");

    deleteBtn.appendChild(document.createTextNode("Удалить"));

    deleteBtn.className = "btn btn-light btn-sm float-right";

    deleteBtn.dataset.action = "delete";

    newElement.appendChild(deleteBtn);

    itemsList.prepend(newElement);

}



function removeItem(e) {
    if (e.target.hasAttribute("data-action") && e.target.getAttribute("data-action") == "delete") {

        if (confirm("Удалить задачу?")) {
            e.target.parentNode.remove();

            const val = e.target.closest('li').firstChild.textContent
            const index = arrVal.findIndex(function (item) {
                if (val === item) {
                    return true
                }
            })

            if (index !== -1) {
                arrVal.splice(index, 1)
            }
            localStorage.setItem("toDO", JSON.stringify(arrVal))
        }
    }
}


function filterItems(e) {

    let searchedText = e.target.value.toLowerCase();

    let items = itemsList.querySelectorAll("li");

    items.forEach(function (item) {

        let itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(searchedText) != -1) {

            item.style.display = "block";
        } else {

            item.style.display = "none";
        }
    });
}
