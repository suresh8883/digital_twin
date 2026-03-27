import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import About from './About';
import Services from './Services';
import ContactUs from './ContactUS';
import Home from './Home';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <div className="body-content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/contactUs" component={ContactUs} />
        </Switch>
      </div>
      <Footer />
      <ScrollTop />
    </BrowserRouter>
  );
}

export default Router;
