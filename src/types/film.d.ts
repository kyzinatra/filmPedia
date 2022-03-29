export interface ITrendFilm {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  media_type?: string;
  original_language?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
}

export interface ITrendFilmResponse {
  page: number;
  results: ITrendFilm[];
  total_pages: number;
  total_results: number;
}

export interface IGenresProps {
  id: string;
  name: string;
}
