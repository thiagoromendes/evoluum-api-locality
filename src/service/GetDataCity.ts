import api from '../shared/api';
import {getCache,setCache} from '../shared/cache';

interface CityData {
    nomeCidade?:string
}

class GetDataCity {
    public async execute({nomeCidade}:CityData){

        if(!nomeCidade){
            return {
                message:'Informe o parâmetro nomeCidade'
            }
        }

        const cityCache = getCache(nomeCidade)


        if(cityCache) {
            return cityCache;
        }

        let locality = [] as any;
        const cidade = nomeCidade as string;

        console.log(cidade)

        await api.get('/municipios')
            .then(response => {
                locality = response.data.filter((item: { nome: any }) => {
                    return item.nome === cidade
                })
            })
        
        const localityCity = locality.map(item => ({
            idEstado: item.microrregiao.mesorregiao.UF.id,
            siglaEstado: item.microrregiao.mesorregiao.UF.sigla,
            regiaoNome: item.microrregiao.mesorregiao.UF.regiao.nome,
            nomeCidade: item.nome,
            nomeMesorregiao: item.microrregiao.mesorregiao.nome,
            nomeFormatado: `${item.nome}/${item.microrregiao.mesorregiao.UF.sigla}`,
        }))

        setCache(nomeCidade,localityCity)

        return localityCity;

    }
}

export {GetDataCity}