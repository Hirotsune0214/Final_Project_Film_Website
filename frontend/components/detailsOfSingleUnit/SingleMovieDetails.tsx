import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleMovieDetails = () => {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");

  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3"
      );

      const categoriesResponse = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=bb46848237eacc0a36827f6639b47ee3"
      );

      // chatGPT
      const firstMovie = response.data.results[0]; // 最初の映画を取得
      setTitle(firstMovie.title);
      setRate(firstMovie.vote_average);
      //setCategories(firstMovie.genre_ids);
      setDescription(firstMovie.overview);

      // Question
      const categoryNames = firstMovie.genre_ids.map((categoryId: any) => {
        const category = categoriesResponse.data.genres.find(
          (genre: any) => genre.id === categoryId
        );
        return category ? category.name : "";
      });

      setCategories(categoryNames.join(", ")); // カテゴリー名をセット

      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <>
      <div>{title}</div>
      <div>{rate}</div>
      <div>{categories}</div>
      <div>{description}</div>
    </>
  );
};

export default SingleMovieDetails;
