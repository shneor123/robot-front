import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { robotService } from '../services/robot.service'

import defaultRobotImg from '../assets/img/default-robot.png'
import outOfStockImg from '../assets/img/out-of-stock.png'
import { utilService } from '../services/util.service'
import { removeRobot } from '../store/actions/robot.action'
import { QuestionModal } from '../cmps/general/QuestionModal'
import { loadReviews, saveReview } from '../store/actions/review.action'
import { ReviewForm } from '../cmps/review/ReviewForm'
import { ReviewList } from '../cmps/review/ReviewList'
import { ChatRoom } from '../cmps/chatRoom'

export const RobotDetails = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const { robots } = useSelector(storeState => storeState.robotModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const [robot, setRobot] = useState(null)
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

    useEffect(() => {
        loadRobot(params.id)
    }, [params, robots])

    const loadRobot = async (robotId) => {
        const robot = await robotService.getById(robotId)
        if (!robot) {
            navigate('/robots')
            /* FIX - WE DONT GET TO HERE */
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading robot. Check your link please' } }))
        }
        dispatch(loadReviews({ byRobotId: robot._id }))
        setRobot(robot)
    }

    const onDeleteRobot = (robotId) => {
        dispatch(removeRobot(robotId))
        navigate('/robots')
    }

    const onAddReview = (review) => {
        review.robotId = robot._id
        dispatch(saveReview(review))
        setIsReviewFormOpen(false)
    }

    if (!robot) return 'Loading...'

    return (
        <section className="robot-details main-layout">
            <h2 className='name page-header'>{robot.name}</h2>
            <div className='img-container'>
                <img className='img' src={robot.img || defaultRobotImg} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
                {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
            </div>
            <p className='labels'><strong>Labels:</strong> {robot.labels.join(', ')}</p>
            <p className='date'><strong>Creation Date:</strong> {utilService.dateToString(robot.createdAt)}</p>
            <p className='price'><strong>Price:</strong> ${utilService.numberWithCommas(robot.price)}</p>

            {user && <div className='buttons-container'>
                <button className='review-form-btn' onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}>{isReviewFormOpen ? 'Close Form' : 'Add Review'}</button>
                {(user.isAdmin || user._id === robot.owner._id) && <>
                    <Link to={`/robots/edit/${robot._id}`}>Edit</Link>
                    <button onClick={() => onDeleteRobot(robot._id)}>Delete</button>

                </>}
            </div>}

            {isQuestionModalOpen && <QuestionModal question={'Are you sure you want to delete this robot?'}
                answers={['Cancel', 'Yes']}
                cbFuncs={[null, () => onDeleteRobot(robot._id)]}
                setModalFunc={setIsQuestionModalOpen}
            />}

            <ReviewForm isOpen={isReviewFormOpen} onAddReview={onAddReview} />

            {reviews?.length > 0 && <ReviewList reviews={reviews} isShowWriter={true} isShowRobot={false} />}
            {!reviews?.length > 0 && !isReviewFormOpen &&
                <p>No one wrote a review for this robot. {user ? 'Be ' : <Link to="/signup" className='signup-link'>Create an account</Link>}
                    {user ? '' : ' and be '}
                    the first one!
                </p>
            }
            <ChatRoom loggedInUser={user} chat={robot.chat} chatRoomId={robot._id} chatTitle={robot.name + ' Chat'} />
        </section>
    )
}