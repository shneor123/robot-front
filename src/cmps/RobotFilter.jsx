import { useEffect, useState } from 'react'
import { robotService } from '../services/robot.service'
import { useFormRegister } from '../hooks/useFormRegister'

export const RobotFilter = ({ filterBy, onSetFilterBy }) => {
    const [register] = useFormRegister({ ...filterBy }, onSetFilterBy)
    const [tempFilterBy] = useState({ ...filterBy })

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

    return (
        <section className='filter-container'>
            <form onSubmit={onSubmit}>
                <input className="search-container"{...register('name', 'text')} placeholder='Robot name' />
                <p className="sub-info-title">Search cards, In Stock, labels, and more.</p>
                
                <div className='margin-between'>
                    <p className="sub-title">In Stock</p>
                    <label htmlFor="select">Stock:</label>
                    <select {...register('inStock', 'select')} >
                        <option value={"all"}>All </option>
                        <option value={true}>In stock </option>
                        <option value={false}>Out of stock </option>
                    </select>
                </div>

                <div className='margin-between labels-container '>
                    <p className="sub-title">Labels</p>
                    <label htmlFor="filter-labels">Labels: </label>
                    <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                        <input {...register('name', 'text')} value={tempFilterBy?.labels?.join(', ') || ''} disabled />
                    </span>
                    {labels && isSelectMenuOpen &&
                        <select className="labels-select" {...register('labels', 'select')} id="filter-labels" size={labels.length} multiple>
                            {labels.map(label => <option key={label}>{label}</option>)}
                        </select>}
                </div>

                <p className="sub-title sort">Sort</p>
                <div className='sort-container margin-between' onClick={onSortByChange}>
                    <label htmlFor="">Sort: </label>
                    <button type='button' className={`sub-btn ${sortBy === 'name' ? 'active' : ''}`} name='name' >Name</button>
                    <button type='button' className={`sub-btn ${sortBy === 'price' ? 'active' : ''}`} name='price' >Price</button>
                    <button type='button' className={`sub-btn ${sortBy === 'createdAt' ? 'active' : ''}`} name='createdAt' >Created Date</button>
                </div>
                <p className="sub-title">Search</p>
                <button className='main-btn' type="submit">Search</button>
            </form>
        </section >
    )
}