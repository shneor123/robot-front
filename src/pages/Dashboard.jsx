import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { RobotPreview } from '../cmps/robot-preview'
import { VerticalBarChart } from '../cmps/verticalBarChart'
import { robotService } from '../services/robot.service'
import starFullImg from '../assets/img/star-full.png'
import { setUserMsg } from '../store/actions/user.action'

export const Dashboard = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [statisticData, setStatisticData] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                const statistics = await robotService.getStatistics()
                console.log('statistics', statistics)
                setStatisticData(statistics)
            } catch (err) {
                dispatch(setUserMsg({ type: 'danger', msg: 'Failed loading statistics. You are redirected.' }))
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        })()
    }, [])

    const getDataFromLabelMap = (dataName) => {
        return Object.values(statisticData.labelMap).map(label => label[dataName].toFixed(2))
    }

    if (!statisticData) return 'Loading...'

    return <section className="dashboard main-layout">
        <h2 className='page-header'>Dashboard</h2>

        <section className='dashboard-card'>
            <ul className='clean-list'>
                <li className='total-robots'>
                    <h3>Robots on site</h3>
                    <p className='center-text'>{statisticData.length}</p>
                </li>
                <li>
                    <h3>Most expensive robot</h3>
                    {/* <RobotPreview robot={statisticData.mostExpensive} /> */}
                </li>
                <li>
                    <h3>Least expensive robot</h3>
                    {/* <RobotPreview robot={statisticData.leastExpensive} /> */}
                </li>
                <li className='higher-rate'>
                    <h3>Highest rate robot</h3>
                    {/* <RobotPreview robot={statisticData.highestRate.robot} /> */}
                    <div className='star-rate'>
                        <p>{statisticData.highestRate.avgRate.toFixed(1)}</p>
                        <img src={starFullImg} alt="star-full" />
                    </div>
                </li>
            </ul>
        </section>

        <section className='charts'>
            <VerticalBarChart title={'Average prices per robot label'}
                labels={Object.keys(statisticData.labelMap)}
                labelsData={getDataFromLabelMap('avgPricePerType')}
                hoverTitle='Average Price'
                color="rgb(91, 57, 189)"
            />
            <VerticalBarChart title={'In stock percentage per robot label'}
                labels={Object.keys(statisticData.labelMap)}
                labelsData={getDataFromLabelMap('inStockPercentage')}
                hoverTitle='Percentage'
                color="rgb(133, 22, 213)"
                isPercentage={true}
            />
        </section>
    </section>
}