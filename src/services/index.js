const URL = 'http://localhost:3000/api'
export const register = (data) =>{
    return fetch(`${URL}/user/register`, {
        method : 'POST',
        headers:{
        'Content-Type' : 'application/json',
        },
        body:JSON.stringify(data),
        })
}

export const login = (data) =>{
    return fetch(`${URL}/user/login`, {
        method : 'POST',
        headers:{
        'Content-Type' : 'application/json',
        },
        body:JSON.stringify(data),
        })
}

export const getJobs = () =>{
    return fetch(`${URL}/job`, {
        method : "GET",
        headers :{
            'Content-type' : 'application/json',
        },
    })
}

export const createJob = (data) =>{
    return fetch(`${URL}/job`, {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `${localStorage.getItem('token')}`
        },
        body : JSON.stringify(data),
    })
}

export const updateJob = (id, data) =>{
    return fetch(`${URL}/job/${id}`, {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    }) 
} 

export const getJobById = (id) =>{
    return fetch(`${URL}/job/${id}`,{
        method : 'GET',
        headers : {
            'Content-type' : 'application/json',
            'Authorization' : `${localStorage.getItem('token')}`
        },
    })
}