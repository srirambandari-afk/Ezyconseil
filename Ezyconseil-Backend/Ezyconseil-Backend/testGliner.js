const testGliner = async () => {
    const { GLiNER1ONNXRuntime } = await import('@lmoe/gliner-onnx');

    const model = await GLiNER1ONNXRuntime.fromPretrained(
        'onnx-community/gliner_small-v2.1'
    );

    const entities = await model.extractEntities(
        'John works at Google in Seattle',
        ['person', 'organization', 'location']
    );

    console.log("GLiNER1 model loaded!!!");
    console.log("Entities", entities);
};

testGliner();