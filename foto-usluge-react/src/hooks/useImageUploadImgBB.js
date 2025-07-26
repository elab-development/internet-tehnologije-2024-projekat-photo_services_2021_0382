// src/hooks/useImageUploadImgBB.js
import { useState } from "react";
import axios from "axios";

const useImageUploadImgBB = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (file) => {
    setLoading(true);
    setError("");
    try {
      // convert File to base64 string
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const data = reader.result.split(",")[1];
          resolve(data);
        };
        reader.onerror = reject;
      });

      const form = new FormData();
      form.append("key", process.env.REACT_APP_IMGBB_API_KEY);
      form.append("image", base64);

      const res = await axios.post("https://api.imgbb.com/1/upload", form);
      const url = res.data.data.url;
      setImageUrl(url);
      return url;
    } catch (e) {
      console.error(e);
      setError("Upload failed");
      return "";
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, uploadImage, loading, error };
};

export default useImageUploadImgBB;
