import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import BlogPostList from "./components/BlogPostList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import ShowPage from "./pages/ShowPage";

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

  let content = `<p>selam benim adım <span style="font-size: 30px;font-family: Georgia;"><strong>Gürkan, </strong></span></p>
  <p><span style="font-size: 30px;font-family: Georgia;"><strong><em>b</em></strong><em>en bilgisayarcıyım.</em></span></p>
  <p></p>
  <div style="text-align:left;"><img src="https://avatars.githubusercontent.com/u/25080366?s=64&v=4" alt="undefined" style="height: auto;width: auto"/></div>
  <p></p>
  <p><span style="color: rgb(255,255,255);background-color: rgb(251,160,38);">asdasdasdsa</span></p>
  <p style="text-align:center;"><span style="color: rgb(255,255,255);background-color: rgb(251,160,38);">Naber <strong>LAbbb</strong></span></p>
  <h1><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);"><strong><em><ins>Ben GÜRKAN UÇAR    </ins></em></strong></span></h1>
  <p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);"><strong>ÖÇŞİÖÇÖÇİçöç.öişöiö.öç.öçöiöüğüü       </strong></span></p>
  <p></p>
  <div style="text-align:none;"><img src="https://avatars.githubusercontent.com/u/25080366?v=4" alt="undefined" style="height: 100px;width: auto"/></div>
  <p></p>
  <p></p>`;

  //content = "";

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/show/:id" component={ShowPage} />

          {/* <Route exact path="/create" element={<CreatePage />} />
          {/* <Navigate to="/404" element={<NotFoundPage />} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
