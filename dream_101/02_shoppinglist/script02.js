'use strict';

//list 업데이트 
const input_add = document.querySelector('.list_item_add');
const input_price = document.querySelector('.list_item_price');
const add_button = document.querySelector('.item_add_btn');
const list_items = document.querySelector('.list_item_box');

let checkedPrice = new Number(0);
let uncheckedPrice = new Number(0);

function onAdd(){
  const text_name = input_add.value;
  if(text_name === ''){
    input_add.focus();
    return
  }
  const list_items = createItem(text_name)
  input_add.value = '';
}


function createItem (text_name){

  let priceValue = parseInt(input_price.value);

  const itemRow = document.createElement('div')
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-price', `${priceValue}`);

  const checkBox = document.createElement('input')
  checkBox.type = 'checkbox';
  checkBox.setAttribute('class', 'check_box');
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      itemRow.style.backgroundColor = 'rgba(0,0,0,0.3)';
      // itemRow.style.border = '';
    } else {
      itemRow.style.backgroundColor = '';
      // itemRow.style.border ='';
    }
  })

  const name = document.createElement('span');
  name.setAttribute('class', 'list_name');
  name.innerText = text_name;

  const price = document.createElement('span')
  price.setAttribute('class', 'list_price');
  price.innerText = input_price.value + '$';
  input_price.value = '';
  if(priceValue === ''){
    price.innerText = `${0}$`
  }
  if (isNaN(priceValue)) {
    priceValue = new Number(0);
  }
  
  uncheckedPrice += priceValue;
  updateSummary ()


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

list_items.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('list_name') ||
    e.target.classList.contains('list_price')
  ) {
    onClickItem(e);
  } else if (e.target.classList.contains('trash')) {
    onClickItemDelete(e);
  }
});

function onClickItem(event) {
  const currPrice = parseInt(event.target.parentNode.dataset.price);
  if (event.target.parentNode.classList.contains('checked')) {
    event.target.parentNode.classList.remove('checked');
    uncheckedPrice += currPrice;
    checkedPrice -= currPrice;
  } else {
    event.target.parentNode.classList.add('checked');
    checkedPrice += currPrice;
    uncheckedPrice -= currPrice;
  }

  updateSummary();
}

function onClickItemDelete(event) {
  const currPrice = parseInt(event.target.parentNode.dataset.price);
  event.target.parentNode.remove();
  if (event.target.parentNode.classList.contains('checked')) {
    checkedPrice -= currPrice;
  } else {
    uncheckedPrice -= currPrice;
  }
  updateSummary();
}


// 합계 구하기 
const checkedResult = document.querySelector('.checked_result');
const unchckedResult = document.querySelector('.unchcked_result');
const totalResult = document.querySelector('.total_result');

function updateSummary (){
  checkedResult.textContent = `${checkedPrice} $`
  unchckedResult.textContent = `${uncheckedPrice} $`
  totalResult.textContent = `${checkedPrice+uncheckedPrice} $`
}
// function checkedUpdate (){
//   let sumChecked 
// }
