import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';



export default function ImageGallery({gallery,modal,totalHits,page,loadmore,isLoading,PERPAGE}) {
   const theRest = (totalHits - page * PERPAGE);
    return (
       <>
            <ul className="ImageGallery"> 
                {gallery.map(item => (
                <ImageGalleryItem
                    key={nanoid()}
                    item={item}
                    onClick={modal} />
                ))}
            </ul>
            {theRest > 0 && !isLoading && <Button loadmore={loadmore}/>}
        </>
    );
  }
ImageGallery.propTypes = {
    gallery: PropTypes.array,
    page: PropTypes.number,
    totalHits: PropTypes.number,
    loadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    loadmore: PropTypes.func
}

