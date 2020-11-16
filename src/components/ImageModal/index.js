/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.css';

class ImageModal extends React.Component {
  render() {
    const { presentImgId, imageUrls, presentImgIndex } = this.props;
    return (
      <div>
        <div className="modal">
          <span className="close cursor" onClick={() => this.props.closeImgModal()}>&times;</span>
          <div className="modal-content">
            {imageUrls.map(item =>
              <div className={presentImgId === item.id ? 'active' : 'mySlides'} key={item.id}>
                <img src={item.url} alt="img" />
              </div>
            )}
            {presentImgIndex > 0 && <a className="prev" onClick={() => this.props.slideImage('prev')}>&#10094;</a>}
            {presentImgIndex < imageUrls.length - 1 && <a className="next" onClick={() => this.props.slideImage('next')}>&#10095;</a>}
          </div>
        </div>
      </div>
    )
  }
}

export default ImageModal;