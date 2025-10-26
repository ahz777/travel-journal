import UsersList from "../components/Users/UsersList";

const Users = () => {
  const USERS = [
    { id: "01", name: "Retsu", image: "/avatars/avatar01.jpg", placeCount: 3 },
    { id: "02", name: "Zykken", image: "/avatars/avatar02.jpg", placeCount: 9 },
    { id: "03", name: "Shadow", image: "/avatars/avatar03.jpg", placeCount: 7 },
    { id: "04", name: "Amadeus", image: "/avatars/avatar04.jpg", placeCount: 1 },
    { id: "05", name: "Emilia", image: "/avatars/avatar05.jpg", placeCount: 6 },
  ];

  return (
    <>
      <UsersList users={USERS} />
    </>
  );
};

export default Users;
