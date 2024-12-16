import axios from "axios";
import React, { useEffect, useState } from "react";
import "boxicons";

interface ImagePreviewProps {
  alt: string;
  image: string | File;
}

const ImagePreviewFromAPI: React.FC<ImagePreviewProps> = ({ image, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;

    if (image instanceof File) {
      url = URL.createObjectURL(image);
      setImageUrl(url);
    } else {
      const fetchImage = async () => {
        try {
          const ASSET_URL = import.meta.env.VITE_ASSET_URL;
          const response = await axios.get(`${ASSET_URL}/${image}`, {
            responseType: "blob",
          });
          url = URL.createObjectURL(response.data);
          setImageUrl(url);
        } catch (err) {
          console.error("Error fetching the image:", err);
        }
      };
      fetchImage();
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [image]);

  const imagePath = typeof image === "string" ? image : null;

  if (!image || !imageUrl) {
    return (
      <div className="flex justify-center items-center w-[16rem] h-[16rem] rounded-full bg-gray-200">
        <i className="bx bx-user text-gray-500 text-9xl"></i>
      </div>
    );
  }

  if (imagePath?.includes("avatars")) {
    return (
      <div>
        <img
          src={imageUrl}
          alt={alt}
          className="w-[16rem] h-[16rem] rounded-full object-cover aspect-auto box-border"
        />
      </div>
    );
  } else if (
    imagePath?.includes("complaints") ||
    imagePath?.includes("feedback")
  ) {
    return (
      <div>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full lg:w-full rounded-lg object-cover aspect-auto box-border"
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>Image path tidak dikenali</p>
      </div>
    );
  }
};

export default ImagePreviewFromAPI;
