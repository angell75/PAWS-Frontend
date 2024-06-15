import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import vaccineIcon from '../../assets/vaccine.png';
import dogProfileImage from '../../assets/dog-profile.jpg';

export default function ViewPetDetail() {
  const lightGalleryRef = useRef(null);
  const containerRef = useRef(null);
  const [galleryContainer, setGalleryContainer] = useState(null);

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

  return (
    <div className="container mx-auto py-10 px-4 md:px-12 bg-[#DCCCBB]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col mb-12 p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4">
            <div style={{ height: '100%' }} ref={containerRef}></div>
            <LightGallery
              container={galleryContainer}
              onInit={onInit}
              plugins={[lgZoom, lgThumbnail]}
              dynamic={true}
              closable={false}
              dynamicEl={[
                {
                  src: dogProfileImage,
                  thumb: dogProfileImage,
                },
                {
                  src: dogProfileImage,
                  thumb: dogProfileImage,
                },
              ]}
            />
          </div>
          <div className="w-full md:w-2/3 p-6 md:pl-10">
            <h1 className="text-4xl font-bold mb-4">Pet Name</h1>
            <p className="text-lg mb-2"><strong>Gender:-</strong> Female</p>
            <p className="text-lg mb-2"><strong>Age:-</strong> 2 years old</p>
            <p className="text-lg mb-2"><strong>Breed:-</strong> Poodle Mix</p>
            <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-4">
              <p className="text-lg mb-2"><strong>Vaccination Status:-</strong></p>
              <div className="flex items-center">
                <img src={vaccineIcon} alt="Vaccination Status" className="w-6 h-6 mr-2" />
                <span>14 June 2024</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-4">
              <p className="text-lg mb-2"><strong>Diagnosis:-</strong></p>
              <div className="flex items-center">
                <img src={vaccineIcon} alt="Vaccination Status" className="w-6 h-6 mr-2" />
                <span>Lorem ipsum dolor sit amet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-10 mb-6">
        <h2 className="text-3xl font-bold mb-10">About Me</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </p>
        <div className="flex items-center mt-4">
          <img src="/path/to/owner-image.png" alt="Owner" className="w-12 h-12 rounded-full mr-4"/>
          <div>
            <p className="text-lg font-bold">Owner</p>
            <p>John Doe</p>
          </div>
        </div>
        <div className="py-4 text-center">
          <Link to="/adoptionapplication" className="bg-[#EAB464] text-white py-3 px-10 rounded-full shadow hover:bg-orange-700 text-lg font-bold">
            Adopt
          </Link>
          <Link to="/contact" className="bg-[#8D98A7] text-white py-3 px-10 rounded-full shadow hover:bg-gray-600 text-lg font-bold ml-4">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
