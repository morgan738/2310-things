import { useParams } from "react-router-dom"
import { useState } from "react"

const Thing = ({things, deleteThing, updateThing}) => {
    const params = useParams()
    const id = params.id*1
    const [name, setName] = useState('')
    
    const thing = things.find((thing) => {
        return id === thing.id
    })
    if(!thing){
        return null
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedThing = {
            id,
            name
        }
        updateThing(updatedThing)
    }

    return(
        <div>
            <h1>{thing.name}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter new name:
                    <input 
                        type="text"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}} 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => {deleteThing(thing)}}>X</button>
        </div>
    )
}

export default Thing