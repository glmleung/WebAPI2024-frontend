/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * dog
 * OpenAPI spec version: 1.0.0
 */
import type { Charity } from './charity';

/**
 * A dog object
 */
export interface Dog {
  age: number;
  breed: string;
  charity?: Charity;
  charityId: number;
  id: number;
  liked?: boolean;
  name: string;
}
