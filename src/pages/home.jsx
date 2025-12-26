import Header from "../components/Header";
import Main from "../components/Main";
import ReactDOM from "react-dom";
import Banner from "../components/banner";
import BestReview from "../components/BestReview";
import '../index.css';
import Profile from "../components/profile";
import Vote from "../components/vote";
import { Outlet } from "react-router-dom";
//ReactDOM.render(<Main />, document.getElementById("app"));
function Home() {
  return (
  <div>
      <Main />   {/* 메인 콘텐츠 */}
      <Banner />
      <BestReview />
      <Profile />
      {/*<Vote /> */}
      <Outlet /> 
    </div>
  );
}

export default Home;