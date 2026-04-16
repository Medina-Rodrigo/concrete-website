import { useEffect, useState } from 'react'
import './App.css'

type Photo = {
  id: number;
  image: string;
  caption: string;
  order: number;
  created_at: string;
};

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/photos/')
    .then(res => {if (!res.ok) throw new Error('Failed to fetch photos'); // if backend returns an error, stop and throw it
      return res.json(); // convert the raw response into usable JavaScript data
    })
    .then(data => {
      setPhotos(data); // store the fetched photos into our photos array
      setLoading(false); // data has arrived, turn off the loading state
    })
    .catch(err => {
      setError (err.message); // store the error message so we can display it to the user
      setLoading(false); // something went wrong, turn off loading anyway
    });

  }, []);

  useEffect (() => {
    // select all photo cards on the page
    const items = document.querySelectorAll('.masonry-item');

    //create an observer that watches for elements entering the viewport
    const observer = new IntersectionObserver ((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { // if this card has entered the viewport
          entry.target.classList.add('visible'); // add visible class to trigger CSS animation
        }
        else { // card is leaving the viewport
          const top = entry.boundingClientRect.top; // get card's position relative to viewport
          if (top > 0) { // card is below the viewport
            entry.target.classList.remove('visible'); // hide it again
          }
        }
      });
    }, { threshold: 0.1 }); // fire when at least 10% of the card is visible
    // tell the observer to watch every photo card
    items.forEach(item => observer.observe(item));

    // cleanup - stop observing when component unmounts
    return () => observer.disconnect();
  }, [photos]); // runs after photos are loaded into the DOM
  return (
    <div className="site-wrapper">

    {/* Header - displays company name, will be replaced w logo later */}
    <header className="site-header">

      {/* placeholder until real logo is ready */}
      <h1 className="site-title">Medina Concrete Construction INC</h1>
    </header>
    {/* Fixed gradient overlay - creats frosted edge effect as photos scroll in and out */}
    <div className="scroll-fade-overlay"></div>

    {/* Main gallery section - displays all concrete work photos */}
    <main className="gallery-section">
      {/* shows while photos are being fetched */}
      {loading && <p className="status-message">Loading...</p>}

      {/* shows if something goes wrong */}
      {error && <p className="status-message error">{error}</p>}

      {/* shows if backend works but no photos are uploaded */}
      {!loading && !error && photos.length == 0 && <p className="status-message">No photos yet, check back soon!</p>}
      
      {/* Masonry photo grid - only renders if photos exist */}
      <div className="masonry-grid">
        {photos.map(photo => (
          <div key={photo.id} className="masonry-item"> {/* key helps React track each photo individually */}
          <img src={photo.image} alt={photo.caption || 'Concrete Work'} /> {/* src is the image URL from Django, alt is fallback text for accessibility */}
          {photo.caption && <p className="photo-caption">{photo.caption}</p>} {/* Only renders caption if one exists */}
          </div>
        ))}
      </div>
    </main>
    </div>
  );
}

export default App
