import "./App.css";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./ImageLinlForm/ImageLinkForm";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognitiom";

function App() {
  const app = new Clarifai.App({
    apiKey: "5fcf4b3a57d64bb8bf88155fb19d71e9",
  });

  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function (response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {}
    );
  };

  return (
    <div className="App">
      <ParticlesBg color="#ffffff" num={30} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageURL={imageURL} />
    </div>
  );
}

export default App;
