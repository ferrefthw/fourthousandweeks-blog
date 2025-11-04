import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1';
        if (entry.isIntersecting) {
          setIframeSrc(src); // load video
        } else {
          setIframeSrc(null); // unload video
        }
      },
      { threshold: 0.5 }
    );

    if (iframeRef.current) observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <h1>THANKS FOR THE BOOK!!!</h1>
      <div className="video-wrapper">
        <iframe
          ref={iframeRef}
          width="560"
          height="315"
          src={iframeSrc} // null-safe src
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;
