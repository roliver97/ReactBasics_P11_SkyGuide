import './App.css'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Explorer from './pages/Explorer/Explorer'
import AirportDetail from './pages/AirportDetail/AirportDetail'
import TopAirports from './pages/TopAirports/TopAirports'
import AirportsQuiz from './pages/AirportsQuiz/AirportsQuiz'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Explorer />} />
          <Route path='/airport/:iata' element={<AirportDetail />} />
          <Route path='/top-airports' element={<TopAirports />} />
          <Route path='/airports-quiz' element={<AirportsQuiz />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
