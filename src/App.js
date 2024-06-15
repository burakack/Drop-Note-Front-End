import { Login } from "@mui/icons-material";
import "./App.css";
import LoginPage from "./pages/login";
import Navbar from "./components/navbar";
import Footer from "./components/simpleFooter";
import SignUp from "./pages/signUp";
import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUp} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
