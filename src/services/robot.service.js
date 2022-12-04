import { storageService } from './async-storage.service'
import { utilService } from './util.service'

/* COMMENTS ARE FOR LOCAL STORAGE DATABASE (BEFORE I'VE CREATED BACKEND) */

export const robotService = {
	query,
	getById,
	save,
	remove,
	getEmptyRobot,
	getRandomRobotImg,
	getLabels
}

const STORAGE_KEY = 'robot'
const gLabels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]


async function query(filterBy) {
	let robots = await storageService.query(STORAGE_KEY, filterBy)
	return robots
}

async function getById(robotId) {
	return await storageService.get(STORAGE_KEY, robotId)
}

async function remove(robotId) {
	return await storageService.remove(STORAGE_KEY, robotId)
}

async function save(robot) {
	if (robot._id) {
		const saveRobot = await storageService.put(STORAGE_KEY, robot)
		return saveRobot
	} else {
		try {
			const saveRobot = await storageService.post(STORAGE_KEY, robot)
			return saveRobot
		} catch (err) {
			console.log(err)
		}
	}
}

function getEmptyRobot() {
	return {
		name: 'shneor',
		price: 0,
		labels: [],
		inStock: false,
		img: '',
		createdAt: Date.now(),
	}
}

function getRandomRobotImg() {
	const id = utilService.makeId(16)
	return `https://robohash.org/${id}?set=set3`
}

async function getLabels() {
	return gLabels.sort()
}




//  // TEST DATA
// storageService.post(STORAGE_KEY, {
// 	name: "Tot Demo",
// 	price: 0,
// 	labels: [],
// 	inStock: false,
// 	img: '',
// 	createdAt: Date.now(),
// })



// storageService.post(STORAGE_KEY, {name: "Tot Demo",price: 0, labels: [],
// 	inStock: false,img: `https://robohash.org/?set=set3`,createdAt: Date.now(),
// }).then(x => console.log(x))
