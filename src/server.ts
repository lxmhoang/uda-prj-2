import express from 'express';
import bodyParser from 'body-parser';
import {path} from "path";
import http from 'http'
import https from 'https'
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { s3 } from './util/aws';
import { rejects } from 'assert';
import { AnyLengthString } from 'aws-sdk/clients/comprehend';
import AWS from 'aws-sdk';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULDgit
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  var fs = require('fs'), http = require('http'), https = require('https');  

   
  function downloadImage(url : String, filePath: String) {
    var client = http;
    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);   
     

      const request = client.get( url, function(response: any)  {
        if (response.statusCode !== 200) {
          fs.unlink(filePath, () => {
            reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          });
          return;
        }
  
        // fileInfo = {
        //   mime: response.headers['content-type'],
        //   size: parseInt(response.headers['content-length'], 10),
        // };
  
        response.pipe(file);
      
      });
      // The destination stream is ended by the time it's called
       file.on('finish', () => resolve(filePath));

       request.on('error', err => {
         fs.unlink(filePath, () => reject(err));
       });

      file.on('error', err => {
        fs.unlink(filePath, () => reject(err));
      });

      request.end();
    });
    
   
    
  };
  
  // Root Endpoint
  // Displays a simple message to the user
  app.use('/img', express.static('src/util/tmp'));
  app.get( "/filteredimage", async ( req, res ) => {

    filterImageFromURL(req.query.image_url).then((filePath) => {
      var path = require("path");
      const filename = path.parse(filePath).base;
      // const filteredURL = req.headers.host.concat("/img/").concat(filename);
      const filteredURL = "img/".concat(filename);
      console.log(filename);
  
      console.log(filteredURL);
      res.send(`<img src="${filteredURL}" >`);


    }).catch((e) => {
      console.error(e);
     });

    
  } );

  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();