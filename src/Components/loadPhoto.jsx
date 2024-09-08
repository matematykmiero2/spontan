import React, { useState } from "react";
import Button from "@mui/material/Button";
import { uploadPhoto } from "../functions";
const UploadImage = ({ handlePhotoSubmit }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const url = await uploadPhoto(file);
    setMessage("");

    setUploading(false);
    handlePhotoSubmit(
      `https://kutcjeqpldpwegtguask.supabase.co/storage/v1/object/public/${url}`
    );
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
