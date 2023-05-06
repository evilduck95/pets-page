import axios, { Axios } from "axios";

const apiUrl = 'http://192.168.1.102:8100';

const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000
});

const petTreatments = (petName, sinceDate, callbackSetter) => {
    const data = {
        petName: petName,
        since: (sinceDate instanceof Date) ? sinceDate.toISOString() : sinceDate
    };
    api.post('/get-treatments', data)
    .then(res => res.data)
    .then(data => callbackSetter(data));
};

const petDetails = (petName, callbackSetter) => {
    const config = {
        params: {
            name: petName
        }
    };
    api.get('/pet', config)
    .then(res => res.data)
    .then(data => callbackSetter(data));
}

export {
    petTreatments,
    petDetails
};
