// import "./Style/App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainNavBar from "./Components/MainNavbar";
import { Route,Routes } from "react-router-dom";
import Login from "./Pages/LoginCred/Login";
import Register from "./Pages/LoginCred/Register";
import Home from "./Pages/Home";
import Discover from "./Pages/Discover";
import MealPlanning from "./Pages/MealPlanning";
import AboutUs from "./Pages/FooterComponents/AboutUs";
import ContactUs from "./Pages/FooterComponents/ContactUs";
import TermsOfUse from "./Pages/FooterComponents/TermsOfUse";
import PrivacyPolicy from "./Pages/FooterComponents/PrivacyPolicy";
import ForgotPassword from "./Pages/LoginCred/ForgetPassword";
import UserDashboard from "./Pages/User/UserDashboard";
import RecipeForm from "./Pages/RecipeForm";
import UserRecipes from "./Pages/User/UserRecipes";
import Feedback from "./Pages/Feedback";
import UserProfile from "./Pages/User/UserProfile";
import RecipeDetails from "./Pages/RecipeDetails";
import EditRecipe from "./Pages/User/EditRecipe";
import EditProfile from "./Pages/User/EditProfile";
import RegisterImage from "./Pages/LoginCred/RegisterImage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminGetAllUsers from "./Pages/Admin/AdminGetAllUsers";
import AdminGetAllRecipes from "./Pages/Admin/AdminGetAllRecipes";
import AdminGetAllFeedbacks from "./Pages/Admin/AdminGetAllFeedbacks";
import AdminProfile from "./Pages/Admin/AdminProfile";
import EditAdminProfile from "./Pages/Admin/EditAdminProfile";
import AdminViewRecipe from "./Pages/Admin/AdminViewRecipe";
import AdminViewUser from "./Pages/Admin/AdminViewUser";
import MainNavbar from "./Components/MainNavbar";
import LogNavbar from "./Pages/User/LogNavbar";
import Particle from "./Pages/Particle";
import AllRecipes from "./Pages/User/AllRecipes";
import AdminNavbar from "./Pages/Admin/AdminNavbar";
import ViewUserRecipe from "./Pages/User/ViewUserRecipe";
import HomeViewRecipe from "./Pages/HomeViewRecipe";


function App() {
  return (
    <>
       {/* <Route path="/register" element={<Register></Register>}></Route> */}
       {/* <Header></Header>
       <MainNavBar></MainNavBar> */}
       <Particle/>
       <Routes>
        <Route path="/" element ={<><MainNavBar/><Home/> </>}/>

       <Route path="/login" element={<><MainNavbar/> <Login/> </>}/>

       <Route path="/register" element={<> <MainNavBar/>  <RegisterImage/> </>}/>

       <Route path="/home" element={ <> <MainNavBar/> <Home/> </>}/>

       <Route path="/discover" element={<> <MainNavBar/> <Discover/></> }/>

       <Route path="/mealplanning" element={<> <LogNavbar/> <MealPlanning/></>}/>

       <Route path="/aboutus" element={<><MainNavBar/><AboutUs/></>}/>

       <Route path="/contactus" element={<><MainNavBar/><ContactUs/></>}/>

       <Route path="/termsofuse" element={<><MainNavBar/><TermsOfUse/></>}/>

       <Route path="/privacypolicy" element={<><MainNavBar/><PrivacyPolicy/></>}/>

       <Route path="/forgetpassword" element={<> <MainNavBar/> <ForgotPassword/> </>}/>

       <Route path="/userdashboard" element={<> <LogNavbar/> <UserDashboard/> </>}/>

       <Route path="/userrecipes" element={<> <UserRecipes/></>}/>

       <Route path="/addnewrecipe" element={<> <LogNavbar/> <RecipeForm/></>}/>

       <Route path="/feedback" element={<><LogNavbar/><Feedback/></>}/>

       <Route path="/userprofile" element={<><LogNavbar/><UserProfile/></>}/>

       <Route path="/allrecepies" element={<><LogNavbar/><AllRecipes/></>}/>


       {/* <Route path="/viewrecipe" element={<UserProfile></UserProfile>}></Route> */}

       <Route path="/home/view/:id" element={<HomeViewRecipe/>}></Route>
       
       <Route path="/view/:id" element={<RecipeDetails></RecipeDetails>}></Route>

       <Route path="/user/view/:id" element={<ViewUserRecipe/>}></Route>


       <Route path="/adminviewuser/:id" element={<><AdminNavbar/><AdminViewUser></AdminViewUser></>}/>

       <Route path="/edit/:id" element={<><AdminNavbar/><EditRecipe></EditRecipe></>}></Route>

       <Route path="/editprofile" element={<><LogNavbar/><EditProfile></EditProfile></>}></Route>

       {/* All Admin */}

       <Route path="/adminDashboard" element={<><AdminNavbar/><AdminDashboard/></>}/>

       <Route path="/adminGetAllUsers" element={<><AdminNavbar/><AdminGetAllUsers/></>}></Route>

       <Route path="/adminGetAllRecipes" element={<><AdminNavbar/><AdminGetAllRecipes/></>}></Route>

       <Route path="/adminGetAllFeedbacks" element={<><AdminNavbar/><AdminGetAllFeedbacks/></>}></Route>

       <Route path="/adminProfile" element={<><AdminNavbar/><AdminProfile></AdminProfile></>}></Route>

       <Route path="/editAdminProfile" element={<><AdminNavbar/><EditAdminProfile></EditAdminProfile></>}></Route>

       <Route path="/adminviewrecipe/:id" element={<><AdminNavbar/><AdminViewRecipe></AdminViewRecipe></>}></Route>
       </Routes>
       <Footer></Footer>
    </>
  );
}
export default App;