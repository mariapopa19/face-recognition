import "./App.css";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinlForm/ImageLinkForm";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SingIn from "./components/SingIn/SingIn";
import Register from "./components/Register/Register";

function App() {
  const app = new Clarifai.App({
    apiKey: "5fcf4b3a57d64bb8bf88155fb19d71e9",
  });

  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("singin");
  const [isSingedIn, setIsSingedIn]  = useState(false);

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if(route === 'singout') {
      setIsSingedIn(false);
    } else if (route === 'home') {
      setIsSingedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSingedIn={isSingedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
      ) : (route === "singin" ? 
        <SingIn onRouteChange={onRouteChange} />
       : 
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
