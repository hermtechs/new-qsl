const navBtn = document.querySelector('.humburger');
const smallScreenMenu = document.querySelector('.small-screen-menu');
const closeSideMenuBtn = document.querySelector('.close-menu');
// console.log(closeSideMenuBtn)
// console.log(navBtn)
navBtn.addEventListener('click', ()=>{
        smallScreenMenu.style.transform = 'translateX(0%)'
})
const navLinksSmallScreen = document.querySelectorAll(".small-screen-links a");
navLinksSmallScreen.forEach(link=>{
    link.addEventListener('click', ()=>{
        smallScreenMenu.style.transform = 'translateX(-100%)'
    })
})
closeSideMenuBtn.addEventListener('click', ()=>{
    smallScreenMenu.style.transform = 'translateX(-100%)'
})