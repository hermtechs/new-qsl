
// async function getDataFromContentful(){
// const client = await contentful.createClient({
//     // This is the space ID. A space is like a project folder in Contentful terms
//     space: "e267q19fd4xy",
//     // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//     accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
//   });
// //   console.log(client);
//   client.getEntries().then((response)=>{
//     // console.log(response.items)
//     const allItemsInContentful = response.items;
//     console.log(allItemsInContentful)
//     const topStoryHeading = document.querySelector('.story-for-day-heading');
//     const topStoryCategory = document.querySelector('.category-txt');
//     const header = document.querySelector('header');
//     const imgUrl = allItemsInContentful[0].fields.topStoryImage.fields.file.url;
//     const newImgUrl = imgUrl.substring(2)
//     console.log(newImgUrl)
//     header.style.background = `url('https://${newImgUrl}')`

//   })
// }
// getDataFromContentful();
const getRichTextFromContentful = async ()=>{
  
  const client = await contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "e267q19fd4xy",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
  });
  const testData = await client.getEntries({content_type:"testBodyTxt"})
    .then(response=>{
      const rawRichTextField = response;
          return documentToHtmlString(rawRichTextField);
          return rawRichTextField;
    })
    // .then()
   console.log(testData)   

}

getRichTextFromContentful()