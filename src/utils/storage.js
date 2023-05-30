

const getPrescriptionsOrdering = (petName) => {
    const order = localStorage.getItem(petName);
    console.log('order', order)
    return JSON.parse(order);
}

const setPrescriptionOrdering = (petName, ordering) => {
    localStorage.setItem(petName, JSON.stringify(ordering));
}

export {
    getPrescriptionsOrdering, 
    setPrescriptionOrdering
}