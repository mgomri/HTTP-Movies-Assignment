import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

export const UpdateForm = (props) => {
    const[movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const params = useParams();
    const history = useHistory();

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
             .then(res => setMovie(res.data))
             .catch(res => console.log(res))
    }, []);
    
    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
            
        });
    }

    
    const handleSubmit = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            props.setMovieList(res.data);
            history.push(`/movies/${params.id}`)
        })
        .catch(err => console.log(err));
    }
    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input 
                    className='input'
                    type='text'
                    name='title'
                    value={movie.title}
                    onChange={handleChange}
                    placeholder='title'
                /><br/>
                <input 
                    className='input'
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={handleChange}
                    placeholder='director'
                /><br/>
                <input 
                    className='input'
                    type='text'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                    placeholder='metascore'
                /><br/>
                <input 
                    className='input'
                    type='text'
                    name='stars'
                    value={movie.stars}
                    onChange={handleChange}
                    placeholder='stars'
                /><br/>

                <button className='button' type='submit'>Update Movie</button>
                
            </form>
        </div>
    )
} 