const contentful = require('contentful')

const express = require('express');
const ejs = require('ejs')
const app = express();
app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

const port = 2000;
const myRoute = "abc";
const allIdsArray = []
  
app.listen(port, ()=>{
    console.log("app listening on " + port);
})

app.get('/', (req,res)=>{
  res.render('index');
})

const getContentTypeData = async ()=>{
    const client = await contentful.createClient({
        space: "e267q19fd4xy",
        accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
      });

 //getting richtext test data   
 const testData = await client.getEntries()
 .then((entries)=>{
   const entryItems = entries.items;
//   entryItems.forEach(item=>{
//     console.log(item.fields.newsTitle)
//   })
entryItems.forEach(entry=>{
    const eachEntryId = entry.sys.id;
    // console.log(eachEntryId)
    allIdsArray.push(eachEntryId)
  })
 })
 
 getEntryIds(client);
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
// generateArticleData();
