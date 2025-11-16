import { useState, useEffect } from 'react';

import UsersList from '../components/Users/UsersList';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttpClient } from '../hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
        // Error is handled in the hook
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </>
  );
};

export default Users;
