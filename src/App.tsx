import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface YoutubeChannelData {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  }
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      }
    }
  }
}

function VideoSection() {
  return (
    <video autoPlay src="./hunchgray.mp4#t=15" />
  );
}

function App() {
  const [result, setResult] = useState<YoutubeChannelData[]>([]);
  const [enter, setEnter] = useState(false);
  const [query, setQuery] = useState('');

  const search = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=AIzaSyBCkatHNqut1afZOtYRgCs-lWUNheWJRls&q=hunchgray');
      console.log(response.data.items);
      setResult(response.data.items);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      {enter && <VideoSection />}
      {result.length > 0 && result.map((item: YoutubeChannelData) => {
        return (
          <>
            <img src={item.snippet.thumbnails.default.url} />
            <p>{item.snippet.title}</p>
          </>
        );
      })}
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => {
        search();
      }}>Search</button>
      <button onClick={() => {
        search();
        setEnter(!enter);
      }}>Video</button>
    </div>
  );
}

export default App;
