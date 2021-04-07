import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function VideoSection() {
  return (
    <video autoPlay src="./hunchgray.mp4#t=15" />
  );
}

function App() {
  const [enter, setEnter] = useState(false);

  const search = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=AIzaSyBCkatHNqut1afZOtYRgCs-lWUNheWJRls&q=hunchgray');
      console.log(response);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      {enter && <VideoSection />}
      <button onClick={() => {
        search();
        setEnter(!enter);
      }}>Video</button>
    </div>
  );
}

export default App;
