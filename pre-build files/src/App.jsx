import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Page } from './page'

const App = () => {
  return (
    <main
        className="bg-slate-300/20">
        <Router>
            <Routes>
                <Route 
                    path='/' element={<Page />} />
                <Route
                    path='/*'
                    element={
                    <>
                        <Routes>
                        </Routes>
                    </>
                    }
                />
            </Routes>
        </Router>
    </main>
  )
}

export default App