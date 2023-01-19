const contentful = require('contentful')
const ColorThief = require('colorthief');
// console.log(ColorThief);

const express = require('express');
const ejs = require('ejs');
const { response } = require('express');
const app = express();
app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

const port = process.env.PORT || 2000

const allIdsArray = []
  
app.listen(port, ()=>{
    console.log("app listening on " + port);
})

//rendering homepage 
app.get('/', (req,res)=>{

  //RENDER LANDING PAGE(HERO SECTION) DATA FROM THE SERVER
  
  async function getLandingPageData(){

    const client = await contentful.createClient({
      space: "e267q19fd4xy",
      accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
    });

    const landingPageData = await client.getEntries({content_type:'sports2dayLandingPage'})
    .then(entries=>{
     const lastAddedEntry =entries.items[0];
    //  console.log(lastAddedEntry) 
    const{articleImage,newsTitle,photoDescription,newsCategory}=lastAddedEntry.fields
    const entryId = lastAddedEntry.sys.id;

    if(articleImage !=undefined){
      var {file} = articleImage.fields;
      var imgUrl =  file.url.substring(2);
    }
    else{
      var imgUrl = "no-image-available"
    }

    //getting image colors with colorThief
   ColorThief.getColor(`https://${imgUrl}`,[, 10])
        .then(color => {  
          var dominantImgColor = `rgb(${color.toString()})`;
  res.render('index',{imgUrl,newsTitle,photoDescription,newsCategory,entryId, dominantImgColor})

      })
        .catch(err => { console.log(err) })
        
    })
  }
  getLandingPageData()

})

//initializing contentful
const getContentTypeData = async ()=>{
    const client = await contentful.createClient({
        space: "e267q19fd4xy",
        accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
      });

 //getting all entries in our contentful CMS and then getting each entry ID
 const allEntries = await client.getEntries()
 .then((entries)=>{
   const entryItems = entries.items;
entryItems.forEach(entry=>{
    const eachEntryId = entry.sys.id;
    allIdsArray.push(eachEntryId)
  })
 })
 

 getEntryIds(client);
 getAllArticles(client);
}


getContentTypeData();

function getEntryIds(client){

  let routes = [...allIdsArray];
  routes.forEach(route => {
    app.get(`/${route}`, (req, res, next)=>{
    //   res.send(route);
   client.getEntry(route).then(entry=>{
   const {newsTitle,articleImage,articleTime}=entry.fields;

    if(articleImage !=undefined){
    var {file} = articleImage.fields;
    var imgUrl =  file.url.substring(2);
    var{photoDescription}= entry.fields
  }
  else{
    var imgUrl = "no-image-available"
  }

  const defaultTime = entry.sys.createdAt; //set by contentful

  // checking if content creator entered date and time
    if(articleTime == undefined){
    var date = defaultTime.slice(0, -14);
    }
    else{
      var date = articleTime.slice(0, -12);
    }

    // send data to frontend via view engine
    res.render('article' ,{newsTitle,imgUrl, photoDescription, date, route})
    })
    });
    return;
  })
}

async function getAllArticles(client){
 const allEntries = await client.getEntries()
  .then(entry=>{
    // console.log(entry.items);
    const entryItems = entry.items;
   const sampleTitle = entryItems.map(eachEntryItem=>{
      return{
        title:eachEntryItem.fields.newsTitle
      }
    })
    // console.log(sampleTitle[0].title);
  })
}

//rendering browse page
app.get('/browse', (req,res)=>{

  res.render('browse');

})

async function getCategory(){
  const client = await contentful.createClient({
    space: "e267q19fd4xy",
    accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
  });
const allEntries = await client.getEntries()
.then(entry=>{
  const entryItems = entry.items
  // const {newsCategory}=entryItems[0].fields
  // const newsCategory = entryItems.fields.newsCategory;
  // console.log(entryItemsFields);
//   const footballNews = entryItems.find(entryItems.fields.newsCategory=="football");
//   console.log(footballNews);
//  console.log(newsCategory);
const testIt = entryItems.find(element=>element.fields.newsCategory=="tennis");
console.log(testIt);
})

}
getCategory()