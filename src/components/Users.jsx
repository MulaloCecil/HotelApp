import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import 'firebase/firestore';
import { onSnapshot, collection } from 'firebase/firestore';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of rooms from Firestore
        const fetchUsers = async () => {
            const colRef = collection(db, 'users');
            let rms = [];
            onSnapshot(colRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    rms.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                console.log(rms);
                setUsers(rms);
            });
        };

        fetchUsers();
    }, []);

    const handleUpdateUser = async (userId, updatedData) => {
        try {

            await db.collection('users').doc(userId).update(updatedData);
            console.log('User updated successfully!');
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {

            await db.collection('users').doc(userId).delete();
            console.log('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return (
        <div className="edit-room-page">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {users.map((user) => (
                    <div className="room-item border border-gray-300 rounded-md p-4" key={user.id}>
                        <h3 className="text-lg font-bold mb-2">{user.displayName}</h3>

                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                            onClick={() => {
                                const updatedData = {
                                    displayName: 'Updated Display Name',

                                };
                                handleUpdateUser(user.id, updatedData);
                            }}
                        >
                            Update User
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-red-300"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;