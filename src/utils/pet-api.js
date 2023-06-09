import axios from "axios";

const apiUrl = `http://${process.env.API_URL}`;

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

const addTreatment = (petName, medicationName, dateTime, resultCallback, missed = false) => {
    const data = {
        petName: petName,
        medicationName: medicationName,
        treatementTime: dateTime.toISOString(),
        missed: missed
    };
    console.log('Body', data)
    api.post('/treat', data)
    .then(res => res.data)
    .then(data => resultCallback(data));
}

const amendTreatment = (id, given, resultCallback) => {
    const data = {
        id: id,
        given: given
    };
    api.put('/amend-treatment', data)
    .then(res => res.data)
    .then(data => data.given)
    .then(given => resultCallback(given));
}

const deleteTreatment = (id, resultCallback) => {
    const params = {
        id: id
    };
    api.delete('/treatment', { params: params })
    .then(res => res.status)
    .then(status => resultCallback(status === 204, id));
}

const prescribeMedication = (petName, medicationName, medicationBrand, dose, count, frequency, resultCallback) => {
    const data = {
        petName: petName,
        medicationName: medicationName,
        medicationBrand: medicationBrand,
        dose: dose,
        count: count,
        frequency: frequency
    };
    api.post('/prescribe', data)
    .then(res => res.data)
    .then(data => resultCallback(data));
}

const removePrescription = (id, resultCallback) => {
    const params = {
        id: id
    };
    api.delete('/prescription', { params: params })
    .then(res => res.status)
    .then(status => resultCallback(status === 204, id));
}

export {
    petTreatments,
    petDetails,
    addTreatment,
    amendTreatment,
    deleteTreatment,
    prescribeMedication,
    removePrescription
};
