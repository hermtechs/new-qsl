const navBtn = document.querySelector('.humburger');
//! SCROLL-TOP NAV STARTS FROM HERE
const navbar = document.querySelector("Nav")
let lastScroll = 0;
window.addEventListener("scroll", function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScroll){
        navbar.style.top="-80px"
    }else{
        navbar.style.top="0";
    }

    lastScroll = scrollTop;

})
//! SCROLL-TOP NAV ENDS FROM HERE

// !PROGRESS BAR & Back-TO-Top STARTS FROM HERE
const progressBar = document.getElementById("Progress-bar")
const BackTop = document.querySelector(".Back-to-top")
console.log(progressBar)
// percentage Calculation;
document.addEventListener("scroll", updateWidth)

// updateWidth function
function updateWidth(){
    // console.dir(document.documentElement)
    const {scrollTop, scrollHeight} = document.documentElement;
    const widthPercent = `${(scrollTop /(scrollHeight - window.innerHeight)) * 100}%`
    // console.log(widthPercent)
    progressBar.style.setProperty("--progress", widthPercent)

}