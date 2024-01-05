import { palavras } from "@prisma/client";
import { Columns, columnsNames, correctColumnsNames, mappedColumns } from "./constants";

export function replaceColumnsNames(object: palavras) {

    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
        const value = object[keys[i]];

        delete object[keys[i]]

        object[correctColumnsNames[i]] = value;

    }

    return object
}


export function replaceNamesToColumns(object: Columns) {
    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
        const value = object[keys[i]];

        delete object[keys[i]];

        object[columnsNames[i]] = value;

    }

    return object;
}

export function correctNamesToColumnNames(array: string[]) {
    if(array.length <= 0 )return []
    return array.map(e => mappedColumns[e]);
}

export function FilterWantedTabs(obj: palavras) {
    return Object.keys(obj).filter(e => {
        if (e === "Classe Gramatical") {
            return false;
        } else if (e === "Gênero/Número") {
            return false;
        } else if (e === "Volp") {
            return false;
        }
        else if (e === "Fontes") {
            return false;
        }
        else if (e === "Rem. Complementar") {
            return false;
        }
        else if (e === "Rem. Imperativa") {
            return false;
        }
        else if (e === "Comentários Extras Brutos") {
            return false;
        }
        else if (e === "Comentários Extras Editados") {
            return false;
        }
        else if (e === "Verbete") {
            return false;
        }
        else if (e === "Código") {
            return false;
        }
        else if (e === "Índice") {
            return false;
        }
        else if (e === "Definição") {
            return false;
        }
        else if (e === "Tópico de Iluminação Natural") {
            return false;
        }
        else if (e === "OBSRCC") {
            return false;
        }
        else if (e === "id") {
            return false
        }else if (obj[e] === null) {
            return false
        }else {
            return true;
        }
    })
}