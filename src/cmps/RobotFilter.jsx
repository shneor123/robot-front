import { useEffect, useState } from 'react'
import { robotService } from '../services/robot.service'
import { useForm } from '../hooks/useForm'
import { useFormRegister } from '../hooks/useFormRegister'

export const RobotFilter = ({ filterBy, onSetFilterBy }) => {

    const [tempFilterBy, handleChange, setTempFilterBy] = useForm({
        ...filterBy
    })

    const [register] = useFormRegister({
        ...filterBy
    }, onSetFilterBy)


    const [sortBy, setSortBy] = useState(null)
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)
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
                {/* <div className='margin-between'>
                    <p className="sub-title">In Stock</p>
                    <label htmlFor="">In Stock: </label>
                    <input type="radio" name="inStock" id="filter-in-stock-yes" value={true} onChange={handleChange} />
                    <label htmlFor="filter-in-stock-yes">Yes</label>
                    <input type="radio" name="inStock" id="filter-in-stock-no" value={false} onChange={handleChange} />
                    <label htmlFor="filter-in-stock-no">No</label>
                    <input type="radio" name="inStock" id="filter-in-stock-all" value={'all'} onChange={handleChange} />
                    <label htmlFor="filter-in-stock-all">All</label>
                </div> */}

                <label htmlFor="select">Stock:</label>
                <select {...register('select', 'select')} id="select" name="inStock" >
                    <option value={"all"}>All </option>
                    <option value={true}>In stock </option>
                    <option value={false}>Out of stock </option>
                </select>


                <div className='margin-between labels-container '>
                    <p className="sub-title">Labels</p>
                    <label htmlFor="filter-labels">Labels: </label>
                    <span onChange={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                        <input type="text" value={tempFilterBy?.labels?.join(', ') || ''} disabled />
                    </span>
                    {labels && isSelectMenuOpen &&
                        <select className="labels-select"
                            name="labels" id="filter-labels"
                            multiple
                            onChange={handleChange}
                            size={labels.length}
                        >
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
        </section>
    )
}