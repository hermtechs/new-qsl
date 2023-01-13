const contentful = require('contentful')

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
  res.render('index');
})

//rendering browse page
app.get('/browse', (req,res)=>{
  res.render('browse');
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

    if(articleTime != undefined){
    var date = articleTime.slice(0, -12);
    }
    else{
    var date = ""
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
    console.log(sampleTitle[0].title);
  })
}
