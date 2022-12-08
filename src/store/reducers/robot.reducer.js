
const initialState = {
    robots: [],
    filterBy: {
        pageIdx: 0,
        numOfPages: 0
    }
}

export function robotReducer(state = initialState, action) {
    let robots

    switch (action.type) {
        case 'SET_ROBOTS':
            return { ...state, robots: action.robots }

        case 'ADD_ROBOT':
            robots = [...state.robots, action.robot]
            return { ...state, robots }

        case 'UPDATE_ROBOT':
            robots = state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
            return { ...state, robots }

        case 'REMOVE_ROBOT':
            robots = state.robots.filter(robot => robot._id !== action.robotId)
            return { ...state, robots }

        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}