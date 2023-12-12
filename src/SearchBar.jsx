import { useState } from "react"

const SearchBar = ({things}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredTerms = things.filter((thing) => {
        return thing.name.indexOf(searchTerm) !== -1
    })
    
    return(
        <div>
            <label>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {setSearchTerm(event.target.value)}}
                />
            </label>
            {
                searchTerm.length > 0 ?
                <div> 
                    <h3>Viewing {filteredTerms.length} of {things.length}</h3>
                    <ul>
                        {
                            filteredTerms.map((thing) => {
                                return <li key={thing.id}>{thing.name}</li>
                            })
                        }
                    </ul>
                </div> 
                
                : null
            }
        </div>
    )
}

export default SearchBar