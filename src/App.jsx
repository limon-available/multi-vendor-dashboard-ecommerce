import { useEffect, useMemo, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const allRoutes = useMemo(() => [...publicRoutes, getRoutes()], []);

  useEffect(() => {
    let isMounted = true;

    dispatch(get_user_info()).finally(() => {
      if (isMounted) {
        setAuthChecked(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!authChecked) return null;

  return <Router allRoutes={allRoutes} />;
}

export default App;
