import { useState } from "react";

function BackgroundMusic() {
  const [music] = useState(() => new Audio("/sounds/background-music.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    music.loop = true;
    music
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  };

  return (
    <div>
      <h1>Pokémon Battle Game</h1>
      {!isPlaying && <button onClick={startMusic}>Start Game</button>}
      {isPlaying && <p>Background music is playing...</p>}
    </div>
  );
}

export default BackgroundMusic;
