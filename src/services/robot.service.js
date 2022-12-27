import { httpService } from './basic/http.service'
import { socketService } from './basic/socket.service'
import { utilService } from './basic/util.service'
import { storageService } from './basic/storage.service'


export const robotService = {
	query,
	getById,
	save,
	remove,
	getStatistics,
	getEmptyRobot,
	getRandomRobotImg,
	getLabels,
	queryCart,
}

// const STORAGE_KEY = 'robotsDb'
const BASE_PATH = 'robot'


async function queryCart() {
	let carts = await storageService.query('cart')
	return carts

}
async function query(filterBy) {
	let robots = await httpService.get(BASE_PATH, filterBy)
	return robots

	/* LOCAL STORAGE */
	// let robots = await storageService.query(STORAGE_KEY)
	// if (filterBy) {
	// 	const { name, labels, inStock, sortBy } = filterBy
	// 	if (name) {
	// 		const regex = new RegExp(name, 'gi')
	// 		robots = robots.filter(robot => regex.test(robot.name))
	// 	}
	// 	if (labels?.length) robots = robots.filter(robot => {
	// 		//this is an OR filtering (at least one label)
	// 		for (let i = 0; i < robot.labels.length; i++) {
	// 			if (labels.includes(robot.labels[i])) return true
	// 		}
	// 		return false
	// 		//this is an AND filtering (all labels)
	// 		// for (let i = 0; i < labels.length; i++) {
	// 		// 	if (!robot.labels.includes(labels[i])) return false
	// 		// }
	// 		// return true
	// 	})
	// 	if (inStock !== undefined && inStock !== 'all') robots = robots.filter(robot => robot.inStock === inStock)
	// 	if (sortBy) robots = robots.sort((a, b) => {
	// 		if (sortBy === 'name') return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
	// 		return a[sortBy] - b[sortBy]
	// 	})
	// }
	// return robots
}

async function getById(robotId) {
	return await httpService.get(`${BASE_PATH}/${robotId}`)
	/* LOCAL STORAGE */
	// return await storageService.get(STORAGE_KEY, robotId)
}

async function save(robot) {
	if (robot._id) {
		const savedRobot = await httpService.put(BASE_PATH, robot)
		socketService.emit('board-change', savedRobot)
		return savedRobot
	} else {
		try {
			const savedRobot = await httpService.post(BASE_PATH, robot)
			socketService.emit('board-change', savedRobot)

			return savedRobot
		} catch (err) {
			console.log(err)
		}
	}
	/* LOCAL STORAGE */
	// if (robot._id) {
	// 	return await storageService.put(STORAGE_KEY, robot)
	// }

	// let updatedRobot = { ...robot, createdAt: Date.now() }
	// return await storageService.post(STORAGE_KEY, updatedRobot)
}

async function remove(robotId) {
	const deleteRobot = await httpService.delete(`${BASE_PATH}/${robotId}`)
	socketService.emit('board-change', deleteRobot)
	return deleteRobot

	/* LOCAL STORAGE */
	// return await storageService.remove(STORAGE_KEY, robotId)
}

async function getStatistics() {
	return await httpService.get(`${BASE_PATH}/statistics`)
}

function getEmptyRobot() {
	return {
		name: '',
		price: '',
		labels: [],
		inStock: false,
		img: '',
	}
}

function getRandomRobotImg() {
	const id = utilService.makeId(16)
	return `https://robohash.org/${id}?set=set3`
}

async function getLabels() {
	return await httpService.get(`${BASE_PATH}/labels`)

	/* LOCAL STORAGE */
	// return gLabels.sort()
}