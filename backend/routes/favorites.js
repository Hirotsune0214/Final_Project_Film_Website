const router = require("express").Router();
const { default: axios } = require("axios");
const Favorite = require("../models/Favorite");

// 特定の映画をfavoriteに格納する
router.put("/movies/:id", async (req, res) => {
  try {
    console.log(Number(req.params.id));
    // req.params.idは、指定した映画のidになる
    const favorite = await Favorite.findOne({
      movieId: Number(req.params.id),
      userId: req.body.userId,
    });
    console.log(favorite);

    // favoriteがnull -> DBにデータがない = お気に入りを押してない
    if (favorite === null) {
      await Favorite.create({
        movieId: req.params.id,
        userId: req.body.userId,
      });
      return res.status(200).json("You pushed the favorites button");
      // else以下は、既にfavoriteが押されていたら
    } else {
      // favoriteをしているユーザーIDを取り除く
      await favorite.deleteOne();
      return res.status(204).json("Remove favorite");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/dramas/:id", async (req, res) => {
  try {
    // req.params.idは、指定した映画のidになる
    const favorite = await Favorite.findOne({
      dramaId: req.params.id,
      userId: req.body.userId,
    });
    console.log(favorite);

    // favoriteがnull -> DBにデータがない = お気に入りを押してない
    if (favorite === null) {
      await Favorite.create({
        dramaId: req.params.id,
        userId: req.body.userId,
      });
      return res.status(200).json("You pushed the favorite button");
      // else以下は、既にfavoriteが押されていたら
    } else {
      // favoriteをしているユーザーIDを取り除く
      await favorite.deleteOne();
      return res.status(204).json("Remove favorite");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await Favorite.find({
      userId,
    });
    const result = [];
    /*
    favorites = [
      { userId: test, movieId: null, dramaId: 1111 },
      { userId: test, movieId: 1111, dramaId: null }
     ]
    */
    //  一回目のloop -> { userId: test, movieId: null, dramaId: 1111 }
    for (const favorite of favorites) {
      const responseMovie = favorite?.movieId
        ? await axios.get(
            `https://api.themoviedb.org/3/movie/${favorite.movieId}?api_key=bb46848237eacc0a36827f6639b47ee3`
          )
        : undefined;

      const responseDrama = favorite?.dramaId
        ? await axios.get(
            `https://api.themoviedb.org/3/tv/${favorite.dramaId}?api_key=bb46848237eacc0a36827f6639b47ee3`
          )
        : undefined;

      result.push({
        favorite,
        title: responseMovie
          ? responseMovie.data.title
          : responseDrama.data.name,
        picture: responseMovie
          ? responseMovie.data.poster_path
          : responseDrama.data.poster_path,
        date: responseMovie
          ? responseMovie.data.release_date
          : responseDrama.data.first_air_date,
        vote_average: responseMovie
          ? responseMovie.data.vote_average
          : responseDrama.data.vote_average,
      });
    }
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
