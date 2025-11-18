import Card from '../UI/Card.jsx';
import PlaceItem from './PlaceItem';
import Button from '../UI/Button.jsx';
import './PlaceList.css';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorID={place.creatorID}
          coordinates={place.coordinates}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};
export default PlaceList;
