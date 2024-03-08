import logo from './logo.svg'
import './App.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
import { faArrowUp } from '@fortawesome/fontawesome-free'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Routers from './Router/Routers'
import store from './store/index'
import { useEffect } from 'react'
import { autoLogin } from './Actions/userAction'
function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<div className="App">
					<header className="App-header">
						{/* <Home /> */}
						<Routers />
						<Footer />
					</header>
				</div>
			</Provider>
		</BrowserRouter>
	)
}

export default App
