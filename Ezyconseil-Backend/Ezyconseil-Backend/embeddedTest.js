const { pipeline } =require('@huggingface/transformers');


const pipeline1 = async()=>{

    const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
);

const phrases = [
    '3D Animated Promotional Video',
    'visual effects',
    'animation specialist',
    '2d and 3d animation'
];

const resumeKeywords = [
    '2d and 3d animation',
 'motion graphics',
 'visual storytelling',
 'digital content production',
 '2d animation',
 'adobe after effects',
 'autodesk maya',
 'blender',
 'adobe animate',
'adobe photoshop'
]

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
const similarity = cosineSimilarity(resumeVectors[0],projectVectors[0])
console.log(output.tolist().length);
console.log(resumeOutput.tolist().length);
console.log("cosine similarity",similarity)

}

pipeline1()


const cosineSimilarity = (vectorA, vectorB) => {

    return vectorA.reduce((sum, value, index) => {
        return sum + value * vectorB[index];
    }, 0);

};

