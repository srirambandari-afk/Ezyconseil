const nlp = require('compromise');




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


    const { pipeline } = await import('@huggingface/transformers');

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



const strength = filteredComparisons.length > 10?  totalFilters/filtered1Comparisons.length:0

const result = { isMatch , strength}


return result 
}

const cosineSimilarity = (vectorA, vectorB) => {

    return vectorA.reduce((sum, value, index) => {
        return sum + value * vectorB[index];
    }, 0);

};


module.exports = {extractPhrase,pipeline1}


