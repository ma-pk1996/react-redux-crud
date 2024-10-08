// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, fetchUsers } from "../queryFn/users/users-query";
import { NavLink } from "react-router-dom";
import {
  useDeleteUserMutation,
  useFetchUsersQuery,
} from "../store/userSlice-rtkquery";

export default function UserList() {
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.users.users);

  const { data: users, isLoading, isError, error } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User list</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name}</span>
            <div>
              <NavLink
                to={`/edit/${user.id}`}
                className="bg-yellow-500 text-white px-4 py-2 mr-2"
              >
                Edit
              </NavLink>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
