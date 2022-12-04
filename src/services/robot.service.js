import { utilService } from './util.service'
import { httpService } from './http.service'


/* COMMENTS ARE FOR LOCAL STORAGE DATABASE (BEFORE I'VE CREATED BACKEND) */

export const robotService = {
	query,
	getById,
	save,
	remove,
	getEmptyRobot,
	getRandomRobotImg,
	getLabels,
	getStatistics
}

const STORAGE_KEY = 'robot'
const BASE_PATH = 'robot'

const gLabels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]


async function query(filterBy) {
	let robots = await httpService.get(BASE_PATH, filterBy)
	return robots
}

async function getById(robotId) {
	return await httpService.get(`${BASE_PATH}/${robotId}`)
	// return await storageService.get(STORAGE_KEY, robotId)

}

async function remove(robotId) {
	return await httpService.delete(`${BASE_PATH}/${robotId}`)
	// return await storageService.remove(STORAGE_KEY, robotId)
}

async function save(robot) {
	if (robot._id) {
		const saveRobot = await httpService.put(BASE_PATH, robot)
		return saveRobot
	} else {
		try {
			const saveRobot = await httpService.post(BASE_PATH, robot)
			return saveRobot
		} catch (err) {
			console.log(err)
		}
	}
}

function getEmptyRobot() {
	return {
		name: '',
		price: 0,
		labels: [],
		inStock: false,
		img: '',
	}
}

async function getStatistics() {
	return await httpService.get(`${BASE_PATH}/statistics`)
}

function getRandomRobotImg() {
	const id = utilService.makeId(16)
	return `https://robohash.org/${id}?set=set3`
}

async function getLabels() {
	/* LOCAL STORAGE */
	return gLabels.sort()
}
