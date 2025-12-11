import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/imagBB";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile, setUser, loading } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let photoURL = user?.photoURL;

      // upload new image if added
      if (photo) {
        photoURL = await imageUpload(photo);
      }

      // firebase update
      await updateUserProfile(name, photoURL);

      // update state instantly
      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto text-primary my-20 bg-white shadow-lg rounded-xl p-6 border mt-10">
        <h1 className="text-4xl md:text-5xl mb-10 font-bold">
            Update Your Profile
          </h1>
      <div className="text-center">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-28 h-28 rounded-full mx-auto shadow-md object-cover"
        />
        <h2 className="text-2xl font-semibold mt-3">{user?.displayName}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Profile Picture</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full mt-1"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary w-full mt-3">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
