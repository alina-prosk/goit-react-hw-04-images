import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { SearchBar } from './SearchBar/SearchBar';
import { getImagesViaApi } from './services/api';
import { ImageGalleryList } from './ImageGallery/ImageGalleryList/ImageGalleryList';
import { LoadMore } from './LoadMore/LoadMore';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!loading) {
      return;
    }
    async function downloadNewImages() {
      try {
        const images = await getImagesViaApi({ query, page });
        setImages(state => [...state, ...images.hits]);
        setLoading(false);
        setHits(images.total);
        setTotalHits(images.totalHits);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    downloadNewImages();
  }, [loading, page, query]);

  const onSearchSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
    setLoading(true);
  };
  const loadMore = () => {
    setPage(state => state + 1);
    setLoading(true);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageGalleryList images={images} />

      {loading && (
        <Circles
          height="80"
          width="80"
          color="red"
          ariaLabel="circles-loading"
          visible={true}
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        />
      )}
      {hits >= 12 && images.length !== totalHits && !loading && (
        <LoadMore onClick={loadMore} />
      )}
    </div>
  );
};