import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { storage } from "../FirebaseConfig";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const ImageUploader = forwardRef(({ urls }, ref) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const ref_file = useRef(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  const onImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length + images.length > 5) {
      alert("등록할 수 있는 이미지는 최대 5개입니다.");
      return;
    }

    const newImages = [];
    const newImageURLs = [];

    selectedImages.forEach((image) => {
      const fileExtension = image.name
        .split(".")
        .pop()
        .toLowerCase();
      if (
        image.size <= MAX_FILE_SIZE &&
        allowedExtensions.includes(fileExtension)
      ) {
        newImages.push(image);
        newImageURLs.push(URL.createObjectURL(image));
      } else {
        alert("20MB 이하의 JPG, PNG, GIF 파일만 업로드 가능합니다.");
      }
    });

    setImages([...images, ...newImages]);
    setImageURLs([...imageURLs, ...newImageURLs]);
  };

  const onDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedURLs = imageURLs.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageURLs(updatedURLs);
  };

  const onUpload = async () => {
    const downloadURLs = [];
    const imageNames = [];
    for (const image of images) {
      const fileExtension = image.name
        .split(".")
        .pop()
        .toLowerCase();
      const imageName = `${uuidv4()}.${fileExtension}`;
      const imageRef = storageRef(storage, `images/community/${imageName}`);
      try {
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        downloadURLs.push(downloadURL);
        imageNames.push(imageName);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    return [imageNames, downloadURLs];
  };

  useImperativeHandle(ref, () => ({
    onUpload: () => onUpload(),
  }));

  return (
    <div>
      <input
        ref={ref_file}
        type="file"
        onChange={onImageChange}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        onClick={() => {
          ref_file.current.click();
        }}
        sx={{ mb: 2 }}
      >
        사진 첨부하기
      </Button>
      <br />
      <Typography variant="caption" color="grey">
        사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 5개까지 등록 가능합니다.
      </Typography>
      <ImageList cols={5} gap={10} sx={{ mt: 1 }}>
        {imageURLs.map((url, index) => (
          <ImageListItem key={index}>
            <img
              src={url}
              alt={`Preview ${index}`}
              style={{
                height: "100px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <ImageListItemBar
              sx={{
                background: "rgba(0,0,0,0)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label="delete"
                  onClick={() => onDelete(index)}
                >
                  <RemoveCircle />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
});

export default ImageUploader;
