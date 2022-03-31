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

export interface ITrendFilmResult {
  page: number;
  results: ITrendFilm[];
  total_pages: number;
  total_results: number;
}

export interface IGenresProps {
  id: string;
  name: string;
}

interface IProductionCompanies {
  name?: string;
  id?: number;
  logo_path?: string | null;
  origin_country?: string;
}

interface IProductionCountries {
  iso_3166_1?: string;
  name?: string;
}

interface ISpokenLanguages {
  iso_639_1?: string;
  name?: string;
}

export interface IMoveDetail {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: IGenresProps[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: ISpokenLanguages[];
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface ICreatedBy {
  id?: number;
  credit_id?: string;
  name?: string;
  gender?: number;
  profile_path?: string | null;
}

interface ILastEpisodeToAir {
  air_date?: string;
  episode_number?: number;
  id?: number;
  name?: string;
  overview?: string;
  production_code?: string;
  season_number?: number;
  still_path?: string;
  vote_average?: number;
  vote_count?: number;
}

interface ISeasons {
  air_date?: string;
  episode_count?: number;
  id?: number;
  name?: string;
  overview?: string;
  poster_path?: string;
  season_number?: number;
}

interface INetworks {
  name?: string;
  id?: number;
  logo_path?: string | null;
  origin_country?: string;
}

export interface ITVDetail extends IMoveDetail {
  created_by?: ICreatedBy[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string[];
  last_episode_to_air?: ILastEpisodeToAir[];
  next_episode_to_air?: null;
  networks?: INetworks[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: ISeasons[];
  type?: string;
  status?: string;
}
