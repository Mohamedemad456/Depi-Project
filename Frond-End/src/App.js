import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Route, RouterProvider } from "react-router";
import Board from "./Components/WorkSpace/Board/Board";
import Auth from "./Components/Auth/Auth";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Home from "./Components/Home/Home";
import store from "./Store/store";
import { Provider, useDispatch } from "react-redux";
import WorkSpaceLayout from "./Components/WorkSpace/Layout/WorkSpaceLayout";
import NotFounPage from "./Components/UI/NotFoundPage/NotFounPage";

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/work-space" element={<WorkSpaceLayout />}>
          <Route path=":id" element={<Board/>}/>
        </Route>
        <Route path="*" element={<NotFounPage/>}></Route>
      </Route>
    )
  );
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
