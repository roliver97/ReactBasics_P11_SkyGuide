// ¡Este archivo se ejecuta con Node.js, no en el navegador!
//! Usamos un script para evitar el Hot Reload de Vite (que se ejecuten automáticamente las llamadas a la API (fetch) y agote el plan mensual gratuito de SerpApi)
import fs from 'fs'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({ path: '../../../.env' })

// 1. Leemos el Armario (Objeto) entero desde tu archivo original
const dataRaw = fs.readFileSync('./airports-spain.json', 'utf-8')
const airports = JSON.parse(dataRaw)
const API_KEY = process.env.SERPAPI_KEY

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

if (!API_KEY) {
  console.log(
    '❌ ERROR: No encuentro la llave. Revisa la path de dotenv.config'
  )
} else {
  console.log('✅ Connexión establecida con el archivo .env!')
}

// Creamos la Máquina sin ejecutar todavía
async function updateImages() {
  for (let airport of airports) {
    if (airport.image && airport.image.includes('cloudinary.com')) {
      continue
    }
    console.log(`Buscando foto para: ${airport.name}...`)

    try {
      // Preparamos la query para el fetch
      const rawQuery = `aeropuerto ${airport.name} ${airport.city} ${airport.iata} España`
      const safeQuery = encodeURIComponent(rawQuery)

      // Llamamos a la puerta de SerpApi pidiendo Imágenes de Google
      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_images&q=aeropuerto+${safeQuery}&api_key=${API_KEY}`
      )

      const data = await response.json()

      if (data.images_results && data.images_results.length > 0) {
        // LECTURA ÁRABE Y FLECHA A LA IZQUIERDA ⬅️
        // 1. Primero se ejecuta la derecha: cogemos la URL de la primera imagen que nos da Google.
        // 2. Después lo guardamos a la izquierda: dentro de la cajonera "image" del aeropuerto actual.
        const urlOriginal = data.images_results[0].original
        console.log(
          `✅ Foto encontrada para ${airport.name}: ${urlOriginal}...`
        )
        console.log(`🚀 Subiendo a Cloudinary...`)

        const uploadResponse = await cloudinary.uploader.upload(urlOriginal, {
          folder: 'RTC_P11_SkyGuide/airports-spain',
          public_id: airport.iata.toLowerCase(), // El nombre del archivo será el código IATA (bcn, mad...)
          overwrite: true
        })
        // 4. Guardem la URL de Cloudinary al nostre JSON (ja optimitzada per defecte)
        airport.image = uploadResponse.secure_url
        console.log(
          `✅ Foto guardada a Cloudinary: ${airport.image} y la ruta en el archivo airports-spain.json ha sido creada/actualizada`
        )
      } else {
        // Este log avisará si la API falla o no encuentra nada
        console.log(
          `⚠️ Google (mediante SerpApi) no ha devuelto imagenes para: ${airport.name}`
        )
        console.log(
          `Detall de l'error de l'API:`,
          data.error || 'Cap error, però llista buida'
        )
      }

      // Hacemos dormir la Máquina 5 segundos para que SerpApi no se piense que somos un ataque informático
      await new Promise((resolve) => setTimeout(resolve, 5000))
    } catch (error) {
      console.log(error.message)
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  // Cogemos todo el Tren actualizado y lo guardamos en un archivo NUEVO
  fs.writeFileSync('airports-spain.json', JSON.stringify(airports, null, 2))
  console.log(
    '🏁 Proceso finalizado. JSON creado/actualizado con links de Cloudinary!'
  )
}

// Ejecutamos la Máquina () para obtener el Producto
updateImages()

// Llamamos al script "node extract-photos.js" en la terminal para ejecutar el código
