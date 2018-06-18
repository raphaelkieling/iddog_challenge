import { ALL, CATEGORY, CLEAR_IMAGE, GET_IMAGE_ID } from './actionTypes';

export const all = value => ({
    type: ALL,
    payload: value
});

export const perCategory = value => ({
    type: CATEGORY,
    payload: value
});

export const getImageId = value => ({
    type: GET_IMAGE_ID,
    payload: value
});

export const clearImage = value => ({
    type: CLEAR_IMAGE,
    payload: value
});
