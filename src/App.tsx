import "./App.css";
import BulkPredict from "./Components/BulkPredict/BulkPredict";
import ImageToTextForm from "./Components/Image Ocr/ImageToTextForm ";
import Predict from "./Components/Predict/Predict";
function App() {
  return (
    <>
      <ImageToTextForm />
      <BulkPredict />
      <Predict />
    </>
  );
}

export default App;
