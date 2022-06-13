import { Navigate } from "react-router-dom";

export function ProtectedWrapper({ children }) {
  if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
