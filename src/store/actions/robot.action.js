import { robotService } from '../../services/robot.service'

export function loadRobots(currFilterBy) {
    return async dispatch => {
        try {
            const { robots, filterBy } = await robotService.query(currFilterBy || { pageIdx: 0, numOfPages: 0 })
            dispatch({ type: 'SET_ROBOTS', robots })
            dispatch({ type: 'SET_FILTERBY', filterBy })
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading robots' } }))
        }
    }
}

export function saveRobot(robot) {
    return async dispatch => {
        const actionType = robot._id ? 'UPDATE_ROBOT' : 'ADD_ROBOT'
        const userMsg = robot._id ? 'Robot updated successfully' : 'Robot was added successfully'
        try {
            const savedRobot = await robotService.save(robot)
            dispatch({ type: actionType, robot: savedRobot })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: userMsg } }))
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed updating robot' } }))
        }
    }
}

export function removeRobot(robotId) {
    return async dispatch => {
        try {
            await robotService.remove(robotId)
            dispatch({ type: 'REMOVE_ROBOT', robotId })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: 'Robot removed successfully' } }))
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed removing robot' } }))
        }
    }
}