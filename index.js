const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const summarizeText = require('./summarize.js');

app.use(express.json());

app.use(express.static('public'));
// app.use(express.static('public', { 'extensions': ['html'] }));


app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    res.setHeader('Content-Type', 'application/json');
    next();
});



app.post('/summarize', async (req, res) => {
    console.log('Handling POST request to /summarize');

    try {
        const text = req.body.text_to_summarize;
        console.log('Raw Request Body:', req.body);
        console.log('Received Text:', text);

        const response = await summarizeText(text);
        console.log("Raw Response:", JSON.stringify(response));

      return  res.status(200).json({ summary: response });
    } catch (error) {
        console.error(error);
       return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
