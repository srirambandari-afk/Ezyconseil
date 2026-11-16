const rake = require ('rake-js').default


const getGliner = async () => {
    const { GLiNER1ONNXRuntime } = await import('@lmoe/gliner-onnx');

    const model = await GLiNER1ONNXRuntime.fromPretrained(
        'onnx-community/gliner_small-v2.1'
    );

      return model
};





const removeMetadata = (keywords, metadata) => {

    return keywords.filter(keyword =>
        !metadata.some(term =>
            keyword.toLowerCase().includes(term.toLowerCase().trim())
        )
    );
};









const extractKeywords = async(resumeText)=>{

     

const model = await getGliner()
    console.log("Model loaded!!!")

    const entities = await model.extractEntities(
        resumeText,
        [
        'person',
        'organization',
        'location',
        'area of expertise',
        'job title',
        'educational qualification',
        'software',
        'tools'
    ]
    );
    console.log("Text processing completed !!!")
    

   

    const metadata1 = entities.filter((item)=>['person','organization','location','job title','education qualification'].includes(item.label)).map((item)=>item.text)
    .flatMap((item)=> item.includes(",")? item.split(","):item)

    const skills = entities.filter((item)=>['area of expertise','software','tools'].includes(item.label)).map((item)=>item.text)
    
    
   
    const metadata = [...new Set(metadata1)]

   

    
   

  
  
    
 

    const keywords = rake(resumeText, {
    language: 'english'
});

const keywords1 = removeMetadata(keywords,metadata)

const keywords2 = [...new Set([...skills,...keywords1])]

const keywords3 = keywords2.map((keyword)=>keyword.toLowerCase().trim())

const uniqueKeywords = [...new Set(keywords3)]







return uniqueKeywords



}

module.exports = extractKeywords






