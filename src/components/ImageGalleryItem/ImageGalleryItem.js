
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onClick(item)}
    >
      <img src={item.webformatURL} alt="" className="ImageGalleryItemImage" />
    </li>
  );
}
ImageGalleryItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
}


