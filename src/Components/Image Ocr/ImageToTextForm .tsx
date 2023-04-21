import React, { useState } from "react";
import styles from "./ImageToTextForm.module.css";

const ImageToTextForm = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [responseText, setResponseText] = useState("");
  const [responseQuality, setResponseQuality] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    setResponseText("");
    setResponseQuality("");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      "http://127.0.0.1:5000/api/convert_image_to_string",
      {
        method: "POST",
        body: formData,
      }
    );
    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      setResponseText(data.text);
      setResponseQuality(
        `Your wine is ${data.prediction == 1 ? "good." : "shit."}`
      );
    } else {
      setResponseText("An error occurred while processing the image.");
      setResponseQuality("An error occurred while processing the image.");
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    if (e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Image to Text Converter</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.fileInput}
          type="file"
          onChange={handleFileChange}
          multiple={false}
        />

        <button className={styles.submitButton} type="submit">
          Convert Image to Text
        </button>
      </form>
      {imagePreview && (
        <div className={styles.imagePreview}>
          <img src={imagePreview} alt="uploaded" />
        </div>
      )}
      <p>
        <b>Prediction:</b>
        {responseQuality}
      </p>

      <div className={styles.responseText}>
        <h3>Extracted Text:</h3>
        {loading && <div className={styles.loader}></div>}

        <p>{responseText}</p>
      </div>
    </div>
  );
};

export default ImageToTextForm;
