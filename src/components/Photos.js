import React from "react";

class Photos extends React.Component {
  render() {
    const albumName1 = "Hensmåla Triathlon 2019";
    const albumName2 = "Hensmåla Triathlon 2015";
    return (
      <div className="photos">
        <h1>FOTON</h1>
        <div className="albums">
          <div className="album">
            <h2>{albumName1}</h2>
            <a
              data-flickr-embed="true"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flickr.com/photos/182868759@N06/albums/72157709850305827"
              title={albumName1}
            >
              <img
                src="https://live.staticflickr.com/65535/48362160101_5f3715fc24_z.jpg"
                width="320"
                height="180"
                alt={albumName1}
              ></img>
            </a>
          </div>
          <div className="album">
            <h2>{albumName2}</h2>
            <a
              data-flickr-embed="true"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flickr.com/photos/126543226@N06/albums/72157656377504728"
              title={albumName2}
            >
              <img
                src="https://live.staticflickr.com/499/20262091536_ecbc7c2106_z.jpg"
                width="320"
                height="180"
                alt={albumName1}
              ></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Photos;
