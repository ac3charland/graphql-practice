import { RESTDataSource } from 'apollo-datasource-rest'
import { Creator, Film } from './generated/graphql'

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

    async getAllFilms(): Promise<Film[]> {
        const films = await this.get('films')
        return films.map((film: RESTFilm) => this.reshapeFilm(film))
    }

    async getAFilm(title: string): Promise<Film | undefined> {
        const films = await this.getAllFilms()
        return films.find((film: any) => film.title === title)
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

    async getAllDirectors(): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        return creators.filter(creator => creator.directed.length)
    }

    async getADirectorByName(name: String): Promise<Creator | undefined> {
        const creators = await this.getAllDirectors()
        return creators.find(creator => creator.name === name)
    }

    async getADirectorByFilm(title: string): Promise<Creator | undefined> {
        const creators = await this.getAllDirectors()
        return creators.find(creator => creator.directed.find(film => film.title === title))
    }

    async getAllProducers(): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        return creators.filter(creator => creator.produced.length)
    }

    async getAProducerByName(name: String): Promise<Creator | undefined> {
        const creators = await this.getAllProducers()
        return creators.find(creator => creator.name === name)
    }

    async getAProducerByFilm(title: string): Promise<Creator | undefined> {
        const creators = await this.getAllDirectors()
        return creators.find(creator => creator.produced.find(film => film.title === title))
    }
}