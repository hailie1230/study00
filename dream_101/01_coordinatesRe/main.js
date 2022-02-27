'use strict'

const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;

addEventListener('load', () => {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX
    const y = e.clientY
    console.log(`${x} ${y}`);

    vertical.style.transform = `translateX(${x}px)`
    horozontal.style.transform = `translateY(${y}px)`
    target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`
    tag.style.transform = `translate(${x + 20}px, ${y + 20}px)`

    tag.innerHTML = `${e.clientX}, ${e.clientY}`
  })
})