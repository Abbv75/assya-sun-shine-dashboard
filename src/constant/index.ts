export { default as PAGE_PATH } from "./pagePath";
export { default as IMAGES } from "./image";
export { default as axiosInstance } from "./axiosInstance"

export const IMAGE_URL = process.env.NODE_ENV == 'development'
    ? process.env.REACT_APP_IMAGE_URL_DEV
    : process.env.REACT_APP_IMAGE_URL_PROD;