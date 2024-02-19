import '../../Style/FooterComponents/AboutUs.css'
import { Link,Navigate, useNavigate } from 'react-router-dom';


export default function AboutUs() {
  const navigate = useNavigate();
  document.addEventListener("DOMContentLoaded", function () {
    let parallax = document.querySelector(".parallax-container");
    let speed = 0.5; // Adjust the speed as needed

    window.addEventListener("scroll", function () {
      let yPos = -window.scrollY * speed;
      parallax.style.backgroundPositionY = yPos + "px";
    });
  });
  return (
    <>
    <div className="about-us">
      <h2>About FlavorFeed Recipes</h2>
      <p>Welcome to FlavorFeed Recipes, your ultimate destination for culinary inspiration and delightful recipes! At FlavorFeed, we believe in the power of food to bring people together and create memorable experiences.</p>
      
      <h3>Our Mission</h3>
      <p>Our mission is to provide you with a diverse range of mouthwatering recipes, cooking tips, and food-related content that will inspire you to unleash your creativity in the kitchen and impress your family and friends with delicious homemade dishes.</p>
      
      <h3>What We Offer</h3>
      <p>From quick and easy weeknight meals to gourmet dinner party ideas, we've got you covered. Explore our collection of recipes curated by our team of passionate food enthusiasts. Whether you're a seasoned chef or a novice cook, there's something for everyone at FlavorFeed Recipes.</p>
      
      <h3>Get in Touch</h3>
      <p>We love hearing from our readers! If you have any questions, suggestions, or feedback, feel free to reach out to us. Connect with us on social media or drop us an email. Your input is invaluable as we strive to continuously improve and enhance your experience on FlavorFeed Recipes.</p>
      
      <h3>Meet Our Team</h3>
      <p>Behind FlavorFeed Recipes is a dedicated team of food lovers, chefs, writers, and photographers who are passionate about sharing their love for cooking and exploring new flavors. Get to know the faces behind the recipes and learn more about the people who make FlavorFeed possible.</p>
    </div>
   </>
  );
}