import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserInfo(user);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/recipes-app');
  };

  return (
    <>
      <Header title="Profile" />
      <Container>
        <div
          className="
          d-flex
          justify-content-center
          flex-column
          align-items-center
          my-5"
        >
          <h2 data-testid="profile-email">{userInfo?.email || 'Visitante'}</h2>
          <div
            className="
            d-flex
            justify-content-center
            align-items-center
            flex-column
            my-4"
          >
            <Button
              data-testid="profile-done-btn"
              onClick={ () => history.push('/recipes-app/done-recipes') }
              size="lg"
              className="my-4"
            >
              Done Recipes
            </Button>

            <Button
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/recipes-app/favorite-recipes') }
              size="lg"
              className="my-4"
            >
              Favorite Recipes
            </Button>

            <Button
              data-testid="profile-logout-btn"
              size="lg"
              onClick={ handleLogout }
              className="my-4"
              variant="danger"
            >
              Logout
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
