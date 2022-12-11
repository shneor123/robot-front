import React from 'react'
export const QuestionModal = ({ question, answers, cbFuncs, setModalFunc }) => {

    const onButtonClick = (ev, idx) => {
        ev.stopPropagation()
        const func = cbFuncs[idx]
        if (func) func()
        setModalFunc(null)
    }

    const onBacklogClick = (ev) => {
        ev.stopPropagation()
        setModalFunc(null)
    }

    return (
        <section className="question-modal">
            <section className='backlog' onClick={onBacklogClick}></section>
            <section className='modal'>
                <h2>{question}</h2>
                <section className='answers'>
                    {answers.map((answer, idx) => <button className="main-btn" key={idx} onClick={(ev) => onButtonClick(ev, idx)}>{answer}</button>)}
                </section>
            </section>
        </section>
    )
}