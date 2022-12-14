import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { PageBar } from '../page-bar'
import { Loader } from '../general/loader'
import { UserImg } from '../general/user-img'
import { RobotList } from '../robot-list'
import { ReviewList } from '../reviews/review-list'
import { ScrollToTop } from '../general/scroll-to-top'

import { userService } from '../../services/user.service'
import { loadRobots } from '../../store/actions/robot.action'
import { loadReviews, removeReview } from '../../store/actions/review.action'

import editImg from '../../assets/img/edit-icon.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


export const UserProfile = () => {
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        (async function () {
            const user = await userService.getById(params.id)
            setUser(user)
            if (!user) navigate('/robots')
            dispatch(loadReviews({ byUserId: user._id }))
            dispatch(loadRobots({ owner: { _id: user._id }, pageIdx: 0, numOfPages: 0 }))
        })()
    }, [params.id])

    const onChangePage = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    const onRemoveReview = (reviewId) => {
        dispatch(removeReview(reviewId))
    }

    const { t } = useTranslation()

    if (!user) return <Loader />
    return (
        <section className="user-profile main-layout">
            <header>
                <UserImg user={user} />
                <h2 className='page-header'>{user.fullname}</h2>
                {loggedInUser?._id === user._id && <Link to={`/users/edit/${user._id}`}>
                    <img className="edit-btn" src={editImg} alt="edit" />
                </Link>}
            </header>
            <section className='robots'>
                <h2 className='sub-header'>{t("header_robot_length")}</h2>
                {(robots?.length > 0) && <>
                    {filterBy.numOfPages > 1 && < PageBar filterBy={filterBy} onSetFilterBy={onChangePage} />}
                    <RobotList robots={robots} />
                </>}
                {!robots?.length && <p>{t("user_profile_robo")}</p>}
            </section>
            <section className='reviews'>
                <h2 className='sub-header'>{t("details_reviews_header")}</h2>
                {reviews?.length > 0 && <ReviewList reviews={reviews} isShowWriter={false} isShowRobot={true} onRemoveReview={onRemoveReview} />}
                {!reviews?.length > 0 && <p>{t("user_profile_review")}</p>}
            </section>
            <ScrollToTop />
        </section>
    )
}