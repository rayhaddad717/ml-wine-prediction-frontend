import React, { useState } from "react";
import styles from "./BulkPredict.module.css";

const BulkPredict = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [qualities, setQualities] = useState<
    { name: string; quality: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    setQualities([]);
    setLoading(true);
    const formData = new FormData();
    formData.append("csv_file", file);

    const response = await fetch(
      "http://127.0.0.1:5000/api/wine/bulk_predict",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      setQualities(data.predictions);
    } else {
      setQualities([]);
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bulk Predict</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.fileInput}
          type="file"
          onChange={handleFileChange}
          multiple={false}
        />

        <button className={styles.submitButton} type="submit">
          Predict
        </button>
      </form>
      <div className="prediciton-container">
        <h1>Prediction:</h1>
        {loading && <div className={styles.loader}></div>}
        {!loading && (
          <ul>
            <li>
              <span>Name</span>
              <span>Quality</span>
            </li>
            {qualities.map((prediction, index) => (
              <li key={`pred-${index}`}>
                <span>{prediction.name}</span>
                <span>{prediction.quality}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BulkPredict;
