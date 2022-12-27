import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { Loader } from '../cmps/general/loader'
import { QuestionModal } from '../cmps/general/question-modal'
import { ChatRoom } from '../cmps/chat-room'
import { ReviewList } from '../cmps/reviews/review-list'
import { ReviewForm } from '../cmps/reviews/review-form'

import { utilService } from '../services/basic/util.service'
import { robotService } from '../services/robot.service'
import { removeRobot } from '../store/actions/robot.action'
import { loadReviews, removeReview, saveReview } from '../store/actions/review.action'

import defaultRobotImg from '../assets/img/default-robot.png'
import outOfStockImg from '../assets/img/out-of-stock.png'
import { useTranslation } from 'react-i18next'


export const RobotDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [robot, setRobot] = useState(null)
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)
    const { robots } = useSelector(storeState => storeState.robotModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)


    useEffect(() => {
        loadRobot(params.id)
    }, [params, robots])

    const loadRobot = async (robotId) => {
        const robot = await robotService.getById(robotId)
        if (!robot) navigate('/robots')
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

    const onRemoveReview = (reviewId) => {
        dispatch(removeReview(reviewId))
    }

    const onToggleModal = () => {
        setIsReviewFormOpen(!isReviewFormOpen)
    }

    const { t: translate } = useTranslation()


    if (!robot) return <Loader />
    const stockDesc = robot.inStock ? '' : translate("details_label_stock_not")
    const color = robot.inStock ? 'green' : 'red'
    return (
        <section className="details-page-container">
            <Link className='back-btn' to={'/robots'}> {translate("details_back")} </Link>
            <div className="details-section">

                <div className="reviews-container">
                    <h1>{translate("details_reviews_header")}:</h1>
                    <ReviewForm isOpen={isReviewFormOpen} onAddReview={onAddReview} onToggleModal={onToggleModal} />
                    {reviews?.length > 0 && <ReviewList reviews={reviews} isShowWriter={true} isShowRobot={false} onRemoveReview={onRemoveReview} />}
                    {!reviews?.length > 0 && !isReviewFormOpen &&
                        <p>{translate("details_reviews_no")} {user ? translate("details_reviews_be") : <Link to="/signup" className='signup-link'>{translate("details_reviews_create")}</Link>} {user ? '' : translate("details_reviews_and")} {translate("details_reviews_first")}!</p>
                    }
                    <div className={`screen ${isReviewFormOpen ? 'open' : ''}`} onClick={onToggleModal}></div>
                </div>

                <div className="details-container">
                    <p className="name"><strong>{translate("filter_btn_name")}: </strong>{robot.name}</p>
                    <p className='labels'><strong>{translate("filter_labels")}: </strong>{robot.labels.join(' ,')}</p>
                    <p className="price"><strong>{translate("filter_btn_price")}: </strong>US ${robot.price}</p>
                    <h5 style={{ color }}>{stockDesc} {translate("details_label_stock")}</h5>
                    <img className='img' src={robot.img || defaultRobotImg} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
                    {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
                    <span className='data'><strong>{translate("details_label_uploaded")}: </strong>{utilService.dateToString(robot.createdAt)}</span>

                    {user && <div className='buttons-container'>
                        <button className='review-form-btn' onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}>{isReviewFormOpen ?  translate("details_btn_close") : translate("details_btn_add")}</button>
                        {(user.isAdmin || user._id === robot.owner._id) && <>
                            <Link to={`/robots/edit/${robot._id}`}>{translate("details_btn_edit")}</Link>
                            <button onClick={() => setIsQuestionModalOpen(true)}>{translate("details_btn_delete")}</button>
                        </>}
                    </div>}
                </div>

                {isQuestionModalOpen && <QuestionModal question={'Are you sure you want to delete this robot?'}
                    answers={['Cancel', 'Yes']}
                    cbFuncs={[null, () => onDeleteRobot(robot._id)]}
                    setModalFunc={setIsQuestionModalOpen}
                />}
            </div>
            <ChatRoom loggedInUser={user} chat={robot.chat} chatRoomId={robot._id} chatTitle={robot.name} />
        </section>
    )
}