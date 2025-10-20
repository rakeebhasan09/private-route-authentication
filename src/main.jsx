import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import AuthProvider from "./Provider/AuthProvider/AuthProvider";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
			<ToastContainer />
		</AuthProvider>
	</StrictMode>
);
