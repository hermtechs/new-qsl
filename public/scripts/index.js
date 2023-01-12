const navBtn = document.querySelector('.humburger');
const smallScreenMenu = document.querySelector('.small-screen-menu');
const closeSideMenuBtn = document.querySelector('.close-menu');
const logo = document.querySelector('.logo-side-bar') //applies only to homepage
const storyOfDayElement = document.querySelector('.story-of-day');

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
logo.addEventListener('click', ()=>{
    smallScreenMenu.style.transform = 'translateX(-100%)'
})


//  Getting data from CMS and updating our UI with it

const getContentTypeData = async ()=>{
    const client = await contentful.createClient({
        space: "e267q19fd4xy",
        accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
      });

 //getting landingPageData   
 const landingPageData = await client.getEntries({content_type:"sports2dayLandingPage"})
    .then(response=>{return response.items})

// getting trending news (Big Post) data   
const trendingNewsBigPostData = await client.getEntries({content_type:"mainContentTrendingBigPost"})
       .then(response=>{ return response.items;}) 

    // getting trending posts data
 const trendingNewsSmallPostData  = await client.getEntries({content_type:"sporsts2dayMainContent"})
       .then(response=>{return response.items})

    //    getting generalNewsPostsData from cms
 const generalNewsPostsData  = await client.getEntries({content_type:"sports2dayGeneralNews"})
       .then(response=>{return response.items}) 
    
    // getting breaking news posts    
const generalNewsPostLinksData = await client.getEntries({content_type:"sports2dayBreakingNews"})
       .then(response=>{return response.items}) 
      // getting more news posts
const moreNewsPostsData = await client.getEntries({content_type:"sports2dayMoreNews"})
.then(response=>{return response.items}) 
 
 //updating UI
//  createPost(mainPostData)
updateLandingPage(landingPageData); 
updateTrendingNewsBigPost(trendingNewsBigPostData);
updateTrendingSmallPosts(trendingNewsSmallPostData)
updateGeneralNews(generalNewsPostsData,generalNewsPostLinksData);
updateMoreNews(moreNewsPostsData);
}

getContentTypeData();

function updateLandingPage(landingPageData){
    const entryId = landingPageData[0].sys.id
   const {newsTitle,articleImage,newsCategory}=landingPageData[0].fields;
   
   //image
   const{photoDescription, file} = articleImage.fields;
   const topStoryImgUrl =  file.url.substring(2)
   storyOfDayElement.style.background = `url('https://${topStoryImgUrl}'), #200518`

  const storyOfDayLinkl =document.querySelector('.story-of-day').href = entryId

   storyOfDayElement.innerHTML = ` <img src="https://${topStoryImgUrl}" alt="${photoDescription}" class="story-of-day-img">
   <div class="story-of-day-txt">
       <span class="category"> 
           <p class="story-category">${newsCategory} <i class="fa-regular fa-circle-dot"></i> </p> 
          </span>
       <h2>${newsTitle}</h2>
   </div>`
}

function updateTrendingNewsBigPost(trendingNewsBigPostData){
    // console.log(trendingNewsBigPostData) 
    const lastAddedEntry = trendingNewsBigPostData[0];
    // console.log(lastAddedEntry);
    const entryId =lastAddedEntry.sys.id;
    const {articleImage,newsTitle,shortDescription}=lastAddedEntry.fields;

    const{file} = articleImage.fields;
    const imgUrl =  file.url.substring(2)

    const readMoreBtn = document.querySelector('.btn-read-more-trending');
    const trendingNewsBigPostTitle = document.querySelector('.trending-big-title');
    const shortDescriptionElement = document.querySelector('.trending-short-description')
    const trendingNewsContainer = document.querySelector('.top-story-big');

    readMoreBtn.href =entryId;
    trendingNewsBigPostTitle.innerText = newsTitle;
    shortDescriptionElement.innerText = shortDescription;
    trendingNewsContainer.style.background = `url('https://${imgUrl}'),radial-gradient(#d6d6d6, #4e053e)`;
}

function updateTrendingSmallPosts(trendingNewsSmallPostData){
  const trendingSmallPosts = trendingNewsSmallPostData.map(data=>{
    // console.log(data)
    const entryId = data.sys.id;

    const {newsTitle,articleImage,photoDescription,articleTime}=data.fields;

    const date = articleTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
   const  reformattedDate = date.replace("-", " ").replace("-", " ")
   
   //getting image urls
   const{file} = articleImage.fields;
    const imgUrl =  file.url.substring(2);
    // creating HTML for small posts under trending news
    return `
    <a href="${entryId}" class="small-post sharable-link">
    <img src="https://${imgUrl}" alt="${photoDescription}" loading="lazy">
    <div class="description-txt-small">
      <p>${newsTitle}  </p>
      <div class="time-stamp">
        <span class="post-meta-data"><i class="fa-regular fa-clock"></i> ${reformattedDate} </span> 
      </div>
    </div>
   </a> `
   })

   const smallTrendingNewsContainer = document.querySelector('.small-posts')
   smallTrendingNewsContainer.innerHTML = trendingSmallPosts;
}

function updateGeneralNews(generalNewsPostsData,generalNewsPostLinksData){

  const breakingNewsPosts = generalNewsPostLinksData.map(data=>{
    const entryId = data.sys.id;
    const {newsTitle,articleTime} = data.fields;
    const date = articleTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
   const  reformattedDate = date.replace("-", " ").replace("-", " ") 
    return `
    <div class="breaking-news-post">
    <a href=${entryId}>
    <h4>${newsTitle}</h4>
  </a>
    <div class="time-stamp">
      <span class="post-meta-data"></span>
     <span><i class="fa-regular fa-clock"></i>
     </span> 
    </span> ${reformattedDate} </span> 
    </div>
  </div>  
    `
  }).join("")

  const generalNews =  generalNewsPostsData.map(data=>{   
    const entryId =data.sys.id
    const {newsTitle,articleImage,newsCategory,articleTime,photoDescription}=data.fields;
      const {file} = articleImage.fields;
      const imgUrl =  file.url.substring(2);
      const date = articleTime.slice(0, -12);
  
      // removing hyphens from dates eg 2022-12-20 to 2022 12 20
     const  reformattedDate = date.replace("-", " ").replace("-", " ") 
    //  console.log(data.sys.id)

      return `<article class="general-news-post">
      <img src="https://${imgUrl}" alt="${photoDescription}" loading="lazy" class="general-news-img">
      <div class="txt">
      <div class="news-category">${newsCategory}</div>
      <a href="${entryId}"> <h3 class="news-title">${newsTitle}</h3> </a>
      <div class="time-stamp">
        <span class="post-meta-data"></span>
       <span><i class="fa-regular fa-clock"></i>
       </span> 
      </span> ${reformattedDate} </span> 
      </div>
      </div>
    </div>
    </article>
   `
    }).join("")
 //breakingNewsSection (one with only links -no images)
const breakingNewsSection = document.querySelector('.breaking-news-section')
const generalNewsSection = document.querySelector('.general-news')
 breakingNewsSection.innerHTML = "<p class='section-heading'>Breaking News</p>" + breakingNewsPosts;
// breakingNewsSection.innerHTML =  generalNews;
const generalNewsElement = document.createElement('article');
generalNewsElement.className = "breaking-news-section";
generalNewsElement.innerHTML = generalNews;
generalNewsSection.appendChild(generalNewsElement)

// generalNewsSection.appendChild(generalNewsElement)
}

function updateMoreNews(moreNewsPostsData){
  // console.log(moreNewsPostsData)
 const moreNewsPosts = moreNewsPostsData.map(data=>{
    const entryId = data.sys.id;
    const {newsTitle,articleImage, photoDescription} =data.fields;
    const {file} = articleImage.fields;
    const imgUrl =  file.url.substring(2);
    return `
    <a href="${entryId}" class="small-post">
    <img src="http://${imgUrl}" loading="lazy" alt="${photoDescription}">
    <div class="description-txt">
      <h3>${newsTitle}</h3>
    </div>
  </a>
  `
  }).join("");
  const moreNewsPostsContainer = document.querySelector('.more-news-small-container');
  moreNewsPostsContainer.innerHTML = moreNewsPosts;
}
