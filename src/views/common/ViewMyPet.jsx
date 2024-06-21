import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { fetchPets, updatePet, deletePet, resetStatus } from "../../redux/slices/petSlice";
import Swal from "sweetalert2";
import profileBanner from "../../assets/my-pets.png";
import { Icon } from "@iconify/react";

Modal.setAppElement("#root");

export default function ViewMyPet() {
  const dispatch = useDispatch();
  const { pets, status, error } = useSelector((state) => state.pets);
  const { user_info: user } = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [petData, setPetData] = useState({
    id: "",
    petImage: null,
    name: "",
    breed: "",
    gender: "",
    age: "",
    description: "",
    vaccineStatus: false,
    vaccineDate: "",
  });

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const openModal = (pet) => {
    setPetData({
      id: pet.petId,
      petImage: null,
      name: pet.name || "",
      breed: pet.breed || "",
      gender: pet.gender || "",
      age: pet.age || "",
      description: pet.description || "",
      vaccineStatus: Boolean(pet.vaccineStatus),
      vaccineDate: pet.vaccineDate || "",
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setPetData({
      ...petData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", petData.id);
    if (petData.petImage) {
      formData.append("petImage", petData.petImage);
    }
    formData.append("name", petData.name);
    formData.append("breed", petData.breed);
    formData.append("gender", petData.gender);
    formData.append("age", petData.age);
    formData.append("description", petData.description);
    formData.append("vaccineStatus", petData.vaccineStatus.toString());
    if (petData.vaccineStatus) {
      formData.append("vaccineDate", petData.vaccineDate);
    }

    // Log FormData entries
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(updatePet({ id: petData.id, formData })).then((action) => {
      if (action.type === updatePet.fulfilled.toString()) {
        closeModal();
        Swal.fire("Success", "Pet updated successfully!", "success");
        dispatch(resetStatus());
        dispatch(fetchPets());
      } else {
        Swal.fire("Error", `Error updating pet: ${error.message || "Unknown error"}`, "error");
        dispatch(resetStatus());
        closeModal();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePet(id));
        Swal.fire("Deleted!", "Your pet has been deleted.", "success");
      }
    });
  };

  const userPets = pets.filter((pet) => pet.userId === user.userId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url(${profileBanner})`, height: "300px" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black">My Pets</h1>
          <h2 className="text-xl md:text-2xl text-black mt-4">View and edit your uploaded pets.</h2>
        </div>
      </section>

      <div className="flex justify-center items-center flex-grow py-10 px-4">
        <div className="w-full md:w-3/4 p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Breed</th>
                  <th className="py-2 px-4">Gender</th>
                  <th className="py-2 px-4">Age</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPets.map((pet) => (
                  <tr key={pet.id}>
                    <td className="py-2 px-4">
                      <img src={pet.petImage} alt={pet.name} className="w-12 h-12 rounded-full" />
                    </td>
                    <td className="py-2 px-4">{pet.name}</td>
                    <td className="py-2 px-4">{pet.breed}</td>
                    <td className="py-2 px-4">{pet.gender}</td>
                    <td className="py-2 px-4">{pet.age}</td>
                    <td className="py-2 px-4">{pet.description}</td>
                    <td className="py-2 px-4">
                      <span className={`status-badge ${pet.adoptionStatus.toLowerCase()}`}>{pet.adoptionStatus}</span>
                    </td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button onClick={() => openModal(pet)} className="bg-blue-500 text-white py-1 px-3 rounded">
                        <Icon icon="mdi:pencil" />
                      </button>
                      <button onClick={() => handleDelete(pet.petId)} className="bg-red-500 text-white py-1 px-3 rounded">
                        <Icon icon="mdi:delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Pet"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            maxHeight: "600px",
            overflow: "auto",
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">Edit Pet</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input type="file" name="petImage" className="w-full p-2 border rounded" onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input type="text" name="name" value={petData.name} className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Breed</label>
            <input type="text" name="breed" value={petData.breed} className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input type="radio" name="gender" value="Male" checked={petData.gender === "Male"} onChange={handleInputChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={petData.gender === "Female"} onChange={handleInputChange} />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Age</label>
            <input type="text" name="age" value={petData.age} className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea name="description" value={petData.description} className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Vaccine Status</label>
            <input type="checkbox" name="vaccineStatus" checked={!!petData.vaccineStatus} onChange={handleInputChange} />
            <label className="ml-2">Vaccinated</label>
          </div>
          {petData.vaccineStatus && (
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Vaccine Date</label>
              <input type="date" name="vaccineDate" value={petData.vaccineDate} className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
          )}
          <div className="text-right">
            <button type="submit" className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-md shadow hover:bg-orange-700">
              Save
            </button>
            <button type="button" onClick={closeModal} className="ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
