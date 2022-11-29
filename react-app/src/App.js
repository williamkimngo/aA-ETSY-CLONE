import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginModal/LoginForm';
import SignUpForm from './components/auth/SignUpModal/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ProductHome from './components/ProductHomePage';
import ProductPage from './components/ProductPage';
import UserReviews from './components/Reviews/UserReviews';
import CreateReview from './components/Reviews/ReviewModal/CreateReview';
import EditReviewForm from './components/Reviews/EditReviewForm';
import Cart from './components/Cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <ProductHome />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/products/:productId' exact={true} >
          <ProductPage />
        </Route>
        <Route path='/products/:productId/new-review' exact={true} >
          <CreateReview />
        </Route>
        <Route path='/reviews/:reviewId/edit-review' exact={true} >
          <EditReviewForm />
        </Route>
        <Route path='/my-reviews' exact={true} >
          <UserReviews />
        </Route>
        <Route path='/cart' exact={true}>
            <Cart />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
