import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const [jokes, setJokes] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setJokes(data.jokes);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    };
  
    fetchData();
  }, []);
  const naviget=useNavigate()
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {

    return naviget('/login')
  }
  

  return (
    <div className='home-container'>
      <h1 className='text-center'>Funny Jokes</h1>
      <div className="table-container">
        <table className="jokes-table">
          <thead>
            <tr className='text-center'>
              <th>Category</th>
              <th>Type</th>
              <th>Joke</th>
            </tr>
          </thead>
          <tbody>
            {jokes.map((joke, index) => (
              <tr key={index}>
                <td>{joke.category}</td>
                <td>{joke.type}</td>
                <td>{joke.joke}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
