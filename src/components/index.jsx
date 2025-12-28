import { useState, useEffect } from 'react'
import Suggestion from './suggestion'

import './index.css'

export default function SearchAutocomplete({ url }) {

    // fetch-user holders
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    // input changes
    const [search, setSearch] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredUsersData, setFilteredUsersData] = useState([])

    // --------------------------------------
    // fetch
    async function getUsers() {
        setLoading(true)
        try {
            const res = await fetch(url)

            if (res.status != 200) {
                console.log('unexpected return', res);
                return
            }

            const data = await res.json()

            data?.length
                ? (
                    setUsers(data.map(user => user.name)),
                    setLoading(false)
                )
                : console.log("no valid [] data exists", data);

        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error);
        }
    }

    // --------------------------------------
    // handlers

    function handleChange(el) {

        const query = el.toLowerCase()
        setSearch(query)

        if (query.length < 2) { setFilteredUsersData([]); return }

        const filteredData =
            users && users?.length
                ? users.filter(user => user
                    .toLowerCase()
                    .split(' ')
                    .join('')
                    .indexOf(query) > -1
                )
                : []


        setShowDropdown(true)
        setFilteredUsersData([...filteredData])

    }


    function handleClick(val) {
        setSearch(val)
        setFilteredUsersData([])
    }

    // --------------------------------------
    // sense of change
    useEffect(() => {
        getUsers()
    }, [])
    // --------------------------------------

    // page
    return (
        <>
            <div className="search">
                <div className="search__input-box">
                    <input
                        onChange={(e) => handleChange(e.target.value)}
                        value={search}
                        type="text"
                        name='search-users'
                        placeholder=" "
                        className="search__input"
                        id="search-users"
                    />
                    <label htmlFor="search-users" className="search__label">
                        Search for User
                    </label>
                </div>

                <div className="search__result-box">
                   
                    {filteredUsersData.length > 0 && (
                        <div className="search__result-box">
                            <Suggestion handleClick={handleClick} data={filteredUsersData} />
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}





