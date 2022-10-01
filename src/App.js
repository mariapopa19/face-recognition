import "./App.css";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./ImageLinlForm/ImageLinkForm";
import ParticlesBg from "particles-bg";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  const onButtonSubmit = () => {
    console.log("click");
  };

  return (
    <div className="App">
      <ParticlesBg color="#ffffff" num={30} type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;

