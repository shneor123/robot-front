import { httpService } from './http.service'

const BASE_PATH = 'review'

export const reviewService = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy) {
    const reviews = await httpService.get(BASE_PATH, filterBy)
    return reviews
}

async function getById(reviewId) {
    const review = await httpService.get(`${BASE_PATH}/${reviewId}`)
    return review
}

async function save(review){
    if(review._id) return await httpService.put(BASE_PATH, review)
    return await httpService.post(BASE_PATH, review)
}

async function remove(reviewId){
    return await httpService.delete(`${BASE_PATH}/${reviewId}`)
}