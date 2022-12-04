export const PageBar = ({ filterBy, onSetFilterBy }) => {

    const onSetPage = (num) => {
        onSetFilterBy({ ...filterBy, pageIdx: num })
    }

    const onSetPrevOrNextPage = (diff) => {
        onSetFilterBy({ ...filterBy, pageIdx: (filterBy.pageIdx || 0) + diff })
    }

    return <ul className="page-bar clean-list">
        <li><button className="sub-btn" onClick={() => onSetPrevOrNextPage(-1)}>←</button></li>

        {[...Array(filterBy.numOfPages).keys()].map(idx => <li key={idx}>
            <button
                className={`sub-btn ${filterBy.pageIdx === idx ? 'active' : ''}`}
                onClick={() => onSetPage(idx)}>
                {idx + 1}
            </button>
        </li>)}

        <li><button className="sub-btn" onClick={() => onSetPrevOrNextPage(1)}>→</button></li>
    </ul>

}