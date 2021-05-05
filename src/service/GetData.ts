import {Locality} from '../model/locality';
import api from '../shared/api';

class GetData {
    public async execute(): Promise<Locality>{
        
        let locality = {} as Locality;

        await api.get('/municipios')
            .then(response => {
                locality = response.data.map(item => ({
                    idEstado: item.microrregiao.mesorregiao.UF.id,
                    siglaEstado: item.microrregiao.mesorregiao.UF.sigla,
                    regiaoNome: item.microrregiao.mesorregiao.UF.regiao.nome,
                    nomeCidade: item.nome,
                    nomeMesorregiao: item.microrregiao.mesorregiao.nome,
                    nomeFormatado: `${item.nome}/${item.microrregiao.mesorregiao.UF.sigla}`,    
                }))
            })

        return locality;
        
    }
}

export {GetData}