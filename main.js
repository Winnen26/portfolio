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

  navbarMenu.classList.remove('open')
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navBarToggleBtn = document.querySelector('.navBar__toggle-btn');

navBarToggleBtn.addEventListener('click', function(){
  navbarMenu.classList.toggle('open');
})

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

// Projects filtering
const workBtnContainer  = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', function(event){
  const target = event.target;
  const filter = target.dataset.filter || target.parentNode.dataset.filter;
  if(filter == null){
    return;
  }

// Remove selection from the previous item and select the new one
const selection = document.querySelector('.category__btn.selected');
selection.classList.remove('selected');
const btnTarget =  event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
btnTarget.classList.add('selected');


  projectContainer.classList.add('anim-out');

  setTimeout(function(){
    projects.forEach(function(project){
      const type = project.dataset.type;
      if(filter === 'all' || filter === type){
        project.classList.remove('invisible');
      }else{
        project.classList.add('invisible');
      }
    })
  
    projectContainer.classList.remove('anim-out');
  }, 300)
});


// 1. 모든 섹션 요소들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];

const sections = sectionIds.map(function(id){
  return document.querySelector(id);
});

const navItems = sectionIds.map(function(id){
  return document.querySelector(`[data-link="${id}"]`)
});

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerCallback = function(entries, observer){
  entries.forEach(function(entry){
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const  index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      }else{
        selectedNavIndex = index - 1;
      }
    }
  })
}

const observerOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observer = new IntersectionObserver(observerCallback, observerOption);

sections.forEach(function(section){
  observer.observe(section);
})

window.addEventListener('wheel', function(){
  if(window.scrollY === 0){
    selectedNavIndex = 0;
  }else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
})




// function
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth' , block: "start", inline: "nearest"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
};














