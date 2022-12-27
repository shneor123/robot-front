import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PageBar } from './page-bar'
import { robotService } from '../services/robot.service'
import { useFormRegister } from '../hooks/useFormRegister'
import { useTranslation } from 'react-i18next'



export const RobotFilter = ({ user, filterBy, onSetFilterBy }) => {
    const [register] = useFormRegister({ ...filterBy }, onSetFilterBy)
    const [tempFilterBy, setTempFilterBy] = useState({ ...filterBy })

    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)
    const [sortBy, setSortBy] = useState(null)
    const [labels, setLabels] = useState(null)

    useEffect(() => {
        ; (async function () {
            const labels = await robotService.getLabels()
            setLabels(labels)
        })()
    }, [])

    const onSortByChange = ({ target: { name } }) => {
        if (sortBy === name) return setSortBy(null)
        setSortBy(name)
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const updatedFilterBy = { ...tempFilterBy, sortBy, pageIdx: 0 }
        onSetFilterBy(updatedFilterBy)
    }

    const onInputChange = ({ target: { name, value, selectedOptions } }) => {
        if (name === 'labels') value = Array.from(selectedOptions).map(option => option.value)
        else if (name === 'inStock') value = value === 'all' ? 'all' : value === 'true'
        setTempFilterBy({ ...tempFilterBy, [name]: value })
    }

    const { t: translate } = useTranslation()

    return (
        <section className='filter-container'>
            {user && <Link className='add-robot-btn main-btn center-text' to='/robots/edit'>{translate("filter_btn")}</Link>}
            <div className='page-bar-container'>
                <PageBar filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
            <form onSubmit={onSubmit}>
                <input className="search-container"{...register('name', 'text')} placeholder='Robot name' />
                <p className="sub-info-title">{translate("filter_p")}</p>
                {/* 
                <div className='margin-between labels-container '>
                    <p className="sub-title">{translate("filter_sort")}</p>
                    <label htmlFor="filter-labels">{translate("filter_labels")}: </label>
                    <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                        <input {...register('name', 'text')} value={tempFilterBy?.labels} disabled />
                    </span>
                    {labels && isSelectMenuOpen &&
                        <select className="labels-select" {...register('labels', 'select')} id="filter-labels" size={labels.length} multiple>
                            {labels.map(label => <option key={label}>{label}</option>)}
                        </select>}
                </div> */}

                <div className='margin-between labels-container '>
                    <p className="sub-title">{translate("filter_sort")}</p>
                    <label htmlFor="filter-labels">{translate("filter_labels")} </label>
                    <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                        <input type="text" value={tempFilterBy?.labels?.join(', ') || ''} disabled />
                    </span>
                    {labels && isSelectMenuOpen && <select className="labels-select" name="labels" id="filter-labels" multiple onChange={onInputChange} size={labels.length}>
                        {labels.map(label => <option key={label}>{label}</option>)}
                    </select>}
                </div>
                <div className='sort-container margin-between' onClick={onSortByChange}>
                    <label htmlFor="">{translate("filter_sort")}: </label>
                    <button type='button' className={`sub-btn ${sortBy === 'name' ? 'active' : ''}`} name='name' >{translate("filter_btn_name")}</button>
                    <button type='button' className={`sub-btn ${sortBy === 'price' ? 'active' : ''}`} name='price' >{translate("filter_btn_price")}</button>
                    <button type='button' className={`sub-btn ${sortBy === 'createdAt' ? 'active' : ''}`} name='createdAt' >{translate("filter_btn_created")}</button>
                </div>

                <p className="sub-title">{translate("filter_btn_search")}</p>
                <button className='main-btn' type="submit">{translate("filter_btn_search")}</button>
            </form>
        </section >
    )
}