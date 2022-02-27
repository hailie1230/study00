'use strict';

//list 업데이트 
const input_add = document.querySelector('.list_item_add');
const input_price = document.querySelector('.list_item_price');
const add_button = document.querySelector('.item_add_btn');
const list_items = document.querySelector('.list_item_box');

function onAdd(){
  //1.
  const text_name = input_add.value;
  
  if(text_name === ''){
    input_add.focus();
    return
  }
  // console.log(text_name);
  // console.log(text_price);

  //2.
  const list_items = createItem(text_name)
  // const list_items = createItem(text_price)

  //3.
  input_add.value = '';
}


function createItem (text_name){
  const itemRow = document.createElement('div')
  itemRow.setAttribute('class', 'item_row');

  const checkBox = document.createElement('input')
  checkBox.type = 'checkbox';
  checkBox.setAttribute('class', 'check_box');
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      itemRow.style.textDecoration = 'line-through';
    } else {
      itemRow.style.textDecoration = '';
    }
  })

  const name = document.createElement('span');
  name.setAttribute('class', 'list_name');
  name.innerText = text_name;

  const price = document.createElement('span')
  let priceValue = input_price.value;
  price.setAttribute('class', 'list_price');
  price.innerText = input_price.value + '$';
  input_price.value = '';
  if(priceValue === ''){
    price.innerText = `${0}$`
  }


  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'trash');
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
  deleteBtn.addEventListener('click', () => {
    list_items.removeChild(itemRow);
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');


  itemRow.appendChild(checkBox)
  itemRow.appendChild(name)
  itemRow.appendChild(price)
  itemRow.appendChild(deleteBtn)

  list_items.appendChild(itemRow)
  list_items.appendChild(itemDivider)
  return list_items;

}
// function createPrice (text_price){


//   const itemPrice = document.createElement('span')
//   itemPrice.setAttribute('class', 'list_price');


// }

add_button.addEventListener('click', () => {
  onAdd();
})
input_add.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    onAdd();
  }
})

input_price.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    onAdd();
  }
})