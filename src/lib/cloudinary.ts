import 'dotenv/config';
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({ 
  cloud_name: 'facu-ar-apx', 
  api_key: process.env.CLODUINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export {
  cloudinary
}