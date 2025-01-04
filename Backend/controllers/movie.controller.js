import { fetchApiData } from "../services/TMDB.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchApiData(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server error");
  }
};

export const getMovieTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    console.log("Error while fetching movie trailer: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    console.log("Error while fetching movie details: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    console.log("Error while fetching similar movies: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      data: data.results,
    });
  } catch (error) {
    console.log("Error while fetching categories: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
