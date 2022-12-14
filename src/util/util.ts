import fs, { PathLike } from "fs";
import Jimp = require("jimp");
import axios = require("axios");
const path = require("path");
const {dirname} = require("path");
export const imgPath = dirname(require.main.filename)  + "/tmp/filtered/" ;

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  console.log("input URL : " + inputURL);
  return new Promise(async (resolve, reject) => {
    try {

      const photo = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      .then(function ({data: imageBuffer}) {
        return Jimp.read(imageBuffer)
      })

      
      cleanDir(imgPath);
      const outpath =
      imgPath + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write( outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}


export async function cleanDir(dir: string) {
  if (!fs.existsSync(dir)) 
  { return ;}
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
      });
    }
  });
} 

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
