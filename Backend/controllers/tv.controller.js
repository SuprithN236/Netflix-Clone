import { fetchApiData } from "../services/TMDB.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchApiData(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomTv,
    });
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
};

export const getTvTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    console.log("Error while fetching tv trailer: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    console.log("Error while fetching tv show details: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSimilarTv = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    console.log("Error while fetching similar tv shows: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchApiData(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      data: data.results,
    });
  } catch (error) {
    console.log("Error while fetching categories: ", error.message);

    if (error.message.includes("404")) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
