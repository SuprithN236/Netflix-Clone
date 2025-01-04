import { userModel } from "../models/user.model.js";
import { fetchApiData } from "../services/TMDB.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length == 0) {
      res.status(404).send(null);
      return;
    }

    const updatedDocument = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "Person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error while searching person", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length == 0) {
      res.status(404).send(null);
    }

    const updatedDocument = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "Movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error while searching movie", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length == 0) {
      res.status(404).send(null);
    }

    const updatedDocument = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "TV",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error while searching tv", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const searchHistory = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user.searchHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeSearchHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id: Number(id) } },
    });
    res.status(200).json({
      success: true,
      message: "The item has been removed from the search",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
