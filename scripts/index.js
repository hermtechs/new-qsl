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

const getContentTypeData = async (contentTypeId)=>{
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
const breakingNewsPosts = await client.getEntries({content_type:"sports2dayBreakingNews"})
       .then(response=>{return response.items}) 


 //updating UI
updateLandingPage(landingPageData); 
updateTrendingNewsBigPost(trendingNewsBigPostData);
updateTrendingSmallPosts(trendingNewsSmallPostData)
updateGeneralNews(generalNewsPostsData,breakingNewsPosts);
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

function updateGeneralNews(generalNewsPostsData,breakingNewsPosts){
    // console.log(generalNewsPostsData);
    // console.log(breakingNewsPosts)
    // const {newsTitle,newsPostImage,newsCategory}=generalNewsPostsData.fields;
    // console.log(newsTitle)
    generalNewsPostsData.map(data=>{
     console.log(data)       
    const {newsTitle,newsPostImage,newsCategory}=data.fields;
    //   console.log()  
      const {file} = newsPostImage.fields;
      const imgUrl =  file.url.substring(2);
      console.log(newsTitle);
      console.log(newsCategory)
    })

}