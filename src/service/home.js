import { ERP } from './_base/endpoint';
import axios from 'axios';

class homeService {

    /******* QUERIES ******/

    async listar() {
        const response = await axios
            .get(`${ERP}home/lista`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
        return response;
    };

    /******* TRANSACCIONES ******/


}

export default new homeService();