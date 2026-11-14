const rake = require ('rake-js').default
const natural = require('natural');
const nlp = require('compromise');
const { pipeline } =require('@huggingface/transformers');
const fs = require('fs');


const removeMetadata = (keywords, metadata) => {

    return keywords.filter(keyword =>
        !metadata.some(term =>
            keyword.toLowerCase().includes(term.toLowerCase().trim())
        )
    );
};

const getGliner = async () => {
    const { GLiNER1ONNXRuntime } = await import('@lmoe/gliner-onnx');

    const model = await GLiNER1ONNXRuntime.fromPretrained(
        'onnx-community/gliner_small-v2.1'
    );

      return model
};

const extractKeywords = async(resumeText)=>{

     
const model = await getGliner()
    console.log("Model loaded!!!")
    console.log("Text is being processed!!!")

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


// uniqueKeywords.forEach((keyword,index) => {
//     console.log(index+1,keyword);
// });






const phrases = extractPhrase(projectDescription)

// console.log("Project Description Phrases:",phrases)


pipeline1(uniqueKeywords,phrases)








 }


const resumeText ="SHIVANG AHUJA\nSenior Animation Specialist\nSAMPLE RESUME\nEmail: shivang.ahuja@example.com | Phone: +91 98765 43210 | Location: Mumbai, India\nPROFESSIONAL SUMMARY\nCreative and results-driven Animation Specialist with 13 years of experience in 2D and 3D animation, motion graphics,\nvisual storytelling, and digital content production. Experienced in managing animation projects from concept development\nthrough final delivery, collaborating with creative teams, and delivering high-quality visual experiences across multiple\nplatforms.\nCORE EXPERTISE\n2D Animation • 3D Animation • Motion Graphics • Character Animation\nVisual Effects (VFX) • Storyboarding & Concept Development\nAdobe After Effects • Autodesk Maya • Blender • Adobe Animate\nPROFESSIONAL EXPERIENCE\nSenior Animation Specialist | Creative Vision Studios, Mumbai, India\nJanuary 2018 – Present\n• Lead animation projects for commercial, entertainment, and digital media clients.\n• Develop storyboards, animation concepts, and visual narratives.\n• Create 2D and 3D animated content for multiple platforms.\n• Collaborate with designers, illustrators, and video production teams.\n• Review animation output and ensure quality standards are maintained.\n3D Animation Artist | PixelCraft Media, Pune, India\nJune 2013 – December 2017\n• Produced 3D character animations and product visualizations.\n• Developed motion graphics for advertising and promotional campaigns.\n• Worked with creative directors to translate concepts into visual content.\n• Optimized animation workflows to improve production efficiency.\nJunior Animator | Digital Frames Studio, Mumbai, India\nJune 2011 – May 2013\n• Assisted in creating 2D animations and motion graphics.\n• Supported storyboard development and character design.\n• Prepared animation assets for final production.\nEDUCATION\nBachelor of Fine Arts (BFA) – Applied Arts\nUniversity of Mumbai | 2011\nTECHNICAL SKILLS\nAdobe After Effects • Adobe Photoshop • Adobe Illustrator • Autodesk Maya • Blender • Adobe Premiere Pro\n• Adobe Animate\nLANGUAGES\nEnglish • Hindi\n\n-- 1 of 1 --\n\n"
const projectDescription = `# 3D Animation and Motion Graphics Project

The project involves developing high-quality 2D and 3D animated videos for marketing campaigns, product promotions, corporate presentations, and digital media platforms.

The animation team is responsible for creating storyboards, developing visual concepts, designing characters, and producing animated sequences based on client requirements.

The project includes 3D modeling, texturing, rigging, lighting, character animation, and rendering to produce visually engaging content.

The team uses animation software and digital design tools to create motion graphics, visual effects, and promotional videos.

Responsibilities include editing animation sequences, synchronizing audio and visual elements, creating transitions, and optimizing rendered videos for different digital platforms.

The project also requires collaboration with creative directors, graphic designers, video editors, and marketing teams to ensure that the final animation meets creative expectations and project timelines.

The objective is to deliver compelling animated content that communicates ideas effectively, enhances brand engagement, and supports digital marketing initiatives.`



const extractPhrase = (projectDescription)=>{

    const doc = nlp(projectDescription);

const projectPhrases = doc.nouns().out('array');

// cleaning the phrases 

const cleanedProjectPhrases = projectPhrases.map(phrase =>
    phrase.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '').trim()
);






return cleanedProjectPhrases
}




const pipeline1 = async(resumeKeywords,phrases)=>{

    const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
);





const resumeOutput = await extractor(
    resumeKeywords,
    { pooling: 'mean', normalize: true }
);

const output = await extractor(
    phrases,
    { pooling: 'mean', normalize: true }
);
const resumeVectors = resumeOutput.tolist();
const projectVectors = output.tolist();

const comparisons = [];

for (let i = 0; i < resumeVectors.length; i++) {

    for (let j = 0; j < projectVectors.length; j++) {

        const similarity = cosineSimilarity(
            resumeVectors[i],
            projectVectors[j]
        );

        comparisons.push({
            resumePhrase: resumeKeywords[i],
            projectPhrase: phrases[j],
            similarity: similarity
        });
    }
}

const filteredComparisons = comparisons.filter((item)=>item.similarity >= 0.50)

const isMatch = filteredComparisons.length > 10


const filtered1Comparisons = filteredComparisons.filter((item)=> item.similarity >= 0.60)

const totalFilters = filtered1Comparisons.map((item)=>item.similarity).reduce((sum,value)=>{return sum + value},0)



const strength = totalFilters/filtered1Comparisons.length
.
console.log("Profile Strength",strength)
console.log("Profile Match is:",isMatch)




// const csv = [
//     ['Resume Phrase', 'Project Phrase', 'Similarity'].join(','),

//     ...filteredComparisons.map(item =>
//         [
//             item.resumePhrase,
//             item.projectPhrase,
//             item.similarity
//         ]
//         .map(value => `"${String(value).replace(/"/g, '""')}"`)
//         .join(',')
//     )
// ].join('\n');

// fs.writeFileSync('SinglePageResume.csv', csv, 'utf8');

// console.log('CSV file downloaded successfully');












// console.log("Phrase comparisons",comparisons);
const similarity = cosineSimilarity(resumeVectors[0],projectVectors[0])
// console.log(output.tolist().length);
// console.log(resumeOutput.tolist().length);
console.log("cosine similarity:",similarity)



}

const cosineSimilarity = (vectorA, vectorB) => {

    return vectorA.reduce((sum, value, index) => {
        return sum + value * vectorB[index];
    }, 0);

};


extractKeywords(resumeText)


