import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ReverseSearchType, palavrasPrototype } from "./models";
import { FilterWantedTabs, correctNamesToColumnNames, replaceColumnsNames } from "./helpers";

@Injectable()
export class WordsRepository {
    constructor(private prisma: PrismaService) { }

    async findWords() {
        return this.prisma.palavras.findMany({ where: { NOT: [{ definicao: null }] }, orderBy: { id: 'asc' } });
    }

    async findWordByName(word: string) {
        //console.log(word)
        let data;
        if (word === "componentes tricromáticas  <de um estímulo de cor>") {
            data = await this.prisma.palavras.findFirst({
                where: { Verbete: { startsWith: "componentes" } }
            })
        } else {
            data = await this.prisma.palavras.findFirst({
                where: { Verbete: word },
            });
        }

        if (data === null) {
            data = await this.prisma.palavras.findFirst({
                where: { Verbete: { startsWith: word } }
            })
        }

        //console.log(data)

        return replaceColumnsNames(data);
    }

    async tabsByWordName(word: string) {
        const wordInfo = await this.findWordByName(word);
        if (!wordInfo) return []

        return FilterWantedTabs(wordInfo);
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
        } else if (startsWith && endsWith) {
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

    async reverseSearchComplete(words: ReverseSearchType) {
        return this.prisma.palavras.findMany({
            where: {
                AND: [
                    {
                        AND: words.contains.map((searchString) => ({
                            definicao: {
                                contains: searchString,
                                mode: 'insensitive'
                            }
                        })),
                    },
                    {
                        NOT: {
                            OR: words.doesNotContain.map((searchString) => ({
                                definicao: {
                                    contains: searchString,
                                    mode: "insensitive"
                                }
                            }))
                        }
                    }
                ]
            },

            select: {
                Verbete: true,
                // definicao: true
            }
        })
    }

    async reverseSearchContainsOnly(words: string[]) {
        return this.prisma.palavras.findMany({
            where: {
                AND: words.map((searchString) => ({
                    definicao: {
                        contains: searchString,
                        mode: "insensitive"
                    }
                }))
            },
            select: {
                Verbete: true,
                // definicao: true
            }
        })
    }

    async reverseSearchNotContainsOnly(words: string[]) {
        return this.prisma.palavras.findMany({
            where: {
                NOT: {
                    OR: words.map((searchString) => ({
                        definicao: {
                            contains: searchString,
                            mode: "insensitive"
                        }
                    }))
                }
            },
            select: {
                Verbete: true,
                // definicao: true
            }
        });
    }

    async filterWordsByTabs(containingTabs: string[],
        notContainingTabs: string[]) {



        return this.prisma.palavras.findMany({
            where: {
                AND: [
                    { AND: notContainingTabs.map(t => ({ [t]: null })), },
                    {
                        NOT: {
                            AND: containingTabs.map(t => ({ [t]: null }))
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