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
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navBar__menu');
navbarMenu.addEventListener('click', function(event){
  const target = event.target;
  const link = target.dataset.link;
  if(link === undefined){
    return;
  };

  scrollIntoView(link);
});


// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', function(){
  scrollIntoView('#contact');
});

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth' , block: "start", inline: "nearest"});
}