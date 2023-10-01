import { BrowserRouter as Router } from "react-router-dom";
import MyRouter from "./routes/Router";
import { Provider } from "react-redux";
import { store, history } from "./store";
import "./assets/index.scss";
import ScrollOnTop from "./routes/ScrollOnTop";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ScrollOnTop />
        <MyRouter />
      </Router>
    </Provider>
  );
}

export default App;
