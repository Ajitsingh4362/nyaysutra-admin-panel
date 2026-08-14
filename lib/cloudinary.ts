import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(base64: string, folder = 'nyayasutra') {
  const result = await cloudinary.uploader.upload(base64, { folder, resource_type: 'image' });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function uploadFile(base64: string, folder = 'nyayasutra/files') {
  // resource_type 'raw' handles PDFs and other non-image/video files on Cloudinary.
  const result = await cloudinary.uploader.upload(base64, { folder, resource_type: 'raw' });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
