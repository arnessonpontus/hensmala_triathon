import { useEffect } from "react"
import * as contentful from 'contentful'

export const useContentfulClient = () => {
    return contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: '',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '',
    })
}