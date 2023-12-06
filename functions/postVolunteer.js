// could always just return the jsondata and then parse?

// adding counts to sections

require('dotenv').config();
const querystring = require('querystring');
// import fetch from 'node-fetch';
const fetch = require('node-fetch')
const { Headers } = fetch;


exports.handler = async (event) => {

    const form = querystring.parse(event.body);

    let interests = [];
    console.log(form);


for (const key in form) {
    if (form[key] == "on") {
        interests.push(key);
    }
  }

  console.log(interests);

    // for (let i = 0; i < form.length; i++) {
    //     console.log(form[i]);
    //     // if (form[i] == "on") {
    //     //     interests.push(form[i]);
    //     // }
    // }

    let records = {
        "records": [
          {
            "fields": {
              "email": form.email,
            //   "interests": JSON?.stringify(interests),
              "location": form.location,
              "details": form.details,
            }
          }
        ]
      }

    console.log(records);

    if (event.path != "/favicon.ico") {
        const response = await fetch(`https://docs.getgrist.com/api/docs/${process.env.GRIST_DOCUMENT_ID}/tables/Table1/records`, { 
            method: 'POST',
            body: JSON.stringify(records), 
            headers: new Headers({
                'Authorization': `Bearer ${process.env.GRIST_API_KEY}`,
                "Content-Type": "application/json"
            })
        });
                
        const res = await response.json();
        console.log(res);

        let success = `<p style="color: #007ec9; font-weight: 700; margin-top: 19px;">RSVP successful! Now share with others and invite them to join!</p>`;

          return {
            statusCode: 200,
            headers: {
                'Content-type': 'text/html; charset=UTF-8',
              },
              body: success,
            }
    }
}