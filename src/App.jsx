import { useEffect, useRef, useState } from "react";
import "./App.css";
import favicon from "./assets/dopamine.jpg"; // <-- import the favicon

function App() {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState(null);

  useEffect(() => {
    // Set favicon dynamically
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;

    // IntersectionObserver for autoplay iframe
    const observer = new IntersectionObserver(
      ([entry]) => {
        const src =
          "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";
        if (entry.isIntersecting) {
          setIframeSrc(src); // load video
        } else {
          setIframeSrc(null); // unload video
        }
      },
      { threshold: 0.5 },
    );

    if (iframeRef.current) observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <h1>THANKS FOR THE GUITAR!!!</h1>
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
