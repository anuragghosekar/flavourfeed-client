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
    <section className="section" id="section--1">
        
        <div className="features">
          <img
            src="images/Indiancuisine.jpg"
            // data-src="/images/child.png"
            alt="indiancuisine"
            className="features__img lazy-img"
          />
          <div className="features__feature">
            <div id="flex">
              <div className="features__icon"></div>
              <h5 className="features__header">
                {/* <span style={{ color: "##81bc9b", fontSize: "70px" }}>❝</span> */}
                <b id="heading">&nbsp;India's culinary culture</b>
              </h5>
            </div>
            <p id="para">
              India's culinary traditions are a symphony of flavours, reflecting
              the country's rich past, varied landscapes, and rich cultural
              legacy. Indian food, renowned for its wide variety of regional
              cuisines, is a celebration of flavours, spices, and hues. Every
              location offers a different gastronomic experience, from the spicy
              curries of the North to the delicacies from the South that feature
              coconut. Indian cuisine typically involves sharing a meal with
              others, which promotes a feeling of community and friendliness.
              Street food markets, festooned with mouthwatering
              treats serve even more examples of the richness and diversity of
              Indian cuisine.
            </p>
          </div>

          <div className="features__feature">
            <div id="flex">
              <div className="features__icon"></div>
              <h5 className="features__header">
                <b id="heading">&nbsp;Art of cooking</b>
              </h5>
            </div>

            <p id="para">
              Cooking is more than just putting food together; it's a skillful
              fusion of imagination, science, and love. Cooking is a way for
              people to express themselves; they take simple ingredients and
              create visually stunning dishes that appeal to the senses. It
              requires a profound comprehension of flavours, textures, and
              cooking methods in order to produce dishes that are distinctive
              and unforgettable. A talented chef or a passionate home cook may
              turn the kitchen into a work of culinary art.
            </p>
            <h5>
              <Link
                to="/user/addrecipe"
                // className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                id="clickhere"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <b>Add your recipe→</b>
              </Link>
            </h5>
          </div>
          <img
            src="images/chef2.jpg"
            data-src="img/grow.jpg"
            alt="Plant"
            className="features__img lazy-img"
          />

          <img
            src="images/cookbook.jpg"
            alt="Credit card"
            className="features__img lazy-img"
          />
          <div className="features__feature">
            <div id="flex">
              <div className="features__icon"></div>
              <h5 className="features__header">
                <b id="heading">&nbsp;FlavourFeed, your cook book</b>
              </h5>
            </div>
            <p id="para">
              FlavourFeed, a recipe book is a valuable resource for cooks,
              offering a variety of delicious recipes and guides for both
              experienced and aspiring chefs. It provides ideas, inventiveness,
              and enjoyment in cooking, celebrating the art and science of
              cooking by transforming basic ingredients into culinary marvels.
            </p>
            <h5>
              <Link
                to="/user/allrecipes"
                // className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                id="clickhere"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <b>More recipes on your way→</b>
              </Link>
            </h5>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <section>
        <h2
          className="section__description"
          style={{ marginLeft: "0%", marginBottom: "2%" }}
        >
          FAQ's
        </h2>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" id="accordion-item-home">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                // aria-expanded="false"
                aria-controls="collapseOne"
              >
                <h5 className="text-center">
                  <b>What is the most nutritious way to cook food?</b>
                </h5>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>
                  The most nutritious way to cook food is through methods that
                  retain the maximum amount of nutrients while minimizing the
                  loss of essential vitamins and minerals. Steaming is a top
                  choice, as it preserves the integrity of nutrients without the
                  need for added fats. Grilling and baking also maintain
                  nutritional value by minimizing the use of oil and preserving
                  natural flavors. Boiling is effective, especially for
                  vegetables, but nutrients may leach into the cooking water.
                  Stir-frying quickly cooks food, preserving its texture and
                  nutritional content, provided minimal oil is used. Ultimately,
                  a varied approach that incorporates these cooking methods
                  ensures a balanced intake of essential nutrients.
                </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item" id="accordion-item-home">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <h5 className="text-center">
                  <b>
                    What is the best way to clean the vegetables before cooking?
                  </b>
                </h5>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>
                  The best way to clean vegetables before cooking is by washing
                  them under cold, running water to remove dirt and debris.
                  Soaking vegetables in a vinegar solution (1 part vinegar to 3
                  parts water) can help eliminate pesticides and bacteria. Use a
                  soft brush for firm vegetables like potatoes to scrub away any
                  residual dirt. Leafy greens should be soaked in water and then
                  gently agitated to dislodge any hidden particles. Pat
                  vegetables dry with a clean cloth or paper towel to prevent
                  dilution of flavors and ensure even cooking. Following these
                  steps ensures safe, clean vegetables for a healthy and
                  delicious meal.
                </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item" id="accordion-item-home">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <h5 className="text-center">
                  <b>What's the importance of meal planning in cooking?</b>
                </h5>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>
                  Meal planning is crucial for several reasons. Firstly, it
                  helps in organizing daily or weekly meals, making cooking a
                  more efficient and streamlined process. It aids in creating
                  balanced and nutritious menus, ensuring a well-rounded diet.
                  Additionally, meal planning reduces food waste by allowing for
                  better portion control and utilizing ingredients
                  strategically. It saves time during busy days, as pre-planned
                  meals require less spontaneous decision-making. Lastly,
                  effective meal planning promotes healthier eating habits and
                  can contribute to achieving specific dietary goals or
                  preferences. Overall, it is a valuable tool for achieving
                  culinary success while maintaining a healthy and sustainable
                  lifestyle.
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section className="section section--sign-up">
        <div className="section__title">
          <h3 className="section__header">
            Cooking is an art, and we want everyone to be an artist.
          </h3>
        </div>
        <button
          id="btn-regt"
          className="btn rounded-pill"
          onClick={() => {
            navigate("/user/registration");
            window.scrollTo(0, 0);
          }}
        >
          <b>Register</b>
        </button>
      </section>
      </>
  );
}