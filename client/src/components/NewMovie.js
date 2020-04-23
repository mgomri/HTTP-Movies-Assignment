import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const NewMovie = (props) => {
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const history = useHistory();
    const handleChange = e => {
        e.persist();
        e.preventDefault();
        let input = e.target.value;
        if(e.target.name === 'stars'){
            input = input.split(',');
        }
        setNewMovie({
            ...newMovie,
            [e.target.name] : input
        });

    }
    
    const handleSubmit = e  => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', newMovie)
        .then(res => {
            props.setMovieList(res.data);
            history.push('/');
        
        })
        .catch(err => console.log(err))
    }
    return(
        <div className='new-movie'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={handleChange}
                value={newMovie.title}
                placeholder='Title' 
                /><br/>
                <input
                type='text'
                name='director'
                onChange={handleChange}
                value={newMovie.director}
                placeholder='director' 
                /><br/>
                <input
                type='text'
                name='Metascore'
                onChange={handleChange}
                value={newMovie.Metascore}
                placeholder='Metascore' 
                /><br/>
                <input
                type='text'
                name='stars'
                onChange={handleChange}
                value={newMovie.stars}
                placeholder='stars'
                 /><br/>
                 <button className='button'>Add</button>
            </form>
        </div>
    )
}