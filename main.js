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

// Make home slowly fade to  transparent as the window scrolls down
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height;

const homeContainer = document.querySelector('.home__container');

document.addEventListener('scroll', function(){
  if(window.scrollY <= homeHeight){
    const opacity = 1 - window.scrollY / homeHeight;
    homeContainer.style.opacity = opacity;
  }
});

// Show "Arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', function(){
  if(window.scrollY > homeHeight / 2){
    arrowUp.classList.add('visible');
  }else{
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', function(){
  scrollIntoView('#home');
})







function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth' , block: "start", inline: "nearest"});
};














// Top
// const top1 = document.querySelector('#top');
// console.log(top1)

// document.addEventListener('scroll', function(){
//   if(window.scrollY > navBarHeight){
//     top1.style.display = 'block'
//   }else{
//     top1.style.display = 'none'
//   }
// });

// top1.addEventListener('click', function(){
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// })