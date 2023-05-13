import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Predict.module.css";

interface FormData {
  fixedAcidity: number;
  volatileAcidity: number;
  citricAcid: number;
  residualSugar: number;
  chlorides: number;
  freeSulfurDioxide: number;
  density: number;
  pH: number;
  sulphates: number;
  alcohol: number;
}

const Predict = () => {
  const [formData, setFormData] = useState<FormData>({
    fixedAcidity: 6.5,
    volatileAcidity: 0.2,
    citricAcid: 0.35,
    residualSugar: 1.5,
    chlorides: 0.05,
    freeSulfurDioxide: 12.0,
    density: 0.9955,
    pH: 3.1,
    sulphates: 0.7,
    alcohol: 11.5,
  });
  const [prediction, setPrediction] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const response = await fetch("http://localhost:5000/api/wine/predict", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      setPrediction(data.prediction);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    const badResult = {
      fixedAcidity: 7.5,
      volatileAcidity: 0.3,
      citricAcid: 0.45,
      residualSugar: 2.0,
      chlorides: 0.08,
      freeSulfurDioxide: 18.0,
      density: 0.9966,
      pH: 3.2,
      sulphates: 0.6,
      alcohol: 10.0,
    };
    const goodResult = {
      fixedAcidity: 6.5,
      volatileAcidity: 0.2,
      citricAcid: 0.35,
      residualSugar: 1.5,
      chlorides: 0.05,
      freeSulfurDioxide: 12.0,
      density: 0.9955,
      pH: 3.1,
      sulphates: 0.7,
      alcohol: 11.5,
    };
    setFormData(Math.random() < 0.5 ? badResult : goodResult);
    setPrediction(-1);
  };

  return (
    <div className={styles.container}>
      <h1>Wine Prediction</h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className={styles.formGroup}>
          <label>Fixed Acidity</label>
          <input
            type="number"
            step="0.1"
            name="fixedAcidity"
            value={formData.fixedAcidity}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Volatile Acidity</label>
          <input
            type="number"
            step="0.1"
            name="volatileAcidity"
            value={formData.volatileAcidity}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Citric Acid</label>
          <input
            type="number"
            step="0.1"
            name="citricAcid"
            value={formData.citricAcid}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Residual Sugar</label>
          <input
            type="number"
            step="0.1"
            name="residualSugar"
            value={formData.residualSugar}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Chlorides</label>
          <input
            type="number"
            step="0.1"
            name="chlorides"
            value={formData.chlorides}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Free Sulfur Dioxide</label>
          <input
            type="number"
            step="0.1"
            name="freeSulfurDioxide"
            value={formData.freeSulfurDioxide}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Density</label>
          <input
            type="number"
            step="0.1"
            name="density"
            value={formData.density}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>pH</label>
          <input
            type="number"
            step="0.1"
            name="pH"
            value={formData.pH}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Sulphates</label>
          <input
            type="number"
            step="0.1"
            name="sulphates"
            value={formData.sulphates}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Alcohol</label>
          <input
            type="number"
            step="0.1"
            name="alcohol"
            value={formData.alcohol}
            onChange={handleInputChange}
          />
        </div>
        {loading && <div className={styles.loader}></div>}
        {!loading && prediction !== -1 && (
          <div>
            <span>Prediction: </span>
            <span>{prediction ? "Good" : "Bad"}</span>
          </div>
        )}
        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
          <button type="reset" className={styles.resetButton}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Predict;
