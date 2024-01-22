// console.log("Hello World! Testing Node JS.x ");

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;

const summarizeText = require('./summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());


// Log all incoming requests
app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    //Set content type to JSON
    res.setHeader('content-Type', 'application/json');
    next();
  });

// Serves static files from the 'public' directory
app.use(express.static('public'));

//POST Request
// Handle POST requests to the '/summarize' endpoint

app.post('/summarize', (req, res) => {
    console.log('Handling POST request to /summarize');
// try{
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

//log the raw request body
console.log('Raw Request Body:', req.body);  

console.log('Received Text:', text);

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then(response => {
        console.log('Summarized Text:', response);
      res.send(response); // Send the summary text as a response to the client
    }) 
.catch(err => {
    console.log(err);// log full error message
    res.status(500).send('Internal Server Error'); // send a generic error response
  });
});

//   // call your summarizeText function, passing in the text from the request
// const summary = await summarizeText(text);

// console.log('Summarized Text', summary);

// // Send the summary text as a response to the client
// res.json({ summary }); // Ensure that the response is in valid JSON format
// }catch(err) {
//     console.error(err);// log full error message
//     res.status(500).send({error: 'Internal Server Error'}); // send a generic error response
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

