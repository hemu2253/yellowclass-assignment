import React from 'react';
import './App.css';
import ImageModal from './components/ImageModal';
import { configDetails } from './config';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      page: 1,
      isFetchingData: false,
      openModal: false,
      presentImgId: null,
      presentImgIndex: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
  }

  infiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });
      this.fetchData(newPage);
    }
  }

  fetchData = (pageNum = 1) => {
    fetch(`https://api.unsplash.com/photos?page=${pageNum}`, {
      headers: {
        'Authorization': `Client-ID ${configDetails.accessCode}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const tempData = data.map(item => {
          const obj = {
            id: item.id,
            url: item.urls.small
          }
          return obj;
        });
        this.setState({
          imageUrls: [...this.state.imageUrls, ...tempData]
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  openImageModal = (imageId, presentImgIndex) => {
    this.setState({ presentImgId: imageId, openModal: true, presentImgIndex });
  }

  slideImage = moveType => {
    const { presentImgId, imageUrls } = this.state;
    const indexNo = imageUrls.findIndex(item => item.id === presentImgId);
    if (moveType === 'next') {
      this.setState({ presentImgId: imageUrls[indexNo + 1].id, presentImgIndex: indexNo + 1 });
    } else if (moveType === 'prev') {
      this.setState({ presentImgId: imageUrls[indexNo - 1].id, presentImgIndex: indexNo - 1 });
    }

  }

  render() {
    const { imageUrls } = this.state;
    return (
      <div className="App">
        <section>
          {imageUrls.map((data, index) => <img key={data.id} src={data.url} alt="img" onClick={() => this.openImageModal(data.id, index)} />)}
        </section>
        {this.state.openModal && (
          <ImageModal
            presentImgId={this.state.presentImgId}
            imageUrls={imageUrls}
            top={true}
            presentImgIndex={this.state.presentImgIndex}
            slideImage={moveType => this.slideImage(moveType)}
            closeImgModal={() => this.setState({ openModal: false })}
          />
        )}
      </div >
    )
  }
}