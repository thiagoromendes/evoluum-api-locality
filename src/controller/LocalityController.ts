import { Request, Response } from "express";
import {parse} from 'json2csv';
import {GetData} from '../service/GetData';
import {GetDataCity} from '../service/GetDataCity';

class LocalityController {
    async show(request:Request, response:Response){
        const format = request.url
        const getData = new GetData()
        const locality = await getData.execute()
        
        if(format === '/json'){          
            return response.json(locality)
        }

        if(format === '/csv') {
            const fields = ['idEstado','siglaEstado','regiaoNome','nomeCidade','nomeMesorregiao','nomeFormatado']
            const opts = {fields}
            try {
                const csv = parse(locality,opts)
                console.log(csv)
                response.download(csv, 'locality.csv')
            } catch(err) {
                console.log(err)
            }           
        }
    }

    async index(request:Request, response:Response){
        const cityData = request.query

        const getDataCity = new GetDataCity()
        const city = await getDataCity.execute(cityData)
        
        return response.json(city);
    }
}

export {LocalityController};