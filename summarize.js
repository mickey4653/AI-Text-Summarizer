//load secret file
require('dotenv').config();

// const secretKey = 

// Axios is the framework we will be using to calling the API
const axios = require('axios');
// This is the function where the call to the API is made. Returns the summarized text as a string.
summarizeText = async (text) => {
  
  try{
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });


  // log the request data before making the request
  console.log('Request Data:', data);


// A config object that will contain the instructions for the API call
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+ process.env.ACCESS_TOKEN
    },
    data : data
  };

// Capture the request in a try/catch to check for any errors that may occur
    // try {
    //   const response = await axios.request(config);
    //   console.log('Summarized Text:', response.data[0].summary_text);
    //   return response.data[0].summary_text;
    // }

       // Log the Axios request config before making the request
       console.log('Axios Request Config:', config);

      const response = await axios.request(config);

      // Log the summarized text before returning it
      const summarizedText = response.data[0].summary_text;
      console.log('Raw Summarized Text:', summarizedText);
  
//check for special characters and log them
const specialChars = findSpecialCharacters(summarizedText);
if(specialChars.length > 0){
  console.log('Special Characters Found:', specialChars);
}

      // Return the summarized text directly
      return summarizedText;
    
    // catch (error) {
    //   console.log("Error in summarizing text", error);
    //   throw error;
    // }
}catch (error) {
     console.log(error);
     // Rethrow the error to be caught by the server
      throw error;
    }
  }

//Function to find special characters in a string
function findSpecialCharacters(text){
  const specialCharsRegex = /[^a-zA-Z0-9\s]/g;
  const matches = text.match(specialCharsRegex);
  return matches || [];
}





// Allows for summarizeText() to be called outside of this file
module.exports = summarizeText;