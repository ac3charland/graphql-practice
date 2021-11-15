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

    async getAllFilms(): Promise<Film[]> {
        const films = await this.get('films')
        return films.map((film: RESTFilm) => this.reshapeFilm(film))
    }

    async getFilms(find: FilmFind): Promise<Film[]> {
        let films = await this.getAllFilms()

        Object.keys(find).forEach(key => {
            const queryType = key as keyof FilmFind
            if (find[queryType]) {
                films = films.filter(film => film[queryType] === find[queryType])
            }
        })

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

    async getDirectors(find: CreatorFind): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        let directors = creators.filter(creator => creator.directed.length)

        if (find?.film) {
            directors = directors.filter(director => director.directed.find(film => film.title === find.film))
        }

        if (find?.name) {
            directors = directors.filter(director => director.name === find.name)
        }

        return directors
    }

    async getProducers(find: CreatorFind): Promise<Creator[]> {
        const creators = await this.getAllCreators()
        let producers = creators.filter(creator => creator.produced.length)

        if (find?.film) {
            producers = producers.filter(producer => producer.produced.find(film => film.title === find.film))
        }

        if (find?.name) {
            producers = producers.filter(producer => producer.name === find.name)
        }

        return producers
    }
}
