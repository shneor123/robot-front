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
}

const STORAGE_KEY = 'robot'


async function query(filterBy) {
	return storageService.get(STORAGE_KEY, filterBy)
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

// // TEST DATA
// storageService.post(STORAGE_KEY, {
//     _id: utilService.makeId(4),  title: "Tot Demo",
//     isStar: false,
//     createdAt: utilService.makeId(),
//     style:{
//         backgroundColor: "#026aa7",
//         background: 'url(https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
//     }
// })