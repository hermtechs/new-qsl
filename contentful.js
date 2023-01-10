const client = contentful.createClient({
    space: "e267q19fd4xy",
    accessToken: "4eFLDDjjLb4BZr_S9mrpPngIABB40pC9OFgkYiVFKzI"
  });
  const testData = client.getEntry("cZT1Cn4HehmjClKPCadQR");
  testData.then(response=>{
    // console.log(response)
    let options = {
        // for (const node of links.entries.block) {
        //     entryMap.set(entry.sys.id, entry);
        //   }
        renderNode: {
          'embedded-asset-block': (node) =>
            // console.log(node)
            `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.description}" class="main-img"/>`
        }
      }
    console.log(options)   
    //   let bodyHTML = body ? documentToHtmlString(body, options) : ''
    const rawRichTextField = response.fields.mainContentIeHeadingsAndParagraphs;
    console.log(rawRichTextField)
    return documentToHtmlString(rawRichTextField,options);
  })
  .then(renderedHTML=>{
    // console.log(renderedHTML)
    const articleBodyContainer = document.querySelector('#rich-text-body');
    articleBodyContainer.innerHTML = renderedHTML;
  })
