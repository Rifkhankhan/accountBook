import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Payment from '../Pages/Payment/Payment'
import Receipt from '../Pages/Receipt/Receipt'
import Users from '../Pages/Users/Users'

const Routers = () => {
	// const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="/reset/:token" element={<ResetPage />} /> */}
			{/* <Route path="/blogs/:id" element={<BlogDetails />} /> */}
			{/* {isAuthenticated && (
				<Route path="/profile" element={<Profile />}>
					<Route index element={<Dashboard />} />
					<Route path="blogs" element={<Blogs />} />
					<Route path="personal" element={<Personal />} />
					<Route path="create-blog" element={<CreateBlog />} />
				</Route>
			)} */}

			<Route path="/" index element={<Home />} />
			<Route path="/payment" element={<Payment />} />
			<Route path="/receipt" element={<Receipt />} />
			<Route path="/users" element={<Users />} />

			{/* {isAuthenticated && (
		// 		<Route path="/netflix/profile" element={<NetflixProfile />}>
		// 			<Route index element={<Movies />} />
		// 			<Route path="movies" element={<Movies />} />
		// 			<Route path="series" element={<Series />} />
		// 			<Route path="users" element={<Users />} />
		// 			<Route path="likes" element={<LikesComponents />} />
		// 			<Route path="unlikes" element={<DisLikeComponents />} />
		// 			<Route path="yourVideos" element={<YourVideosComponent />} />
		// 			<Route path="downloads" element={<DownloadsComponent />} />
		// 			<Route path="watchLater" element={<WatchLaterComponent />} />
		// 			<Route path="category" element={<AddCategory />} />
		// 			<Route path="*" element={<Series />} />
		// 		</Route>
		// 	)} */}
		</Routes>
	)
}

export default Routers
