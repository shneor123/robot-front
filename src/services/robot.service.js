import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
import { utilService } from './util.service'

/* COMMENTS ARE FOR LOCAL STORAGE DATABASE (BEFORE I'VE CREATED BACKEND) */

export const robotService = {
	query,
	getById,
	save,
	remove,
	getStatistics,
	getEmptyRobot,
	getRandomRobotImg,
	getLabels,
}

// const STORAGE_KEY = 'robotsDb'
const BASE_PATH = 'robot'

// const gLabels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
// const gRobots = `[
// 	{
// 		"name": "Destiny Wade",
// 		"price": 2067,
// 		"createdAt": 1587412322759,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Robin Rivas",
// 		"price": 1630,
// 		"createdAt": 1580740270641,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Nola Best",
// 		"price": 1100,
// 		"createdAt": 1621335481089,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Brett Mercado",
// 		"price": 285,
// 		"createdAt": 1650771993728,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Keane Graham",
// 		"price": 993,
// 		"createdAt": 1596217692738,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Oren Rogers",
// 		"price": 223,
// 		"createdAt": 1650940737561,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Elijah Price",
// 		"price": 1124,
// 		"createdAt": 1634946103099,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Richard Hudson",
// 		"price": 773,
// 		"createdAt": 1654180238539,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Noah Hahn",
// 		"price": 193,
// 		"createdAt": 1618886948879,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Jessica Baxter",
// 		"price": 1444,
// 		"createdAt": 1578627266256,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Tanya O'connor",
// 		"price": 1697,
// 		"createdAt": 1583294497932,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Belle Pierce",
// 		"price": 1351,
// 		"createdAt": 1613411382118,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Drew Coffey",
// 		"price": 270,
// 		"createdAt": 1645867539037,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Jaquelyn Ford",
// 		"price": 600,
// 		"createdAt": 1648802059902,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Ella Powers",
// 		"price": 845,
// 		"createdAt": 1627472168234,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Allegra Mercer",
// 		"price": 462,
// 		"createdAt": 1616611013552,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Vance Rush",
// 		"price": 295,
// 		"createdAt": 1639363831148,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Lysandra Castaneda",
// 		"price": 1840,
// 		"createdAt": 1578937965857,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Catherine Walton",
// 		"price": 2494,
// 		"createdAt": 1585492430233,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Xantha Mccall",
// 		"price": 618,
// 		"createdAt": 1588550681058,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Giacomo Estrada",
// 		"price": 555,
// 		"createdAt": 1599328750325,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Eaton Boone",
// 		"price": 2489,
// 		"createdAt": 1605684973535,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Solomon Christensen",
// 		"price": 301,
// 		"createdAt": 1605695825546,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Judith Sherman",
// 		"price": 1488,
// 		"createdAt": 1647494740455,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Sacha Robbins",
// 		"price": 1064,
// 		"createdAt": 1606133041897,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Dillon Solis",
// 		"price": 1557,
// 		"createdAt": 1597092284002,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Bertha Blair",
// 		"price": 1042,
// 		"createdAt": 1585653239851,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Carolyn Vaughan",
// 		"price": 1579,
// 		"createdAt": 1609806928673,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Patrick Forbes",
// 		"price": 2476,
// 		"createdAt": 1642298051361,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Raphael Morton",
// 		"price": 1966,
// 		"createdAt": 1636765424361,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Channing Thompson",
// 		"price": 1505,
// 		"createdAt": 1615269986783,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Allistair Hurst",
// 		"price": 1110,
// 		"createdAt": 1613580880720,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Ryan Tyson",
// 		"price": 1677,
// 		"createdAt": 1581514810502,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Dawn Mcconnell",
// 		"price": 220,
// 		"createdAt": 1637008799933,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Darius Ballard",
// 		"price": 1337,
// 		"createdAt": 1634906888700,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Irene Harrington",
// 		"price": 2174,
// 		"createdAt": 1629657492811,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Duncan Roman",
// 		"price": 133,
// 		"createdAt": 1623708909862,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Levi Greene",
// 		"price": 2204,
// 		"createdAt": 1587160366343,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Sharon Stone",
// 		"price": 870,
// 		"createdAt": 1613637700678,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Bertha Potts",
// 		"price": 2099,
// 		"createdAt": 1578537500104,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Mari Duncan",
// 		"price": 2040,
// 		"createdAt": 1587759537317,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Molly Horton",
// 		"price": 57,
// 		"createdAt": 1648245701688,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Colton Bruce",
// 		"price": 633,
// 		"createdAt": 1648759767243,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Ramona Puckett",
// 		"price": 2082,
// 		"createdAt": 1592246869197,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Mechelle Guy",
// 		"price": 1009,
// 		"createdAt": 1641198320670,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Paul Shannon",
// 		"price": 1875,
// 		"createdAt": 1606162136359,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Quin Contreras",
// 		"price": 357,
// 		"createdAt": 1615788200282,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Chester Poole",
// 		"price": 821,
// 		"createdAt": 1617221302814,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Cynthia Head",
// 		"price": 1148,
// 		"createdAt": 1626477548170,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Bertha Hensley",
// 		"price": 291,
// 		"createdAt": 1628591694730,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Thaddeus Cox",
// 		"price": 1174,
// 		"createdAt": 1603716193247,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Cairo Blanchard",
// 		"price": 1350,
// 		"createdAt": 1589990733837,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Igor Holman",
// 		"price": 2259,
// 		"createdAt": 1635737952829,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Ivor Page",
// 		"price": 1887,
// 		"createdAt": 1623113261043,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Natalie Dean",
// 		"price": 390,
// 		"createdAt": 1625543428465,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Hop Gilmore",
// 		"price": 316,
// 		"createdAt": 1598139136139,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Hilary Pearson",
// 		"price": 473,
// 		"createdAt": 1601164534951,
// 		"inStock": true
// 	},
// 	{
// 		"name": "August Kennedy",
// 		"price": 657,
// 		"createdAt": 1597910414941,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Herman Vargas",
// 		"price": 266,
// 		"createdAt": 1623438437584,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Cooper Wilkinson",
// 		"price": 448,
// 		"createdAt": 1586286808482,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Garrison Blankenship",
// 		"price": 778,
// 		"createdAt": 1646026228542,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Dalton Blackwell",
// 		"price": 2063,
// 		"createdAt": 1643881216679,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Kirby Talley",
// 		"price": 1239,
// 		"createdAt": 1642010037365,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Haley Cline",
// 		"price": 2277,
// 		"createdAt": 1651097800465,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Lacey Ruiz",
// 		"price": 1750,
// 		"createdAt": 1621272789762,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Marah Davis",
// 		"price": 802,
// 		"createdAt": 1607407399296,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Janna Powers",
// 		"price": 1049,
// 		"createdAt": 1612566918613,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Dylan Conway",
// 		"price": 335,
// 		"createdAt": 1641517506053,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Aiko Moreno",
// 		"price": 659,
// 		"createdAt": 1641981172684,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Chanda Irwin",
// 		"price": 863,
// 		"createdAt": 1584231536164,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Solomon Caldwell",
// 		"price": 337,
// 		"createdAt": 1639535269865,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Diana Mcintosh",
// 		"price": 942,
// 		"createdAt": 1606799622195,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Christen Reilly",
// 		"price": 841,
// 		"createdAt": 1620580009558,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Mona Monroe",
// 		"price": 1760,
// 		"createdAt": 1591757277852,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Valentine Vinson",
// 		"price": 2156,
// 		"createdAt": 1655254336695,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Mannix Patrick",
// 		"price": 553,
// 		"createdAt": 1585713944106,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Cameron Hammond",
// 		"price": 869,
// 		"createdAt": 1580278595848,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Ahmed Jacobson",
// 		"price": 2069,
// 		"createdAt": 1600345991448,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Lois Carson",
// 		"price": 241,
// 		"createdAt": 1639007220917,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Melissa Herring",
// 		"price": 2216,
// 		"createdAt": 1651130550227,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Kiona Pickett",
// 		"price": 1149,
// 		"createdAt": 1595279452341,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Aidan Ware",
// 		"price": 115,
// 		"createdAt": 1623375832272,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Colleen Santos",
// 		"price": 2208,
// 		"createdAt": 1655670250209,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Lael Keller",
// 		"price": 548,
// 		"createdAt": 1600588614302,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Hermione Franco",
// 		"price": 1111,
// 		"createdAt": 1631472977058,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Jonas Lindsay",
// 		"price": 1005,
// 		"createdAt": 1584739810618,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Ciara French",
// 		"price": 1941,
// 		"createdAt": 1580296900125,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Winter Ramirez",
// 		"price": 2038,
// 		"createdAt": 1643302941953,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Simone Kelly",
// 		"price": 2027,
// 		"createdAt": 1609029214449,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Evan Craft",
// 		"price": 1262,
// 		"createdAt": 1627392125544,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Amal Hart",
// 		"price": 669,
// 		"createdAt": 1634308186921,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Scarlet Campbell",
// 		"price": 237,
// 		"createdAt": 1581791906606,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Lacy Reese",
// 		"price": 2182,
// 		"createdAt": 1585714772465,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Camden Lamb",
// 		"price": 630,
// 		"createdAt": 1653881886586,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Maryam Massey",
// 		"price": 1818,
// 		"createdAt": 1596875213297,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Brooke Lewis",
// 		"price": 2075,
// 		"createdAt": 1616517477190,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Shad Moore",
// 		"price": 741,
// 		"createdAt": 1653612056296,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Kylan Flynn",
// 		"price": 1419,
// 		"createdAt": 1596912905090,
// 		"inStock": false
// 	},
// 	{
// 		"name": "Simon Oneal",
// 		"price": 2207,
// 		"createdAt": 1634743947513,
// 		"inStock": true
// 	},
// 	{
// 		"name": "Harlan Wright",
// 		"price": 849,
// 		"createdAt": 1623906897567,
// 		"inStock": false
// 	}
// ]`

// createRoboDbOnLocalStorage()
// async function createRoboDbOnLocalStorage() {

// 	let robots = await storageService.query(STORAGE_KEY, 0)

// 	if (!robots?.length) {
// 		robots = JSON.parse(gRobots)
// 			.map(robot => {
// 				const id = utilService.makeId(16)

// 				const labels = []
// 				const totalLabels = [...gLabels]
// 				const numOfLabels = utilService.getRandomIntInclusive(1, 4)
// 				for (let i = 0; i < numOfLabels; i++) {
// 					const idx = utilService.getRandomIntInclusive(0, totalLabels.length - 1)
// 					labels.push(totalLabels[idx])
// 					totalLabels.splice(idx, 1)
// 				}

// 				return {
// 					...robot,
// 					_id: id,
// 					labels,
// 					img: `https://robohash.org/${id}?set=set3`
// 				}
// 			})
// 		storageService.createDatabase(STORAGE_KEY, robots)
// 	}
// }

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
	if (robot._id) return await httpService.put(BASE_PATH, robot)

	return await httpService.post(BASE_PATH, robot)

	/* LOCAL STORAGE */
	// if (robot._id) {
	// 	return await storageService.put(STORAGE_KEY, robot)
	// }

	// let updatedRobot = { ...robot, createdAt: Date.now() }
	// return await storageService.post(STORAGE_KEY, updatedRobot)
}

async function remove(robotId) {
	return await httpService.delete(`${BASE_PATH}/${robotId}`)

	/* LOCAL STORAGE */
	// return await storageService.remove(STORAGE_KEY, robotId)
}

async function getStatistics() {
	return await httpService.get(`${BASE_PATH}/statistics`)
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

function getRandomRobotImg() {
	const id = utilService.makeId(16)
	return `https://robohash.org/${id}?set=set3`
}

async function getLabels() {
	return await httpService.get(`${BASE_PATH}/labels`)

	/* LOCAL STORAGE */
	// return gLabels.sort()
}