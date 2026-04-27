//! Fisher-Yates Shuffle

export const shuffleAndPick = (array, amount) => {
  let shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    // Escojemos un elemento al azar que esté antes que el "vagón" actual
    let x = Math.floor(Math.random() * (i + 1))
    // Intercambiamos las posiciones (el que está a la derecha lo pasamos a la izquierda)
    ;[shuffled[i], shuffled[x]] = [shuffled[x], shuffled[i]]
  }

  // Devolvemos el producto (los primeros 'amount' vagones)
  return shuffled.slice(0, amount)
}
