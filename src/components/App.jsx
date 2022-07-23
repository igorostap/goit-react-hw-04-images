import { useState,useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import './styles.css';


export function App() {
  const PERPAGE = 12;
  const [galleryImgName,setGalleryImgName] = useState('');
  const [currentImg, setCurrentImg] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [err, setErr] = useState(null);

  useEffect(() => {
    
    const doFetch = () => {
      if (!galleryImgName) return;
    setIsLoading(true );
    fetch(
      `https://pixabay.com/api/?q=${galleryImgName}&page=${page}&key=27612779-03056b38fcc0dd588e982ef22&image_type=photo&orientation=horizontal&per_page=${PERPAGE}`
    )
      .then(resp => resp.json())
      .then(gallery => {
        if (gallery.hits.length === 0) {
          setIsLoading(false);
          return toast.error('Нажаль за даним запитом картинок не знайденно');
          
        }
        handleResponse(gallery);
      })
      .catch(err => setErr( err ))
      
  }
    doFetch();
    
  }, [ galleryImgName, page]);

  
  const handleResponse = (gallery) => {
    gallery.length === 0 ? setGallery(gallery.hits) : setGallery(prev => [...prev, ...gallery.hits]);
    setTotalHits(gallery.totalHits);
    setIsLoading(false);
    setErr(null);
  }

  const onLoad = () => {
    setPage(page => page + 1 );
  };
  const onSubmit = evt => {
    evt.preventDefault();
    
    setGalleryImgName(evt.target.elements.searchName.value.trim().toLowerCase());
    setPage(1);
    setGallery([]);
  
  };

  const toggleModal = (img) => {
    setShowModal(!showModal);
    setCurrentImg(img);
  };
   const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget)toggleModal({});
  };
  const handleEsc = evt => {
    if (evt.code === 'Escape')toggleModal({});
  };
  return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery
          galleryImgName={galleryImgName}
          showModal={toggleModal}
          gallery={gallery}
          modal={toggleModal}
          totalHits={totalHits}
          page={page}
          loadmore={onLoad}
        isLoading={isLoading}
        PERPAGE={PERPAGE}
        />
        {isLoading && (
          <div>
            (<Loader />)
          </div>
        )}

        {showModal && (
          <Modal
            handleOverlayClick={handleOverlayClick}
            onEsc={handleEsc}
            currentImg={currentImg}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  };
 
  



