let axios = require('axios');
let config = require('./config');

const axiosReq = (method, route, data) => {
    return axios({
        method: method,
        url: config.BASE_URL+route,
        headers: {"Content-Type" : "application/json"},
        data: data,
    })
    .then((result)=>{
        return result
    })
    .catch((err)=>{
        return err;
    })
}

const APIService = {
    registerAsSeeker: (email, password, name, type, address, eth) =>{
        return axiosReq('post','auth/register', {email: email, password: password, name: name, userType: type, address: address, eth: eth});
    },
    login: async(email, password) =>{
        return await axiosReq('post','auth/login', {email: email, password: password});
    },
    getUser: async(id) =>{
        return await axiosReq('get',`user/${id}`);
    },
    createProject: async(name,target,description,address,id,deposit,eth) => {
        return await axiosReq('post','project/create',{seeker: id,deposit: deposit,address:address,name:name,description:description,totalRequiredTokens: target});
    },
    getAllProjects: async() => {
        return await axiosReq('get','project/all');
    },
    getProject: async (id) => {
        return await axiosReq('get',`project/${id}`);
    },
    sendFile: async(id, formData) => {
        return await axios.post(config.BASE_URL+`user/seeker/upload/${id}`, formData, {});
    },
    uploadProjectPhoto: async(id,data) => {
        return await axios.post(config.BASE_URL+`project/upload/${id}`, data, {})
    },
    addTransaction: async(investor,eth)=>{
        return await axios(config.BASE_URL+`/add`,investor,eth)
    },
    getProjects: async(id)=>{
        return await axios.get(config.BASE_URL+`/${id}`)
    }
}

export default APIService;