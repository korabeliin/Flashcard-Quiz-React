import React from 'react';
import Flashcard from "./Flashcard";

const FlashcardList = ({flashcards}) => {
    return (
        <div className='card-grid'>
            {flashcards.map(card =>
                <Flashcard flashcard={card} key={card.id} />
            )}
        </div>
    );
};

export default FlashcardList;