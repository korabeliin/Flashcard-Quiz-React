import React, {useEffect, useRef, useState} from 'react';
import WindowSize from "./WindowSize";
import axios from "axios";

const FlashcardsForm = ({setFlashcards}) => {
    const [categories, setCategories] = useState([]);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const categoryRef = useRef();
    const amountRef = useRef();

    const baseURL = 'https://opentdb.com/api.php';
    const categoriesURL = 'https://opentdb.com/api_category.php';

    useEffect(() => {
        axios.get(baseURL, {
            params: {
                amount: amountRef.current.value,
                category: categoryRef.current.value
            }
        })
            .then(res => {
                const data = res.data.results.map((questionItem, index) => {
                    const answer = decodeString(questionItem.correct_answer);
                    const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
                    return {
                        id: `${index}-${Date.now()}`,
                        question: decodeString(questionItem.question),
                        answer: questionItem.correct_answer,
                        options: options.sort(() => Math.random() - .5)
                    }
                })
                setFlashcards(data)
            });
    }, [isSubmitClicked])

    useEffect(() => {
        axios
            .get(categoriesURL)
            .then(res => {
                setCategories(res.data.trivia_categories)
            })
    }, [])

    const decodeString = str => {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str;
        return textArea.value
    }

    const handleSubmit = e => {
        e.preventDefault()
        setIsSubmitClicked(!isSubmitClicked)
    }

    return (
        <form className='header' onSubmit={handleSubmit}>
            <WindowSize />
            <div className='form-group'>
                <label htmlFor='category-select'>Category</label>
                <select id="category-select" ref={categoryRef}>
                    {categories.map(category =>
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    )}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor='amount'>Number Of Questions</label>
                <input
                    type='number'
                    id='amount'
                    ref={amountRef}
                    min='1'
                    step='1'
                    defaultValue={10}
                />
            </div>
            <div className="form-group">
                <button className='generate_btn'>Generate</button>
            </div>
        </form>
    );
};

export default FlashcardsForm;