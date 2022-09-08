import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/recipes-app" component={ Login } />
          <Route exact path="/recipes-app/foods" component={ Foods } />
          <Route exact path="/recipes-app/drinks" component={ Drinks } />
          <Route
            exact
            path="/recipes-app/foods/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/recipes-app/drinks/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/recipes-app/foods/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/recipes-app/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route exact path="/recipes-app/profile" component={ Profile } />
          <Route
            exact
            path="/recipes-app/done-recipes"
            component={ DoneRecipes }
          />
          <Route
            exact
            path="/recipes-app/favorite-recipes"
            component={ FavoriteRecipes }
          />
          <Route exact path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
