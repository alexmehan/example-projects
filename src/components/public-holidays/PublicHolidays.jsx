import {useState, useEffect} from 'react'
import Explanation from '../Explanation'

export default function PublicHolidays() {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [holidays, setHolidays] = useState([])

    /* Gets all countries in the Open Holidays Api list.
    * Setting the languageIsoCode to EN will only return the English names of the country
    * THis means that country.name will only return one item, whereas if this isn't set can return multiple
    * TODO: Check if there is only on item in the name array
    */

    useEffect(() => {
        fetch('https://openholidaysapi.org/Countries?languageIsoCode=EN')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Get Countries was not ok')
                }
                return response.json()
            })
            .then((jsonData) => {
                setCountries(jsonData)
                setSelectedCountry({
                    isoCode: jsonData[25].isoCode,
                    name: jsonData[25].name[0].text
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (!selectedCountry) return
        fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry.isoCode}&validFrom=${selectedYear}-01-01&validTo=${selectedYear}-12-31&languageIsoCode=EN`)
            .then((response => {
                if (!response.ok) {
                    throw new Error("Get Holiday response was not ok")
                }
                return response.json()
            }))
            .then((jsonData) => {
                console.log(jsonData)
                setHolidays(jsonData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [selectedCountry, selectedYear])

    const countryList = countries.map(country => {
        const isoCode = country.isoCode
        const countryName = country.name[0].text
        return <option  key={isoCode} value={isoCode}>{countryName}</option>
    })

    const holidayList = holidays.map(holiday => {
        const date = new Date(holiday.startDate)
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric"
        })
        return <li><strong>{formattedDate}</strong> - {holiday.name[0].text}</li>
    })

    function setYearList() {
        const currentYear = new Date().getFullYear()
        const yearList = []
        for (let x = 2020; x <= currentYear + 5; x++) {
            yearList.push(<option value={x}>{x}</option>)
        }
        return yearList
    }

    // Can get the country name from country list, but saving selectedCountry as object seems easier
    function changeCountry(e) {
        const selectedIsoCode = e.target.value
        const countryName = countries.find(c => c.isoCode === selectedIsoCode)
        setSelectedCountry({
            isoCode: selectedIsoCode,
            name: countryName.name[0].text ? countryName.name[0].text : ""
        })
    }

    function changeYear(e) {
        setSelectedYear(e.target.value)
    }

     if (countries.length === 0) return <p>Loading...</p>;

    return (
        <section className="py-8 border-y border-black">
            <h2 className="font-extrabold text-4xl mb-8 text-center">Fetch Public Holidays</h2>
            <Explanation>
                This component fetches the public holidays of different countries based on the OpenHolidaysAPI.
                It includes using useEffect, useState, array manipulation, fetching data, time & date modification and working with an external API.
            </Explanation>

            <p className="text-center">Select the Country and Year you would like to see Public Holidays for</p>
            <div className="w-[50rem] m-auto">
                <div className="flex justify-center mt-4">
                    <select className="border mr-4" value={selectedCountry.isoCode} onChange={changeCountry}>
                        {countryList}
                    </select>
                    <select className="border" value={selectedYear} onChange={changeYear}>
                        {setYearList()}
                    </select>
                </div>
                {selectedCountry !== null && (
                    <div className="py-4">
                        <h3 className="font-bold text-2xl mb-4">Public Holidays for {selectedCountry.name} {selectedYear}</h3>
                        <ul>
                            {holidayList}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}