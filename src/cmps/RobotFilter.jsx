import { useEffect, useState } from 'react'
import { robotService } from '../services/robot.service'

export const RobotFilter = ({ filterBy, onSetFilterBy }) => {

    const [tempFilterBy, setTempFilterBy] = useState({ ...filterBy })
    const [sortBy, setSortBy] = useState(null)
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)
    const [labels, setLabels] = useState(null)

    useEffect(() => {
        ; (async function () {
            const labels = await robotService.getLabels()
            setLabels(labels)
        })()
    }, [])

    const onInputChange = ({ target: { name, value, selectedOptions } }) => {
        if (name === 'labels') value = Array.from(selectedOptions).map(option => option.value)
        else if (name === 'inStock') value = value === 'all' ? 'all' : value === 'true'
        setTempFilterBy({ ...tempFilterBy, [name]: value })
    }

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
                <input type="text"
                    name="name"
                    className="search-container"
                    placeholder='Robot name'
                    value={tempFilterBy?.name || ''}
                    onChange={onInputChange}
                />

                <p className="sub-info-title">Search cards, In Stock, labels, and more.</p>
                <div className='margin-between '>
                    <p className="sub-title">In Stock</p>
                    <label htmlFor="">In Stock: </label>
                    <input type="radio" name="inStock" id="filter-in-stock-yes" value={true} onChange={onInputChange} />
                    <label htmlFor="filter-in-stock-yes">Yes</label>
                    <input type="radio" name="inStock" id="filter-in-stock-no" value={false} onChange={onInputChange} />
                    <label htmlFor="filter-in-stock-no">No</label>
                    <input type="radio" name="inStock" id="filter-in-stock-all" value={'all'} onChange={onInputChange} />
                    <label htmlFor="filter-in-stock-all">All</label>
                </div>

                <div className='margin-between labels-container '>
                    <p className="sub-title">Labels</p>
                    <label htmlFor="filter-labels">Labels: </label>
                    <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                        <input type="text" value={tempFilterBy?.labels?.join(', ') || ''} disabled />
                    </span>
                    {labels && isSelectMenuOpen &&
                        <select className="labels-select"
                            name="labels" id="filter-labels"
                            multiple
                            onChange={onInputChange}
                            size={labels.length}
                        >
                            {labels.map(label => <option key={label}>{label}</option>)}
                        </select>}
                </div>

                <p className="sub-title sort">Sort</p>
                <div className='sort-container margin-between'>
                    <label htmlFor="">Sort: </label>
                    <button type='button' className={`sub-btn ${sortBy === 'name' ? 'active' : ''}`} name='name' onClick={onSortByChange}>Name</button>
                    <button type='button' className={`sub-btn ${sortBy === 'price' ? 'active' : ''}`} name='price' onClick={onSortByChange}>Price</button>
                    <button type='button' className={`sub-btn ${sortBy === 'createdAt' ? 'active' : ''}`} name='createdAt' onClick={onSortByChange}>Created Date</button>
                </div>

                <p className="sub-title">Search</p>
                <button className='main-btn' type="submit">Search</button>
            </form>
        </section>
    )
}