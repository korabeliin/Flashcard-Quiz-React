import React, {useState} from "react";

import './App.css';
import FlashcardList from "./components/FlashcardList";
import FlashcardsForm from "./components/FlashcardsForm";

const App = () => {
    const [flashcards, setFlashcards] = useState([]);

    return (
        <div className="container">
            <FlashcardsForm setFlashcards={setFlashcards} />
            <FlashcardList flashcards={flashcards} />
        </div>
    );
}

export default App;