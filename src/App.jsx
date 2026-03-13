import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import ChartsSection from './components/ChartsSection.jsx'
import './css/App.css'

function Home() {
  return (
    <ChartsSection />
  )
}


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app-layout">
          <Sidebar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
