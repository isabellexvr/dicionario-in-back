import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { palavrasPrototype } from "./models";

@Injectable()
export class WordsRepository {
    constructor(private prisma: PrismaService) { }

    async findWords() {
        return this.prisma.palavras.findMany({ orderBy: { id: 'asc' } });
    }

    async findWordByName(word: string) {
        return this.prisma.palavras.findFirst({
            where: { Verbete: word },
            orderBy: { Verbete: 'asc' }
        });
    }

    async tabsByWordName(word: string) {
        const wordInfo = await this.findWordByName(word);
        if (!wordInfo) return []
        const wordInfoValues = Object.values(wordInfo);
        return Object.keys(wordInfo).map((column, index) => {
            if (wordInfoValues[index] === null) return;
            if (column === 'verbeteIngles') {
                return "Inglês";
            } else if (column === 'num') {
                return "Num";
            } else if (column === 'cabeca_simb') {
                return "Cabeça/Símbolo";
            } else if (column === 'rubrica') {
                return "Rubrica";
            } else if (column === 'grupo') {
                return "Grupo";
            } else if (column === 'classeGram') {
                //return "Classe Gramatical";
            } else if (column === 'genero_num') {
                // return "Gênero/Número";
            } else if (column === 'volp') {
                //return "Volp";
            } else if (column === 'fontes') {
                //return "Fontes";
            } else if (column === 'remissivaComplementar') {
                return "Rem. Complementar";
            } else if (column === 'remissivaImperativa') {
                return "Rem. Imperativa";
            } else if (column === 'f_rmula') {
                return "Fórmula";
            } else if (column === 'locucao_expressoes') {
                return "Locução/Expressões";
            } else if (column === 'etimologiaBruto') {
                return "Etimologia";
            } else if (column === 'plural') {
                return "Plural";
            } else if (column === 'sinonimosVariantes') {
                return "Sinônimos/Variantes";
            } else if (column === 'antonimos') {
                return "Antônimos";
            } else if (column === 'achega') {
                return "Achega";
            } else if (column === 'exemplo') {
                return "Exemplo";
            } else if (column === 'abonacao_citacoes_adagios') {
                return "Abonação/Citações/Adágios";
            } else if (column === 'fig') {
                return "Fig";
            } else if (column === 'comentariosExtraBrutos') {
                //  return "Comentários Extras Brutos";
            } else if (column === 'comentariosExtraEditados') {
                //  return "Comentários Extras Editados";
            } else if (column === 'voceSabia') {
                return "Você sabia?";
            } else if (column === 'ortoepia') {
                return "Ortoépia";
            } else if (column === 'Verbete') {
                //return "Verbete";
            } else if (column === 'C_digo') {
                // return "Código";
            } else if (column === 'indice') {
                // return "Índice";
            } else if (column === 'definicao') {
                //return "Definição";
            } else if (column === 'topicoIluminacaoNatural') {
                // return "Tópico de Iluminação Natural";
            } else if (column === 'etimologiaBruto') {
                return "Etimologia (Bruto)";
            } else if (column === 'outrasLinguas') {
                return "Outras Línguas";
            } else if (column === 'obsrcc') {
                // return "OBSRCC";
            }
        });
    }

    async findWordById(id: number) {
        return this.prisma.palavras.findFirst({
            where: { id }
        })
    }

    async findWordByFirstChar(char: string) {
        return this.prisma.palavras.findMany({
            where: {
                Verbete: {
                    startsWith: char,
                    mode: "insensitive"
                }
            },
            orderBy: { id: 'asc' }
        })
    }

    async editWordById(wordId: number, data: palavrasPrototype) {
        return this.prisma.palavras.update({ where: { id: wordId }, data });
    }

    async deleteWordById(wordId: number) {
        return this.prisma.palavras.delete({ where: { id: wordId } })
    }

    async findWordByItsName(word: string) {
        return this.prisma.palavras.findFirst({ where: { Verbete: word } })
    }

    async createNewWord(data: palavrasPrototype) {
        return this.prisma.palavras.create({ data });
    }

    async findWordsByDescription(search: string) {

        return this.prisma.palavras.findMany({
            where: {
                OR: [
                    { definicao: { contains: search } },
                    { Verbete: { contains: search } }
                ]

            },
            select: {
                Verbete: true,
                definicao: true
            },
            take: 5
        })
    }

    async simpleSearch(query: string, startsWith: string | null, endsWith: string | null) {

        const newQuery = query.replaceAll("?", "%");

        if (!startsWith && !endsWith) {
            return this.prisma.palavras.findMany({
                where: {
                    Verbete: { contains: newQuery }
                },
                select: {
                    Verbete: true
                }
            })
        } else if (startsWith && !endsWith) {
            //apenas startsWith
            return this.prisma.palavras.findMany({
                where: {
                    AND: [
                        {
                            Verbete: {
                                startsWith: startsWith,
                                mode: "insensitive"
                            }
                        },

                        {
                            Verbete: {
                                contains: newQuery
                            }
                        }
                    ]
                },
                select: {
                    Verbete: true
                }
            })
        } else if (!startsWith && endsWith) {   
            //apenas endsWith
            return this.prisma.palavras.findMany({
                where: {
                    AND: [
                        {
                            Verbete: {
                                endsWith: endsWith,
                                mode: "insensitive"
                            }
                        },

                        {
                            Verbete: {
                                contains: newQuery
                            }
                        }
                    ]
                },
                select: {
                    Verbete: true
                }
            })
        } else if ( startsWith && endsWith) {
            //ends e starts with
            return this.prisma.palavras.findMany({
                where: {
                    AND: [
                        {
                            Verbete: {
                                startsWith: startsWith,
                                mode: "insensitive"
                            }
                        }, {
                            Verbete: {
                                endsWith: endsWith,
                                mode: "insensitive"
                            }
                        },
                        {
                            Verbete: {
                                contains: newQuery
                            }
                        }
                    ]
                },
                select: {
                    Verbete: true
                }
            })
        }
    }
}