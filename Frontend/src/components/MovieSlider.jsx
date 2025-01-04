import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { ArrowRight, ArrowLeft } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const divRef = useRef(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType == "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.data);
    };

    getContent();
  }, [contentType, category]);

  const handleButtonClickLeft = () => {
    divRef.current.scrollBy({
      top: 0,
      left: -divRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleButtonClickRight = () => {
    divRef.current.scrollBy({
      top: 0,
      left: divRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-white bg-black relative px-5 md:px-20">
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName + " " + formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={divRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMAGE_BASE_URL + item.backdrop_path}
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
              <p className="absolute bottom-2 left-2">
                {item?.name || item?.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="absolute top-12 h-[140.5px] w-10 flex items-center 
        justify-center bg-gray-600/10 hover:bg-gray-600/40"
        onClick={handleButtonClickLeft}
      >
        <ArrowLeft />
      </button>
      <button
        className="absolute top-12 h-[140.5px] right-20 flex items-center justify-center w-10 bg-gray-600/10 hover:bg-gray-600/40"
        onClick={handleButtonClickRight}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default MovieSlider;
