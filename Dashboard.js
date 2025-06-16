import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    phone: "",
    email: "",
  });

  // Fetch all reservations
  useEffect(() => {
    axios
      .get("http://localhost:3000/reserve")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Delete reservation
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/reserve/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  // Load user data into form
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      checkIn: user.checkIn,
      checkOut: user.checkOut,
      guests: user.guests,
      phone: user.phone,
      email: user.email,
    });
  };

  // Update form data as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated data
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/reserve/${editingUserId}`, formData)
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editingUserId ? res.data : user
          )
        );
        setEditingUserId(null);
        setFormData({
          checkIn: "",
          checkOut: "",
          guests: "",
          phone: "",
          email: "",
        });
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reservations Dashboard</h2>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Check In</th>
            <th className="p-2 border">Check Out</th>
            <th className="p-2 border">Guests</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.checkIn}</td>
              <td className="p-2 border">{user.checkOut}</td>
              <td className="p-2 border">{user.guests}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUserId && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h3 className="text-lg font-bold mb-2">Edit Reservation</h3>
          <input
            type="text"
            name="checkIn"
            placeholder="Check In"
            value={formData.checkIn}
            onChange={handleChange}
            className="border p-2 mr-2 mb-2"
            required
          />
          <input
            type="text"
            name="checkOut"
            placeholder="Check Out"
            value={formData.checkOut}
            onChange={handleChange}
            className="border p-2 mr-2 mb-2"
            required
          />
          <input
            type="text"
            name="guests"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleChange}
            className="border p-2 mr-2 mb-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 mr-2 mb-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 mr-2 mb-2"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;
