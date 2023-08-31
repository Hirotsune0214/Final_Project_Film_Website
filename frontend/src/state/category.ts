export type Category = {
  id: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
};

export type Movie = Category & {
  title: string;
  release_date: string;
};

export type Drama = Category & {
  name: string;
  first_air_date: string;
};
