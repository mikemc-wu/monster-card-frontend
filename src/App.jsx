import { createBrowserRouter, RouterProvider } from "react-router";
import { pages } from "./store/constant.js";
import Background from "./layout/Background.jsx";
import Home from "./page/home/Home.jsx";
import SearchCard from "./page/search/SearchCard.jsx";
import CardScreener from "./page/screener/CardScreener.jsx";
import About from "./page/about/About.jsx";
import "./App.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Background/>,
        errorElement: "<ErrorPage>",
        children: [
            { index: true, element: <Home/> },
            { path: pages.search.route, element: <SearchCard/> },
            { path: pages.screener.route, element: <CardScreener/> },
            { path: pages.about.route, element: <About/> },
        ]
    }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
