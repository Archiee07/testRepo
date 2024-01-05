import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = "https://localhost:44330/api";

class BackendService {

    createUser(User) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: API_BASE_URL + '/User/Create',
            data: User
        }).catch((error) => {

            this.handleErrors(error);

        });
    }
    deleteUser(id){
        return axios.delete(API_BASE_URL + '/User/Delete?Id=' + id)
        .catch((error) => {
            this.handleErrors(error);

        });

    }


    getAllUser() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(API_BASE_URL + '/User/GetAll', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }

    EditUser(User) {
        return axios({
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            url: API_BASE_URL + '/User/Edit',
            data: User
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    handleErrors(error)
    {
        if (error.response) {
            console.log('Server response: ' + error.response.data);
            console.log('Server response status code: ' + error.response.status);
            console.log('Error:' + error.message);
        } else if (error.request) {
            console.log('Error while sending request to server: ' + error.request);
            console.log('Error:' + error.message);
        } else {
            console.log('Error:' + error.message);
        }
    }
    UserLogin(UserLogin) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: API_BASE_URL + '/User/Login',
            data:UserLogin
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    GetUserdataByParameter(Parameter) {
        return axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: API_BASE_URL + '/User/getUserByParam',
            data:Parameter
        }).catch((error) => {

            this.handleErrors(error);

        });
    }

    GetAllProduct() {
        const headers = {
            'Content-Type': 'application/json'
        };
        return axios.get(API_BASE_URL + '/Product/GetAll', headers)
            .catch((error) => {
                this.handleErrors(error);

            });
    }


}

export default new BackendService()