'use strict';

const main = document.querySelector('.shopping_list');

const input_name = document.querySelector('.input_name');
const input_price = document.querySelector('.input_price');
const itemList = document.querySelector('.list_item_box')
let checkedPrice = new Number(0);
let uncheckedPrice = new Number(0);

const addBtn = document.querySelector('.item_add_btn');
addBtn.addEventListener('click', () => {
  onClickAddBtn();
})

//제품리스트 클릭 이벤트 
itemList.addEventListener('click', (e) => {
  if(
    e.target.classList.contains('item_name') ||
    e.target.classList.contains('item_price')
  ){
    onClickItem(e);
  } else if(e.target.classList.contains('trash_btn')){
    onClickItemDelete(e)
  }
})

//제품 추가 키보드event - keyup (enter, <-, ->)
const addContainer = document.querySelector('.add_item_box');
addContainer.addEventListener('keyup', (e) => {
  if(
    e.target.classList.contains('input_name') ||
    e.target.classList.contains('input_price')
  ){
    if(e.key === 'Enter')
    {
      onClickAddBtn();
      focus();
    } else if 
    (
      e.key === 'ArrowRight' &&
      e.target.classList.contains('input_name')
    )
    {
      input_price.focus();
    } else if 
    (
      e.key === 'ArrowLeft' &&
        e.target.classList.contains('input_price')
    )
    {
      input_name.focus();
    }
  }
})

//제품 추가 
function onClickAddBtn(){
  const itemName = input_name.value;
  let itemPrice = parseInt(input_price.value);
  if(itemName == ''){
    alert('상품명을 입력해주세요! :)')
    return;
  }
  if(isNaN(itemPrice)){
    itemPrice = new Number(0);
  }

  const item = document.createElement('div')
  item.setAttribute('class','item_row');
  item.setAttribute('data-price', `${itemPrice}`)
  item.innerHTML = `
          <span class="item_name">${itemName}</span>
          <span class="item_price">${itemPrice} $</span>
          <i class="trash_btn far fa-trash-alt"></i>
  `;
  itemList.appendChild(item);
  input_name.value = '';
  input_price.value = '';

  uncheckedPrice += itemPrice;
  updateSummary();
}
// 함수) 리스트 클릭 이벤트
function onClickItem(event){
  const currPrice = parseInt(event.target.parentNode.dataset.price);
  if(event.target.parentNode.classList.contains('checked')){
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

//합계
const sumChecked = document.querySelector('.sum_checked_result');
const sumUnchecked = document.querySelector('.sum_unchcked_result');
const sumTotal = document.querySelector('.sum_total_result');
function updateSummary() {
  sumChecked.textContent = `${checkedPrice} $`;
  sumUnchecked.textContent = `${uncheckedPrice} $`;
  sumTotal.textContent = `${checkedPrice + uncheckedPrice} $`;
}

