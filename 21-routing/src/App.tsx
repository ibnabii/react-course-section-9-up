import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Route, createRoutesFromElements } from "react-router-dom";
import HomePage from "./pages/Home.tsx";
import ProductsPage from "./pages/Products.tsx";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import ProductDetailsPage from "./pages/ProductDetails.tsx";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>,
// );
// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      // { index: true, element: <HomePage /> }, // alternative way
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
