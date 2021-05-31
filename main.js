'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navBar');
const navBarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', function(){
  // console.log(scrollY);
  // console.log(navBarHeight);
  if(window.scrollY > navBarHeight){
    navbar.classList.add('navBar--dark');
  }else{
    navbar.classList.remove('navBar--dark');
  }
})