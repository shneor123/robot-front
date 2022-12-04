import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { Loader } from 'semantic-ui-react'
import { robotService } from '../services/robot.service'
import { utilService } from '../services/util.service'

import { removeRobot } from '../store/actions/robot.action'

import defaultRobotImg from '../assets/img/default-robot.png'
import outOfStockImg from '../assets/img/out-of-stock.png'

export const RobotDetails = () => {

  const user = useSelector(storeState => storeState.userModule.user)
  const { robots } = useSelector(storeState => storeState.robotModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [robot, setRobot] = useState(null)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

  useEffect(() => {
    loadRobot(params.id)
  }, [params, robots])

  const loadRobot = async (robotId) => {
    const robot = await robotService.getById(robotId)
    if (!robot) {
      navigate('/robots')
      dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading robot. Check your link please' } }))
    }
    setRobot(robot)
  }

  const onDeleteRobot = (robotId) => {
    dispatch(removeRobot(robotId))
    navigate('/robots')
    dispatch(loadRobot())
  }

  if (!robot) return <Loader />
  return <section className="robot-details main-layout">
    <h2 className='name page-header'>{robot.name}</h2>
    <div className='img-container'>
      <img className='img' src={robot.img || defaultRobotImg} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
      {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
    </div>
    <p className='labels'><strong>Labels:</strong> {robot.labels.join(', ')}</p>
    <p className='date'><strong>Creation Date:</strong> {utilService.dateToString(robot.createdAt)}</p>
    <p className='price'><strong>Price:</strong> ${utilService.numberWithCommas(robot.price)}</p>
  </section>
}