import axios from "axios";

export async function uploadToCloudinary({ asset }) {
  try {
    const file = {
      uri: asset.localUri,
      type: asset.mediaType,
      name: asset.filename,
    };

    const url = "https://api.cloudinary.com/v1_1/howisthesurf/upload";
    const data = new FormData();

    data.append("upload_preset", "good_quality");
    data.append("file", {
      uri: file.uri,
      type: "image/jpeg",
      name: file.name,
    });

    const { data: cloudinaryData } = await axios.post(url, data);
    console.log("cloudinaryData!", cloudinaryData);
    return cloudinaryData;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
