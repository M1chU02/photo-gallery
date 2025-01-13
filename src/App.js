import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Unsplash API access key
  const API_KEY = "";

  // Fetch photos from Unsplash API
  const fetchPhotos = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        query
          ? `https://api.unsplash.com/search/photos`
          : `https://api.unsplash.com/photos`,
        {
          params: {
            client_id: API_KEY,
            query: query,
            per_page: 30,
          },
        }
      );
      setPhotos(query ? response.data.results : response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchPhotos(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Photo Gallery</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search photos..."
          className="search-bar"
        />
      </header>

      <main className="gallery">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="photo-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  className="photo-image"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
