const navBtn = document.querySelector('.humburger');
const smallScreenMenu = document.querySelector('.small-screen-menu');
const closeSideMenuBtn = document.querySelector('.close-menu');
const shareToAllBtn = document.querySelector('.share-all');
const copyLinkBtn = document.querySelector('.copylink');
const websiteUrl = document.URL;
const websiteTitle = document.querySelector('title').innerText;
const websiteText = document.querySelector('.main-news-title').innerText;
// console.log(websiteUrl)
// console.log(closeSideMenuBtn)
// console.log(navBtn)
navBtn.addEventListener('click', ()=>{
        smallScreenMenu.style.display = "flex"
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
    // smallScreenMenu.style.display = "none"
})

//copy website url to website
copyLinkBtn.addEventListener('click', ()=>{
// alert('link copped');
const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl);
      console.log(websiteUrl);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
copyLink();
})

//SHARE LINK VIA NAVIGATOR API 
const shareData = {
    title: websiteTitle,
    text: websiteText,
    url: websiteUrl
  }
//   const resultPara = document.querySelector('.result'); //TO-DO:unfinished  
  // Share open sharing dialoguebox after click and share link"
  shareToAllBtn.addEventListener('click', async () => {
    try {
      await navigator.share(shareData);
    //   resultPara.textContent = 'MDN shared successfully'; //tracking how many shared
    } catch (err) {
    //   resultPara.textContent = `Error: ${err}`;
    console.log('error')
    }
  });