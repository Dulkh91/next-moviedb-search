export type CardProps  ={
    src: string;
  title: string;
  releaseDate: string;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  genres: number[];
  movieId?: string;
  deleteBtnId?: number;
  onSuccess?: (success:boolean)=> void
}