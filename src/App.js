import "./App.css";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinlForm/ImageLinkForm";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

function App() {
  const app = new Clarifai.App({
    apiKey: "5fcf4b3a57d64bb8bf88155fb19d71e9",
  });

  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));
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
      <FaceRecognition box={box} imageURL={imageURL} />
    </div>
  );
}

export default App;
