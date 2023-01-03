const contentful = require('contentful')
const express = require('express');
const app = express();
const port = 2000;
const myRoute = "abc";
const allIdsArray = []
// const routes = [
//     "contact",
//     "product",
//     "product/demo-product", 
//     "product/request-product"
//   ]
  
app.listen(port, ()=>{
    console.log("app listening on " + port);
})

app.get(`/${myRoute}`,getRequestCallBack)

// const id = "6bNUyWTODKBs1U6q6SZrog"
function getRequestCallBack(req, res){ 
    res.send("greet Richard");
}

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

// allIdsArray.forEach(id=>client.getEntry(id).then(entry=>{
//     // console.log((entry.fields.newsTitle)
//     console.log(id)
//     const {newsTitle,articleImage,photoDescription,articleTime}=entry.fields;
//     // console.log(articleImage)
//   }))


  let routes = [...allIdsArray];
  routes.forEach(route => {
    app.get(`/${route}`, (req, res, next)=>{
    //   res.send(route);
   client.getEntry(route).then(entry=>{
   const {newsTitle,articleImage,photoDescription,articleTime}=entry.fields; 
    // const title = entry.fields.newsTitle;
    res.send(`<h1>${newsTitle}</h1>`);
    })
    });
    return;
  })

}


// generateArticleData();