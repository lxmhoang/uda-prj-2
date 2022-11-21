import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

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