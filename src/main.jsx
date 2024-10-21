import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";
import { ThemeProvider } from "./components/Context/ThemeContext.jsx";
import Theme from "./Theme.jsx";


createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <Provider store={store}>
        {/* <div className={`${theme === "cupcake" ? "backgroundColorWhite" : "backgroundColorBlack" }`}>
            <RouterProvider router={router} />
        </div> */}
         <Theme />
        </Provider>
    </ThemeProvider>

);
