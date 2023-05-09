import { Bikestation, Trip } from "../types/types";


export const filterByKeywordAndColumn = (stations: Bikestation[], keyword: string, column: number) => {
    switch (column) {
        case 0:
            return stations.filter(station => {
                return station.Name?.toLowerCase().includes(keyword.toLowerCase())
            })
        case 1:
            return stations.filter(station => {
                return station.ID.toString() === keyword
            })
        case 2:
            return stations.filter(station => {
                return station.Adress?.toLowerCase().includes(keyword.toLowerCase())
            })
        case 3:
            return stations.filter(station => {
                let city = ''
                if (station.Kaupunki) city = station.Kaupunki.length > 1? station.Kaupunki : 'Helsinki'
                return city.toLowerCase().includes(keyword.toLowerCase())
            })
        default:
            return []
    }
}