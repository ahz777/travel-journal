import { useParams } from 'react-router-dom';
import PlaceList from '../components/UserPlaces/PlaceList';
import { DUMMY_PLACES } from '../data.js';

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creatorId === userId);

  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
