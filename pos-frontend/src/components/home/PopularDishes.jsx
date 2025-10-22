import React, { useState } from "react";
import { popularDishes } from "../../constants";
import { useFeatureFlag } from "../../hooks/useFeatureFlag";
import { FEATURE_FLAGS } from "../../config/launchdarkly";
import { IoClose } from "react-icons/io5";
import beijingCornMeme from "../../assets/images/beijing-corn-meme.jpg";

const PopularDishes = () => {
  // Feature flag for Beijing Corn Soup
  const beijingCornSoup = useFeatureFlag(FEATURE_FLAGS.BEIJING_CORN_SOUP, false);
  
  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Create Beijing Corn Soup item for popular dishes
  const beijingCornSoupItem = {
    id: 0,
    name: "Beijing Corn Soup",
    numberOfOrders: 999,
    image: beijingCornMeme
  };
  
  // Conditionally add Beijing Corn Soup as first item if flag is enabled
  const displayDishes = beijingCornSoup.value === true 
    ? [beijingCornSoupItem, ...popularDishes]
    : popularDishes;

  // Handle image click
  const handleImageClick = (dish) => {
    setSelectedImage(dish);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="overflow-y-scroll h-[680px] scrollbar-hide">
          {displayDishes.map((dish) => {
            return (
              <div
                key={dish.id}
                className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mt-4 mx-6"
              >
                <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">{dish.id < 10 ? `0${dish.id}` : dish.id}</h1>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${
                    dish.id === 0 ? 'w-[60px] h-[60px] rounded-lg' : 'w-[50px] h-[50px] rounded-full'
                  }`}
                  onClick={() => handleImageClick(dish)}
                />
                <div>
                  <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{dish.name}</h1>
                  <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                    <span className="text-[#ababab]">Orders: </span>
                    {dish.numberOfOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <IoClose size={32} />
            </button>
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h2 className="text-[#f5f5f5] text-2xl font-bold">{selectedImage.name}</h2>
                <p className="text-[#ababab] text-lg mt-2">
                  Orders: {selectedImage.numberOfOrders}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularDishes;
