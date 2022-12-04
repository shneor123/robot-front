import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { robotService } from '../services/robot.service'

import defaultRobotImg from '../assets/img/default-robot.png'
import { saveRobot } from '../store/actions/robot.action'
import { Loader } from '../cmps/general/loader'

export const RobotEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [robot, setRobot] = useState(robotService.getEmptyRobot())
    const [labels, setLabels] = useState(null)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        ; (async function () {
            const labels = await robotService.getLabels()
            setLabels(labels)
        })()
    }, [])

    useEffect(() => {
        if (params.id) (async function () {
            const robot = await robotService.getById(params.id)
            setRobot(robot)
        })();
    }, [params.id])

    useEffect(() => {
        if (!user) return navigate('/robots')
        //user is not admin, robot is not new, and the robot owner is not the user => return
        if (!user.isAdmin && robot._id && robot.owner._id !== user._id) return navigate('/robots')
    }, [robot])

    const onChangeInput = ({ target: { name, value } }) => {
        if (name === 'labels') {
            let updatedLabels = [...robot.labels]

            if (updatedLabels.includes(value)) updatedLabels = updatedLabels.filter(label => label !== value)
            else updatedLabels.push(value)

            value = updatedLabels.sort()
        } else if (name === 'inStock') {
            value = value === 'true'
        }

        setRobot({ ...robot, [name]: value })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (!robot.labels.length) {
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'You have to choose at least 1 label' } }))
            return
        }
        dispatch(saveRobot(robot))
        navigate('/robots')
    }

    if (!user) return <Loader />
    return (
        <section className="robot-edit main-layout">
            <h2 className='page-header'>{robot._id ? 'Edit' : 'Add'} Robot</h2>
            <Link to={`/robots/${robot._id}`}>
                <button className='back-btn'>Back</button>
            </Link>

            <form className='edit-container' onSubmit={onSubmit}>
                <div className="basic-details-container">

                    <label>
                        <h3>Name</h3>
                        <input type="text" name='name' id='edit-name' onChange={onChangeInput} value={robot.name} />
                    </label>

                    <label>
                        <h3>Price</h3>
                        <input type="number" min={1} name='price' id='edit-price' onChange={onChangeInput} value={robot.price} />
                    </label>

                    <label>
                        <h3>Image link</h3>
                        <input type="url" name='img' id='edit-img' onChange={onChangeInput} value={robot.img} />
                        <img className='img-edit' src={robot.img || defaultRobotImg} onError={({ target }) => target.src = defaultRobotImg} alt="default robot" />
                    </label>

                </div>
                <div className="stock-labels-container">
                    <label><h3>Is in stock?</h3>
                        <label>Yes
                            <input type="radio" name="inStock" id="edit-in-stock-yes" value={true} onChange={onChangeInput} checked={robot.inStock} />
                        </label>
                        <label> No
                            <input type="radio" name="inStock" id="edit-in-stock-no" value={false} onChange={onChangeInput} checked={!robot.inStock} />
                        </label>
                    </label>

                    <div className='labels'>
                        {labels && <>
                            <label htmlFor={labels[0] || ''}>Labels: </label>
                            <ul className='clean-list gap'>
                                {labels.map(label => <li key={label}>
                                    <input type="checkbox" name='labels' id={label} onChange={onChangeInput} value={label} checked={robot.labels.includes(label)} />
                                    <label htmlFor={label}>{label}</label>
                                </li>)}
                            </ul>
                        </>}
                    </div>

                </div>
                <button className="save-btn" type="submit">Save</button>

            </form>
        </section>
    )
}