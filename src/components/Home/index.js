import React from 'react';
import HomeSlider from './HomeSlider';
import ContentIcon from './ContentIcon';
import BackgroundImageText from './BackgroundImageText';
import Homecontentslider from './Homecontentslider';
import usePageTitle from '../../usePageTitle';

function Home() {
  usePageTitle('Home');
  return (
    <>
      <HomeSlider />
      <ContentIcon />
      <BackgroundImageText />
      <Homecontentslider />
    </>
  );
}

export default Home;
