import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import YouTube, { Options } from 'react-youtube';
import Chat from './components/Chat';

interface YoutubeChannelData {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
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
      };
    };
  };
}

function App(): ReactElement {
  const [result, setResult] = useState<YoutubeChannelData[]>([]);
  const [video, setVideo] = useState('');
  const [query, setQuery] = useState('');
  const [player, setPlayer] = useState<any>(null);
  const options: Options = {
    playerVars: {
      autoplay: 1,
      disablekb: 1,
      controls: 0,
    },
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const changeTime = (second: number) => {
    player?.seekTo(second);
  };

  const search = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=AIzaSyBCkatHNqut1afZOtYRgCs-lWUNheWJRls&q=${query}`,
      );
      console.log(response.data.items);
      setResult(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {video !== '' && (
        <YouTube onReady={onReady} opts={options} videoId={video} />
      )}
      {result.length > 0 &&
        result.map((item: YoutubeChannelData) => {
          return (
            <div
              key={item.id.videoId}
              onClick={() => setVideo(item.id.videoId)}
            >
              <img src={item.snippet.thumbnails.default.url} alt="thumbnail" />
              <p>{item.snippet.title}</p>
            </div>
          );
        })}
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button
        onClick={() => {
          search();
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          changeTime(50);
        }}
      >
        changeTest!
      </button>
      <Chat />
    </div>
  );
}

export default App;
