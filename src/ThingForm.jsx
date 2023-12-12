import { useState } from "react"

const ThingForm = ({create}) => {
    const [name, setName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(name)
        const newThing = {
            name
        }
        create(newThing)
        setName('')
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default ThingForm