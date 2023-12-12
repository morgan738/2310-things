import './App.css'
import { useState, useEffect } from 'react'
import {Link, Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Thing from './Thing'
import ThingForm from './ThingForm'
import SearchBar from './SearchBar'

function App() {
  const [things, setThings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchThings = async () => {
      const {data} = await axios.get('https://morgan-things-api.onrender.com/api/things')
      setThings(data)
    }

    fetchThings()
  },[])

  const create = async (newThing) => {
    const {data} = await axios.post('https://morgan-things-api.onrender.com/api/things', newThing)
    setThings([...things, data])
    navigate(`/things/${data.id}`)
  }

  const deleteThing = async (thing) => {
    await axios.delete(`https://morgan-things-api.onrender.com/api/things/${thing.id}`)
    setThings(things.filter((_thing) => {return _thing.id !== thing.id }))
    navigate('/')
  }

  const updateThing = async (updatedThing) => {
    const {data} = await axios.put(`https://morgan-things-api.onrender.com/api/things/${updatedThing.id}`, updatedThing)
    setThings(things.map((thing) => {return thing.id !== data.id ? thing : data}))
  }

  return (
    <div>
      <h1>Morgan Things</h1>
      <h3>Create new thing:</h3>
      <ThingForm create={create}/>
      <ul>
        {
          things.map((thing) => {
            return (
              <li key={thing.id}>
                <Link to={`/things/${thing.id}`}>
                  {thing.name}
                </Link>
              </li>
            )
          })
        }
      </ul>

      <Routes>
        <Route path='/things/:id' element={<Thing things={things} deleteThing={deleteThing} updateThing={updateThing}/>}/>
      </Routes>
      <h4>Search:</h4>
      <SearchBar things={things}/>
    </div>
  )
}

export default App
