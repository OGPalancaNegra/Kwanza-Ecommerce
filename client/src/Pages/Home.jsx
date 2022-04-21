import React from 'react'
import MainSlideshow from '../Components/MainSlideshow'
import Navbar from '../Components/Navbar'
import '../App.css';
import ImageGrid from '../Components/ImageGrid';
import NewItems from '../Components/NewItems';
import Footer from '../Components/Footer';
import MostViewed from '../Components/MostViewed';

const Home = ({discountedProducts}) => {


 


  return (
    <>
      <Navbar></Navbar>
      <MainSlideshow discountedProducts = {discountedProducts}></MainSlideshow>
      <ImageGrid></ImageGrid>
      <NewItems></NewItems>
      {/* Popular SlideShow */}
      <MostViewed></MostViewed>
      <Footer></Footer>
    </>
      
    
  )
}

export default Home
