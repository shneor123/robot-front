import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { PageBar } from '../../cmps/page-bar'
import { Loader } from '../../cmps/general/loader'
import { UserImg } from '../../cmps/general/user-img'
import { RobotList } from '../../cmps/robot-list'
import { ReviewList } from '../../cmps/reviews/review-list'

import { userService } from '../../services/user.service'
import { loadRobots } from '../../store/actions/robot.action'
import { removeReview } from '../../store/actions/review.action'

import editImg from '../../assets/img/edit-icon.png'


export const UserProfile = () => {
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        ; (async function () {
            const user = await userService.getById(params.id)
            setUser(user)
            if (!user) navigate('/robots')
            // dispatch(loadRobots({ owner: { _id: user._id }, pageIdx: 0, numOfPages: 0 })) //FIX -- make eerr white back nedd fix
            dispatch(loadRobots())

        })()
    }, [params.id])

    const onChangePage = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    const onRemoveReview = (reviewId) => {
        dispatch(removeReview(reviewId))
    }

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
                <h2 className='sub-header'>Robots</h2>
                {(robots?.length > 0) && <>
                    {filterBy.numOfPages > 1 && < PageBar filterBy={filterBy} onSetFilterBy={onChangePage} />}
                    <RobotList robots={robots} />
                </>}
                {!robots?.length && <p>The user didn't add robots yet.</p>}
            </section>
            <section className='reviews'>
                <h2 className='sub-header'>Reviews</h2>
                {reviews?.length > 0 && <ReviewList reviews={reviews} isShowWriter={false} isShowRobot={true} onRemoveReview={onRemoveReview} />}
                {!reviews?.length > 0 && <p>The user didn't write reviews yet.</p>}
            </section>
        </section>
    )
}