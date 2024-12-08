import * as contentful from 'contentful'
import { getViteEnvVariable } from '../utils'

export const useContentfulClient = () => {
    return contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: getViteEnvVariable("VITE_CONTENTFUL_SPACE_ID"),
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: getViteEnvVariable("VITE_CONTENTFUL_API_ACCESS_TOKEN"),
    })
}
