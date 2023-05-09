import { test, describe, expect } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { filterByKeywordAndColumn } from '../src/util/util'

const testDataStations = [{
    Adress: "Hanaholmsstranden 1",
    FID: 1,
    ID: 501,
    Kapasiteet: 10,
    Kaupunki: "Espoo",
    Name: "Hanasaari",
    Namn: "Hanaholmen",
    Nimi: "Hanasaari",
    Operaattor: "CityBike Finland",
    Osoite: "Hanasaarenranta 1",
    Stad: "Esbo",
    dbId: 1,
    x: 24.840319,
    y: 60.16582
    },
    {
    Adress: "Kägelviksvägen 2",
    FID: 2,
    ID: 503,
    Kapasiteet: 28,
    Kaupunki: "Espoo",
    Name: "Keilalahti",
    Namn: "Kägelviken",
    Nimi: "Keilalahti",
    Operaattor: "CityBike Finland",
    Osoite: "Keilalahdentie 2",
    Stad: "Esbo",
    dbId: 2,
    x: 24.827467,
    y: 60.171524,
    },
    {
    Adress: "Westendvägen 1",
    FID: 3,
    ID: 505,
    Kapasiteet: 16,
    Kaupunki: "Espoo",
    Name: "Westendinasema",
    Namn: "Westendstationen",
    Nimi: "Westendinasema",
    Operaattor: "CityBike Finland",
    Osoite: "Westendintie 1",
    Stad: "Esbo",
    dbId: 3,
    x: 24.805758,
    y: 60.168266
    },
    {
    Adress: "abcd 1",
    FID: 4,
    ID: 508,
    Kapasiteet: 18,
    Kaupunki: " ",
    Name: "TestStation",
    Namn: "TestStation",
    Nimi: "TestStation",
    Operaattor: "CityBike Finland",
    Osoite: "abcd 1",
    Stad: "Helsingfors",
    dbId: 4,
    x: 26.805758,
    y: 61.168266
        }
]

test('Tests are working', () => {
    assert.ok('ok')
})

test('Keyword filter from util folder', () => {

})

/**
 * 
 */