import Home from "./Pages/Home";
import Header from "./Base/Header";
import Footer from "./Base/Footer";

import './styles/app.scss'
import './styles/base.scss'

function App() {

  return (
      <div className="app">
        <Header />
        <Home />
        <Footer />
      </div>
  );
}

export default App;
