import logo from './logo.svg'
import './App.css'
import { Provider } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
import { faArrowUp } from '@fortawesome/fontawesome-free'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Routers from './Router/Routers'
import store from './store/index'
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<header className="App-header">
						<Header />
						{/* <Home /> */}
						<Routers />
						<Footer />
					</header>
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
