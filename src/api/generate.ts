/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * dog
 * OpenAPI spec version: 1.0.0
 */
import * as axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
export type PutCharitiesBody = {
  codes?: string[];
  name: string;
};

export type PostCharitiesBody = {
  codes?: string[];
  name: string;
};

export type PostAuthLogin200 = {
  token?: string;
};

export type PostAuthLoginBody = {
  password: string;
  username: string;
};

export type PostAuthRegister201 = {
  token?: string;
};

export type PostAuthRegisterBody = {
  charityCode?: string;
  password: string;
  username: string;
};

export interface UpdateDogBody {
  age: number;
  breed: string;
  name: string;
}

export interface CreateDogBody {
  age: number;
  breed: string;
  name: string;
}

/**
 * A dog object
 */
export interface Dog {
  age: number;
  breed: string;
  id: number;
  name: string;
}

/**
 * A charity object
 */
export interface Charity {
  codes?: string[];
  id: number;
  name: string;
}

/**
 * A user object
 */
export interface User {
  charityId?: number;
  id: number;
  role: string;
  username: string;
}





  /**
 * Get all dogs
 */
export const getDogs = <TData = AxiosResponse<Dog[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/dogs`,options
    );
  }

/**
 * Create a dog
 */
export const postDogs = <TData = AxiosResponse<Dog>>(
    createDogBody: CreateDogBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/dogs`,
      createDogBody,options
    );
  }

/**
 * Get a dog
 */
export const getDogsId = <TData = AxiosResponse<Dog>>(
    id: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/dogs/${id}`,options
    );
  }

/**
 * Update a dog
 */
export const putDogsId = <TData = AxiosResponse<Dog>>(
    id: number,
    updateDogBody: UpdateDogBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.put(
      `/dogs/${id}`,
      updateDogBody,options
    );
  }

/**
 * Delete a dog
 */
export const deleteDogsId = <TData = AxiosResponse<void>>(
    id: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.delete(
      `/dogs/${id}`,options
    );
  }

/**
 * Register a user
 */
export const postAuthRegister = <TData = AxiosResponse<PostAuthRegister201>>(
    postAuthRegisterBody: PostAuthRegisterBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/auth/register`,
      postAuthRegisterBody,options
    );
  }

/**
 * Register a user
 */
export const postAuthLogin = <TData = AxiosResponse<PostAuthLogin200>>(
    postAuthLoginBody: PostAuthLoginBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/auth/login`,
      postAuthLoginBody,options
    );
  }

/**
 * Get me
 */
export const getAuthMe = <TData = AxiosResponse<User>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/auth/me`,options
    );
  }

/**
 * Get all charities
 */
export const getCharities = <TData = AxiosResponse<Charity[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/charities`,options
    );
  }

/**
 * Create a charity
 */
export const postCharities = <TData = AxiosResponse<Charity>>(
    postCharitiesBody: PostCharitiesBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/charities`,
      postCharitiesBody,options
    );
  }

/**
 * Update a charity
 */
export const putCharities = <TData = AxiosResponse<Charity>>(
    putCharitiesBody: PutCharitiesBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.put(
      `/charities`,
      putCharitiesBody,options
    );
  }

/**
 * Delete a charity
 */
export const deleteCharities = <TData = AxiosResponse<void>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.delete(
      `/charities`,options
    );
  }

export type GetDogsResult = AxiosResponse<Dog[]>
export type PostDogsResult = AxiosResponse<Dog>
export type GetDogsIdResult = AxiosResponse<Dog>
export type PutDogsIdResult = AxiosResponse<Dog>
export type DeleteDogsIdResult = AxiosResponse<void>
export type PostAuthRegisterResult = AxiosResponse<PostAuthRegister201>
export type PostAuthLoginResult = AxiosResponse<PostAuthLogin200>
export type GetAuthMeResult = AxiosResponse<User>
export type GetCharitiesResult = AxiosResponse<Charity[]>
export type PostCharitiesResult = AxiosResponse<Charity>
export type PutCharitiesResult = AxiosResponse<Charity>
export type DeleteCharitiesResult = AxiosResponse<void>