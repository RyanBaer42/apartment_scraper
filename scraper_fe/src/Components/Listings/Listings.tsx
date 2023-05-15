import './Listings.css'
const loadingImg = require('../../Images/loading.png')


interface Listing {
  listing_id: number;
  title: string;
  image_url: string;
}

interface Props {
  listings: Listing[];
  loading: boolean;
}

const Listings = ({listings, loading}: Props) => {
  if (loading) {
    return (
        <div className='loading-section'>
            <img src={loadingImg} className='loading-img' alt='loading-image' />
            <p className='loading-text'>Scraping apartments, this may take a few minutes...</p>
        </div>
    )
  }
  return (
    <ul className="list-group">
      {listings.map(listing => (
          <div key={listing.listing_id} className="listing-container">
            <img className="listing-image" src={listing.image_url} alt={listing.title} />
            <h3 className="listing-title">{listing.title}</h3>
          </div>
      ))}
    </ul>
  );
}

export default Listings;
