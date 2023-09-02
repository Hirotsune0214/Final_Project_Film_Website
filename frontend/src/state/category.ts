export type Category = {
  key: string | undefined;
  id: string;
  poster_path: string;
  profile_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  original_title: string;
  name: string;
};

export type Movie = Category & {
  title: string;
  release_date: string;
  file_path: string;
};

export type Drama = Category & {
  first_air_date: string;
};

export type Searching = Category & {
  title: string;
  release_date: string;
  first_air_date: string;
  original_name: string;
  profile_path: string;
};

export type Recommend = Category & {
  title: string;
  first_air_date: string;
  release_date: string;
};
