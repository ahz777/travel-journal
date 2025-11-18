import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PlaceList from '../components/UserPlaces/PlaceList';
import { useHttpClient } from '../hooks/http-hook';
import Card from '../components/UI/Card';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        /* empty */
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId));
  };

  if (!loadedPlaces && !isLoading) {
    return (
      <li className="center">
        <Card>No places found.</Card>
      </li>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
};
export default UserPlaces;
