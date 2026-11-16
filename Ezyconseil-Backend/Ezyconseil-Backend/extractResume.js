const fs = require('fs')
const {PDFParse} = require('pdf-parse')
const mammoth = require('mammoth')


const extractResume = async (filePath) => {

 

  if (filePath.endsWith('.pdf')) {

    const buffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buffer });

   const result = await parser.getText();

   await parser.destroy();

    return result.text;
  }

  if (filePath.endsWith('.docx')) {

    const result = await mammoth.extractRawText({
      path: filePath
    });

    return result.value;
  }

  throw new Error('Unsupported resume format');
};

module.exports =  extractResume;