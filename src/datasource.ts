import { RESTDataSource } from 'apollo-datasource-rest'
import { Film } from './generated/graphql'

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
}