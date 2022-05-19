import React, {useEffect, useRef, useState} from 'react';

const Flashcard = ({flashcard}) => {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <div
            style={{height: height}}
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
        >
            <div className='back' ref={backEl}>
                {flashcard.answer}
            </div>

            <div className="front" ref={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                    {flashcard.options.map(option =>
                        <div
                            className='flashcard-option'
                            key={option}
                        >
                            {option}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Flashcard;