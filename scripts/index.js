const navBtn = document.querySelector('.humburger');
const smallScreenMenu = document.querySelector('.small-screen-menu');
const closeSideMenuBtn = document.querySelector('.close-menu');
const logo = document.querySelector('.logo-side-bar') //applies only to homepage
const storyOfTheDayTitle = document.querySelector('.story-for-day-heading');
const header = document.querySelector('header');

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

//fetching main post data
const mainPostData = await client.getEntries({content_type:"mainContentTrendingBigPost"})
 //getting landingPageData   

 const testData = await client.getEntries({content_type:"testBodyTxt"})
    .then(response=>{return response.items})
 
 //updating UI
//  createPost(mainPostData)
updateLandingPage(landingPageData); 
updateTrendingNewsBigPost(trendingNewsBigPostData);
updateTrendingSmallPosts(trendingNewsSmallPostData)
updateGeneralNews(generalNewsPostsData,generalNewsPostLinksData);
updateMoreNews(moreNewsPostsData);

createLink(testData)
}

getContentTypeData();

function updateLandingPage(landingPageData){
    // console.log(landingPageData);
   const {topStoryHeading,topStoryImage,topStoryCategory}=landingPageData[0].fields;
   
   //image
   const{title, description, file} = topStoryImage.fields;
   const topStoryImgUrl =  file.url.substring(2)
   header.style.background = `url('https://${topStoryImgUrl}')`
   //heading
//    console.log(topStoryCategory);
   //news category
   const storyOfTheDayCategory = document.querySelector('.story-category');
   storyOfTheDayTitle.innerText = topStoryHeading; 
   storyOfTheDayCategory.innerText = topStoryCategory;
}

function updateTrendingNewsBigPost(trendingNewsBigPostData){
    // console.log(trendingNewsBigPostData) 
    const lastAddedEntry = trendingNewsBigPostData[trendingNewsBigPostData.length-1];
    // console.log(lastAddedEntry);
    const {image,title,shortDescription}=lastAddedEntry.fields;

    const{file} = image.fields;
    const imgUrl =  file.url.substring(2)

    const trendingNewsBigPostTitle = document.querySelector('.trending-big-title');
    const shortDescriptionElement = document.querySelector('.trending-short-description')
    const trendingNewsContainer = document.querySelector('.top-story-big');

    trendingNewsBigPostTitle.innerText = title;
    shortDescriptionElement.innerText = shortDescription;
    trendingNewsContainer.style.background = `url('https://${imgUrl}'),radial-gradient(#d6d6d6, #4e053e)`;
}

function updateTrendingSmallPosts(trendingNewsSmallPostData){
  const trendingSmallPosts = trendingNewsSmallPostData.map(data=>{
    // console.log(data)
    const {articleTitle,articleImage,photoDescription,articleTime}=data.fields;

    const date = articleTime.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
   const  reformattedDate = date.replace("-", " ").replace("-", " ")
   
   //getting image urls
   const{file} = articleImage.fields;
    const imgUrl =  file.url.substring(2);
    // creating HTML for small posts under trending news
    return `
    <a href="news-articles/latin-america-fans.html" class="small-post sharable-link">
    <img src="https://${imgUrl}" alt="${photoDescription}">
    <div class="description-txt-small">
      <p>${articleTitle}  </p>
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
    const {newsTitle,dateOfPublication} = data.fields;
    const date = dateOfPublication.slice(0, -12);
    // removing hyphens from dates eg 2022-12-20 to 2022 12 20
   const  reformattedDate = date.replace("-", " ").replace("-", " ") 
    return `
    <div class="breaking-news-post">
    <a href="#">
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
    const {newsTitle,newsPostImage,newsCategory,publicationDate,photoDescription}=data.fields;
      const {file} = newsPostImage.fields;
      const imgUrl =  file.url.substring(2);
      const date = publicationDate.slice(0, -12);
      // removing hyphens from dates eg 2022-12-20 to 2022 12 20
     const  reformattedDate = date.replace("-", " ").replace("-", " ") 
    //  console.log(data.sys.id)

      return `<article class="general-news-post">
      <img src="https://${imgUrl}" alt="${photoDescription}" class="general-news-img">
      <div class="txt">
      <span class="news-category">${newsCategory}</span>
      <a href="#"> <h3 class="news-title">${newsTitle}</h3> </a>
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
    const {newsTitle,newsImage, photoDescription} =data.fields;
    const {file} = newsImage.fields;
    const imgUrl =  file.url.substring(2);
    return `
    <a href="/localhost:3000/testBodyTxt" class="small-post">
    <img src="http://${imgUrl}" alt="${photoDescription}">
    <div class="description-txt">
      <h3>${newsTitle}</h3>
    </div>
  </a>
  `
  }).join("");
  const moreNewsPostsContainer = document.querySelector('.more-news-small-container');
  moreNewsPostsContainer.innerHTML = moreNewsPosts;
}
// function createPost(mainPostData){
//   console.log(mainPostData)
//   // console.log(mainPostData[0].sys.id)
// }

function createLink(testData){
  // console.log(testData)
  const contentTypeId = testData[0].sys.contentType.sys.id;
  // console.log(contentTypeId);
  const{mainContentIeHeadingsAndParagraphs}=testData[0].fields;
  // console.log(mainContentIeHeadingsAndParagraphs)
  const allContentFiels = mainContentIeHeadingsAndParagraphs.content;
  console.log(allContentFiels)
  // console.log(allContentFiels[0].nodeType)
  // allContentFiels.find(fiels=>console.log(fiels.nodeType == "heading-1"))
  const gotH1 = (fiels)=>{
    return fiels.nodeType == "heading-1"
  }
  const x = allContentFiels.find(gotH1).content[0].value;
  const html = `<h1>${x}</h1>`
  console.log(html)
  console.log(x)
  // const gotP = allContentFiels.find((fiels)=>{fiels.nodeType == "paragraph"})
  const checkP = (fiels)=>{
    return fiels.nodeType == "paragraph"
  }
  const gotP = allContentFiels.find(checkP).content[0]
  console.log(gotP)
  joinContentWithTag(tag,content)
}

function joinContentWithTag(tag,content){
  
}