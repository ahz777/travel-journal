import UsersList from '../components/Users/UsersList';
import { USERS } from '../data';

const Users = () => {
  return (
    <>
      <UsersList users={USERS} />
    </>
  );
};

export default Users;
