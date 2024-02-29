import axios from 'axios'

const API_KEY = '2183127771827858' // Clave de acceso a la API debiese estar en .env

const superheroesApi = axios.create({
  baseURL: 'https://www.superheroapi.com/api.php/' + API_KEY + '/'
})

export default superheroesApi

// Función para obtener un superhéroe por ID
export const fetchSuperheroById = async (id: number) => {
  try {
    const response = await superheroesApi.get(`${id}`)
    return { ok: true, hero: response.data }
  } catch (error) {
    console.error('Error fetching superhero:', error)
    return { ok: false, error } // Propaga el error para manejarlo en el componente
  }
}
