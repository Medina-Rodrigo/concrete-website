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

    </div>

};

export default App
