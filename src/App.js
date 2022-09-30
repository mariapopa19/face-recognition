import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './ImageLinlForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
      <ParticlesBg color='#ffffff' num={30} type="cobweb"  bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
