// types/api.ts ឬដាក់នៅក្នុង file ណាមួយដែលអ្នកចង់
import { Movie } from './movie'; // Import Movie interface ដែលបានកំណត់ខាងលើ

export interface MovieApiResponse {
  page: number;
  results: Movie[]; // នេះគឺជា array នៃ Movie objects
  total_pages: number;
  total_results: number;
}