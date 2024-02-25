import { useEffect, useState } from "react";
import "./assets/css/index.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSageMiddleware from "redux-saga";
import reducers from "../components/redux/reducers";
import mySaga from "../components/redux/sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { useRouter } from "next/router";
const sagaMiddleware = createSageMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);
export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  const [listHistory, setHistory] = useState([router.asPath]);
  var history = [listHistory]; // keep history items in state

  useEffect(() => {
    const h = router.asPath;
    setHistory((a) => [...a, h]);
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
