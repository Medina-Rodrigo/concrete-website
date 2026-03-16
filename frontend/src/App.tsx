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
    fetch('http://localhost:8000/api/photos/')
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

  return (
    <div className="site-wrapper">

    {/* Header - displays company name, will be replaced w logo later */}
    <header className="site-header">

      {/* placeholder until real logo is ready */}
      <h1 className="site-title">Medina Concrete Construction INC</h1>
    </header>

    {/* Main gallery section - displays all concrete work photos */}
    <main className="gallery-section">
      {/* shows while photos are being fetched */}
      {loading && <p className="status-message">Loading...</p>}

      {/* shows if something goes wrong */}
      {error && <p className="status-message error">{error}</p>}

      {/* shows if backend works but no photos are uploaded */}
      {!loading && !error && photos.length == 0 && <p className="status-message">No photos yet, check back soon!</p>}
    </main>
    </div>

};

export default App
