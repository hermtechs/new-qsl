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
//  const landingPageData = await client.getEntries({content_type:"sports2dayLandingPage"})
//     .then(response=>{return response.items})

// getting trending news (Big Post) data   
// const trendingNewsBigPostData = await client.getEntries({content_type:"mainContentTrendingBigPost"})
//        .then(response=>{ return response.items;}) 

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
// updateLandingPage(landingPageData); 
updateTrendingSmallPosts(trendingNewsSmallPostData)
updateTrendingNewsBigPost(trendingNewsSmallPostData);
updateGeneralNews(generalNewsPostsData,generalNewsPostLinksData);
updateMoreNews(moreNewsPostsData);
}

getContentTypeData();

// function updateLandingPage(landingPageData){
//     const entryId = landingPageData[0].sys.id
//    const {newsTitle,articleImage,newsCategory}=landingPageData[0].fields;
   
//    //image
//    const{photoDescription, file} = articleImage.fields;
//    const topStoryImgUrl =  file.url.substring(2)
//    storyOfDayElement.style.background = `url('https://${topStoryImgUrl}'), #200518`

//   const storyOfDayLinkl =document.querySelector('.story-of-day').href = entryId

//    storyOfDayElement.innerHTML = ` 
//    <img src="https://${topStoryImgUrl}" alt="${photoDescription}" class="story-of-day-img">
//    <div class="story-of-day-txt">
//        <span class="category"> 
//            <p class="story-category">${newsCategory} <i class="fa-regular fa-circle-dot"></i> </p> 
//           </span>
//        <h2>${newsTitle}</h2>
//    </div>`
// }

//this is always element 0 of small posts data
function updateTrendingNewsBigPost(trendingNewsSmallPostData){
    // console.log(trendingNewsBigPostData) 
    const lastAddedEntry = trendingNewsSmallPostData[0];
    // console.log(lastAddedEntry);
    const entryId =lastAddedEntry.sys.id;
    const {articleImage,newsTitle, photoDescription, articleTime}=lastAddedEntry.fields;

    const{file} = articleImage.fields;
    const imgUrl =  file.url.substring(2)

    //checking if time is set by content creator or not
    const defaultTime = lastAddedEntry.sys.createdAt; //set by contentful
    if(articleTime==undefined){
      const date = defaultTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }
    else{
      const date = articleTime.slice(0, -12);
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }

    const mainStoryLink = document.querySelector('.main-story');
    const mainStoryImg = document.querySelector('.main-story-img');
    const trendingNewsBigPostTitle = document.querySelector('.trending-big-title');
    const timeStamp = document.querySelector('.time-stamp')

    mainStoryImg.src = `https://${imgUrl}`;
    mainStoryImg.alt = photoDescription;
    mainStoryLink.href =entryId;
    trendingNewsBigPostTitle.innerText = newsTitle;
    timeStamp.innerHTML =  `<span class="post-meta-data"><i class="fa-regular fa-clock"></i> ${reformattedDate} </span>` 
}

function updateTrendingSmallPosts(trendingNewsSmallPostData){

  trendingNewsSmallPostData.length = 5; //limiting how many posts get displayed on the home page
  const trendingSmallPosts = trendingNewsSmallPostData.map(data=>{
  

    const entryId = data.sys.id;

    const {newsTitle,articleImage,photoDescription,articleTime}=data.fields;
    
    //checking if time is set by content creator or not
    const defaultTime = data.sys.createdAt; //set by contentful
    if(articleTime==undefined){
      const date = defaultTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }
    else{
      const date = articleTime.slice(0, -12);
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }
    
   //getting image urls
   const{file} = articleImage.fields;
    const imgUrl =  file.url.substring(2);
    // creating HTML for small posts of sports in qatar section
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

  //remove element zero of small post data since it is already used @ function updateTrendingNewsBigPost()
   trendingSmallPosts.shift();
  //  console.log(updatedInnerHTML);=
   const smallTrendingNewsContainer = document.querySelector('.small-posts')
   smallTrendingNewsContainer.innerHTML = trendingSmallPosts.join("");;
}

function updateGeneralNews(generalNewsPostsData,generalNewsPostLinksData){
  generalNewsPostsData.length = 8; 
  generalNewsPostLinksData.length = 3; //limiting how many display on homepage

  const breakingNewsPosts = generalNewsPostLinksData.map(data=>{
    const entryId = data.sys.id;
    const {newsTitle,articleTime} = data.fields;

    //checking if time is set by content creator or not
    const defaultTime = data.sys.createdAt; //set by contentful
    if(articleTime==undefined){
      const date = defaultTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }
    else{
      const date = articleTime.slice(0, -12);
     var  reformattedDate = date.replace("-", " ").replace("-", " ")
    }
    
 
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

    //checking if time is set by content creator or not
      const defaultTime = data.sys.createdAt; //set by contentful
      if(articleTime==undefined){
        const date = defaultTime.slice(0, -12);
      // removing hyphens from dates eg 2022-12-20 to 2022 12 20
       var  reformattedDate = date.replace("-", " ").replace("-", " ")
      }
      else{
        const date = articleTime.slice(0, -12);
       var  reformattedDate = date.replace("-", " ").replace("-", " ")
      }
      
      return `<article class="general-news-post">
      <a href="${entryId}">
      <img src="https://${imgUrl}" alt="${photoDescription}" loading="lazy" class="general-news-img">
      <div class="txt">

      <div class="news-category">${newsCategory}</div>

       <h3 class="news-title">${newsTitle}</h3>
      <div class="time-stamp">
        <span class="post-meta-data"></span>
       <span><i class="fa-regular fa-clock"></i>
       </span> 
      </span> ${reformattedDate} </span> 
      </div>
      </div>
    </div>
    </a>
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
  moreNewsPostsData.length = 6; //limiting how many get displayed on home page
 const moreNewsPosts = moreNewsPostsData.map(data=>{
    const entryId = data.sys.id;
    const {newsTitle,articleImage, photoDescription, articleTime} =data.fields;

    const {file} = articleImage.fields;
    const imgUrl =  file.url.substring(2);

    return `
    <a href="${entryId}" class="small-post">
    <img src="https://${imgUrl}" loading="lazy" alt="${photoDescription}">
    <div class="description-txt">
      <h3>${newsTitle}</h3>
    </div>
  </a>
  `
  }).join("");
  const moreNewsPostsContainer = document.querySelector('.more-news-small-container');
  moreNewsPostsContainer.innerHTML = moreNewsPosts;
}
