const contentful = require('contentful')
const express = require('express');
const app = express();
const port = 2000;
const myRoute = "abc";

app.listen(port, ()=>{
    console.log("app listening on " + port);
})

app.get(`/${myRoute}`,getRequestCallBack)

// const id = "6bNUyWTODKBs1U6q6SZrog"
function getRequestCallBack(req, res){ 
    res.send("greet Richard");
}

// const getAllEntriesFromCMS = async ()=>{
//     const client = contentful.createClient({
//         space: 'e267q19fd4xy',
//         environment: 'master', // defaults to 'master' if not set
//         accessToken: 'UI6DywLCj1HX2jXeB2as-yEg2SRNh-NBJjf0UuB9-cQ'
//       })
//         client.getEntries({content_type:"testBodyTxt"})
// .then((entry) => console.log(entry))
// .catch(console.error)
// }

// getAllEntriesFromCMS();

const getContentTypeData = async ()=>{
    const client = await contentful.createClient({
        space: "e267q19fd4xy",
        accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
      });

 //getting richtext test data   
 const testData = await client.getEntries({content_type:"testBodyTxt"})
    .then(response=>{return response.items})
   console.log(testData)   
}
getContentTypeData();