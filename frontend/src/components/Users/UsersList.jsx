import UserItem from './UserItem';
import Card from '../UI/Card';
import './UsersList.css';

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.placeCount}
        />
      ))}
    </ul>
  );
};

export default UsersList;
