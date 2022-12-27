import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Loader } from '../cmps/general/loader'
import { RobotPreview } from '../cmps/robot-preview'
import { VerticalBarChart } from '../cmps/vertical-bar-chart'

import { robotService } from '../services/robot.service'
import { setUserMsg } from '../store/actions/user.action'

import starFullImg from '../assets/img/star-full.png'
import { useTranslation } from 'react-i18next'
import { ScrollToTop } from '../cmps/general/scroll-to-top'

export const Dashboard = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [statisticData, setStatisticData] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                const statistics = await robotService.getStatistics()
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

    const { t: translate } = useTranslation()

    if (!statisticData) return <Loader />

    return (
        <section className="dashboard main-layout">
            <h2 className='page-header'>{translate("header_dashboard")}</h2>

            <section className='dashboard-card'>
                <ul className='clean-list'>
                    <li className='total-robots'>
                        <h3>{translate("dashboard_on_site")}</h3>
                        <p className='center-text'>{statisticData.length}</p>
                    </li>
                    <li>
                        <h3>{translate("dashboard_most")}</h3>
                        <RobotPreview robot={statisticData.mostExpensive} />
                    </li>
                    <li>
                        <h3>{translate("dashboard_least")}</h3>
                        <RobotPreview robot={statisticData.leastExpensive} />
                    </li>
                    <li className='higher-rate'>
                        <h3>{translate("dashboard_highest")}</h3>
                        <RobotPreview robot={statisticData.highestRate.robot} />
                        <div className='star-rate'>
                            <p>{statisticData.highestRate.avgRate.toFixed(1)}</p>
                            <img src={starFullImg} alt="star-full" />
                        </div>
                    </li>
                </ul>
            </section>

            <section className='charts'>
                <VerticalBarChart title={translate("dashboard_title_price")}
                    labels={Object.keys(statisticData.labelMap)}
                    labelsData={getDataFromLabelMap('avgPricePerType')}
                    hoverTitle='Average Price'
                    color="rgb(91, 57, 189)"
                />
                <VerticalBarChart title={translate("dashboard_title_in_stock")}
                    labels={Object.keys(statisticData.labelMap)}
                    labelsData={getDataFromLabelMap('inStockPercentage')}
                    hoverTitle='Percentage'
                    color="rgb(133, 22, 213)"
                    isPercentage={true}
                />
            </section>
            <ScrollToTop />
        </section>
    )
}