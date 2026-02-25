import Books from "../../components/Home/Books";

import Section from "../Section/Section";
import Slider from "../Slider/Slider";
const Home = () => {
  //Tenstake diye data fetch

  return (
    <div>
      <Slider />
      <Books />
      <div className="my-10"></div>
      {/* More components */}
      <Section />
    </div>
  );
};

export default Home;
