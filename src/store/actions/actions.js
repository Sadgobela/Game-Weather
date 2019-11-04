import axios from 'axios';

export const loadCountries = () => ({
    type: 'COUNTRY_LIST_LOAD',
    payload: new Promise((resolve, reject) => {
        axios.get('http://api.openweathermap.org/data/2.5/group?id=3128760,611717,2867714,2643743&units=imperial&appid=c91f2ae40be039b7e2d04ed562c8a7e0')
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
        })
    })
});

export const saveAnswer = (answer) => ({
    type: 'ADD_ANSWER',
    payload: new Promise((resolve) => {
        resolve(answer)
    })
});

export const changeTempType = (tempType) => ({
    type: 'TEMP_TYPE_CHANGE',
    payload: new Promise((resolve) => {
        resolve(tempType)
    })
});