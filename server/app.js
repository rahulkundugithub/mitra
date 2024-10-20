const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

const port = 5000;
const apikey = 'AIzaSyCboOuKo-txMN1D8vdaz2lVj6NharUCXFQ';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`;

app.post('/api/chat', async (req, res) => {
    try { 
      const { message, history } = req.body;

      const data = {
        contents: [
          {
            parts: [
              { text: message  }
            ]
          }
        ]
      };
  
      const response = await axios.post(
        API_URL,data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    //   console.log("---------------------->>>>>>>>>>>>>>>",response.data.candidates[0].content.parts[0].text);
      
      res.json(response.data.candidates[0].content.parts[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong with the Gemini API');
    }
  }); 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });