import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import ShowPage from "./pages/ShowPage";
import UpdatePage from "./pages/UpdatePage";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const App = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/show/:id" component={ShowPage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/update/:id" component={UpdatePage} />
          <Route path="*" exact={true} component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
