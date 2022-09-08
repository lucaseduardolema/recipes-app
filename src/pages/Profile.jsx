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
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <Container>
        <h2 data-testid="profile-email">{userInfo?.email || 'Visitante'}</h2>
        <div className="buttons">
          <Button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
            size="lg"
          >
            Done Recipes
          </Button>
          <Button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            size="lg"
          >
            Favorite Recipes
          </Button>
          <Button
            data-testid="profile-logout-btn"
            size="lg"
            onClick={ handleLogout }
          >
            Logout
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
