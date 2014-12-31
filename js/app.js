var itemInput = document.getElementById("new-item");
var addButton = document.getElementsByTagName("button")[0];
var incompleteItemsHolder = document.getElementById("incomplete-items");
var completedItemsHolder = document.getElementById("completed-items");

var createNewItemElement = function(itemString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = itemString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild (deleteButton);

  return listItem;
}

var addItem = function() {
  console.log("Add item...")

  var listItem = createNewItemElement(itemInput.value);
  incompleteItemsHolder.appendChild(listItem);
  bindItemEvents(listItem, itemCompleted);

  itemInput.value = "";
}

var editItem = function() {
  console.log("Edit item...")

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");

  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

  var deleteItem = function() {
    console.log("Delete task...")
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
  }

var itemCompleted = function() {
  console.log("Task complete...")
  var listItem = this.parentNode;
  completedItemsHolder.appendChild(listItem);
  bindItemEvents(listItem, itemIncomplete)
}

var itemIncomplete = function() {
  console.log("Task incomplete...")
  var listItem = this.parentNode;
  incompleteItemsHolder.appendChild(listItem);
  bindItemEvents(listItem, itemCompleted);
}

var bindItemEvents = function(itemListItem, checkBoxEventHandler) {
  console.log("Bind list items...")
  var checkBox = itemListItem.querySelector("input[type=checkbox]");
  var editButton = itemListItem.querySelector("button.edit");
  var deleteButton = itemListItem.querySelector("button.delete");

  editButton.onclick = editItem;
  deleteButton.onclick = deleteItem;

  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

addButton.addEventListener("click", addItem);
addButton.addEventListener("click", ajaxRequest);

for(var i = 0; i < incompleteItemsHolder.children.length; i++) {
  bindItemEvents(incompleteItemsHolder.children[i], itemCompleted);
}

for(var i = 0; i < completedItemsHolder.children.length; i++) {
  bindItemEvents(completedItemsHolder.children[i], itemIncomplete);
}
