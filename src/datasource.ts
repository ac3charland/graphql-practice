import { RESTDataSource } from 'apollo-datasource-rest'
import { Creator, CreatorFind, Film, FilmFind } from './generated/graphql'

interface RESTFilm {
    id: string
    title: string
    original_title: string
    original_title_romanised: string
    description: string
    director: string
    producer: string
    release_date: string
    running_time: string
    movie_banner: string
    image: string
    rt_score: string
}

export class GhibliAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://ghibliapi.herokuapp.com/'
    }

    reshapeFilm(film: RESTFilm): Film {
        const { movie_banner, original_title, original_title_romanised, rt_score, release_date, running_time } = film
        return {
            ...film,
            banner: movie_banner,
            originalTitle: original_title,
            originalTitleRomanised: original_title_romanised,
            rtScore: parseInt(rt_score),
            yearReleased: parseInt(release_date),
            runningTime: parseInt(running_time)
        }
    }

    compareFunction<Type>(sortKey: keyof Type): (a: Type, b: Type) => number {
        return (a: Type, b: Type) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                if (aValue.toUpperCase() < bValue.toUpperCase()) {
                    return -1
                }
                else if (aValue.toUpperCase() > bValue.toUpperCase()) {
                    return 1
                }
            }
            else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue
            }

            return 0
        }
    }

    reverseCompareFunction<Type>(sortKey: keyof Type): (a: Type, b: Type) => number {
        return (a: Type, b: Type) => -1 * this.compareFunction<Type>(sortKey)(a, b)
    }

    async getAllFilms(): Promise<Film[]> {
        const films = await this.get('films')
        return films.map((film: RESTFilm) => this.reshapeFilm(film))
    }

    async getFilms(find?: FilmFind, sort?: string): Promise<Film[]> {
        let films = await this.getAllFilms()

        if (find) {
            Object.keys(find).forEach(key => {
                const queryType = key as keyof FilmFind
                if (find[queryType]) {
                    films = films.filter(film => film[queryType] === find[queryType])
                }
            })
        }

        if (sort && films.length && (sort in films[0] || sort.substring(1) in films[0])) {
            if (sort.charAt(0) === '!') {
                const sortKey = sort.substring(1) as keyof Film
                films = films.sort(this.reverseCompareFunction<Film>(sortKey))
            }
            else {
                const sortKey = sort as keyof Film
                films = films.sort(this.compareFunction<Film>(sortKey))
            }
        }

        return films
    }

    async getAllCreators(): Promise<Creator[]> {
        const films = await this.getAllFilms()
        return films.reduce((creators, film) => {
            const {director, producer, title} = film

            const directorMatch = creators.find(creator => creator.name === director)
            if (!directorMatch) {
                creators.push({
                    name: director,
                    directed: [film],
                    produced: []
                })
            }
            else {
                directorMatch.directed.push(film)
            }

            const producerMatch = creators.find(creator => creator.name === producer)
            if (!producerMatch) {
                creators.push({
                    name: producer,
                    directed: [],
                    produced: [film]
                })
            }
            else {
                producerMatch.produced.push(film)
            }

            return creators
        }, [] as Creator[])
    }

    async getDirectors(find?: CreatorFind, sort?: string): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        let directors = creators.filter(creator => creator.directed.length)

        if (find?.film) {
            directors = directors.filter(director => director.directed.find(film => film.title === find.film))
        }

        if (find?.name) {
            directors = directors.filter(director => director.name === find.name)
        }

        if (sort && directors.length && (sort in directors[0] || sort.substring(1) in directors[0])) {
            if (sort.charAt(0) === '!') {
                const sortKey = sort.substring(1) as keyof Creator
                directors = directors.sort(this.reverseCompareFunction<Creator>(sortKey))
            }
            else {
                const sortKey = sort as keyof Creator
                directors = directors.sort(this.compareFunction<Creator>(sortKey))
            }
        }

        return directors
    }

    async getProducers(find?: CreatorFind, sort?: string): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        let producers = creators.filter(creator => creator.produced.length)

        if (find?.film) {
            producers = producers.filter(producer => producer.produced.find(film => film.title === find.film))
        }

        if (find?.name) {
            producers = producers.filter(producer => producer.name === find.name)
        }

        if (sort && producers.length && (sort in producers[0] || sort.substring(1) in producers[0])) {
            if (sort.charAt(0) === '!') {
                const sortKey = sort.substring(1) as keyof Creator
                producers = producers.sort(this.reverseCompareFunction<Creator>(sortKey))
            }
            else {
                const sortKey = sort as keyof Creator
                producers = producers.sort(this.compareFunction<Creator>(sortKey))
            }
        }

        return producers
    }
}
