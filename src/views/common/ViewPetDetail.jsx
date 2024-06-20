import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { fetchPetById } from "../../redux/slices/petSlice";
import vaccineIcon from "../../assets/vaccine.png";
import noImage from "../../assets/no-image.png";

export default function ViewPetDetail() {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.pets.selectedPet);
  const [galleryContainer, setGalleryContainer] = useState(null);
  const lightGalleryRef = useRef(null);
  const containerRef = useRef(null);

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
      lightGalleryRef.current.openGallery();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setGalleryContainer(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (petId) {
      dispatch(fetchPetById(petId));
    }
  }, [dispatch, petId]);

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-12 bg-[#DCCCBB]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col mb-12 p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4">
            <div style={{ height: "100%" }} ref={containerRef}></div>
            <LightGallery
              container={galleryContainer}
              onInit={onInit}
              plugins={[lgZoom, lgThumbnail]}
              dynamic={true}
              closable={false}
              dynamicEl={[
                {
                  src: pet.petImage || noImage,
                  thumb: pet.petImage || noImage,
                },
              ]}
            />
          </div>
          <div className="w-full md:w-2/3 p-6 md:pl-10">
            <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
            <p className="text-lg mb-2">
              <strong>Gender:</strong> {pet.gender}
            </p>
            <p className="text-lg mb-2">
              <strong>Age:</strong> {pet.age}
            </p>
            <p className="text-lg mb-2">
              <strong>Breed:</strong> {pet.breed}
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-4">
              <p className="text-lg mb-2">
                <strong>Vaccination Status:</strong>
              </p>
              <div className="flex items-center">
                <img
                  src={vaccineIcon}
                  alt="Vaccination Status"
                  className="w-6 h-6 mr-2"
                />
                <span>
                  {pet.vaccineDate
                    ? new Date(pet.vaccineDate).toLocaleDateString()
                    : "Not Vaccinated"}
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-4">
              <p className="text-lg mb-2">
                <strong>Diagnosis:</strong>
              </p>
              <div className="flex items-center">
                <img
                  src={vaccineIcon}
                  alt="Diagnosis"
                  className="w-6 h-6 mr-2"
                />
                <span>{pet.diagnosis || "No Diagnosis"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-10 mb-6">
        <h2 className="text-3xl font-bold mb-5">About Me</h2>
        <p className="text-gray-700 mb-4">{pet.description}</p>
        <div className="py-4 text-center">
          <Link
            to={`/customer/adoptionapplication/${petId}`}
            className="bg-orange-500 text-white py-3 px-10 rounded-full shadow hover:bg-blue-700 text-lg font-bold"
          >
            Adopt
          </Link>
        </div>
      </div>
    </div>
  );
}
