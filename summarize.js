// load secret file
require('dotenv').config();

// Axios is the framework we will be using to call the API
const axios = require('axios');

// Function to find special characters in a string
function findSpecialCharacters(text) {
  const specialCharsRegex = /[^a-zA-Z0-9\s]/g;
  const matches = text.match(specialCharsRegex);
  return matches || [];
}

// This is the function where the call to the API is made. Returns the summarized text as a string.
const summarizeText = async (text) => {
  try {
    let data = JSON.stringify({
      "inputs": text,
      "parameters": {
        "max_length": 100,
        "min_length": 30
      }
    });

    // Log the request data before making the request
    console.log('Request Data:', data);

    // A config object that will contain the instructions for the API call
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
      },
      responseType: 'json', // explicitly setting response
      data: data
    };

    // Log the Axios request config before making the request
    console.log('Axios Request Config:', config);

    const response = await axios.request(config);

    // Log the summarized text before returning it
    const summarizedText = response.data[0].summary_text;
    console.log('Raw Summarized Text:', summarizedText);

    // Check for special characters and log them
    const specialChars = findSpecialCharacters(summarizedText);
    if (specialChars.length > 0) {
      console.log('Special Characters Found:', specialChars);

      // Replace special characters in the summarized text
      const sanitizedText = summarizedText.replace(/[^a-zA-Z0-9\s]/g, '');

      console.log('Sanitized Text:', sanitizedText);

      // Return the sanitized text directly
      return sanitizedText;
    }

    // Return the summarized text directly
    return summarizedText;
  } catch (error) {
    console.error('Error in summarizing text:', error);

    // Rethrow the error to be caught by the server
    throw error;
  }
};

// Allows for summarizeText() to be called outside of this file
module.exports = summarizeText;
