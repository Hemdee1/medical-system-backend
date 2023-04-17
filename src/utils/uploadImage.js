import cloud from "cloudinary";

const cloudinary = cloud.v2;

const uploadImage = async (id, img) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    const res = await cloudinary.uploader.upload(img, {
      folder: "medical-system",
      public_id: id,
      width: 1000,
      crop: "scale",
      quality: "auto",
      fetch_format: "auto",
    });

    return res.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default uploadImage;
