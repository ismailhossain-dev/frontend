import Books from "../../components/Home/Books";
import Map from "../../Map/Map";
import Section from "../Section/Section";
import Slider from "../Slider/Slider";
const Home = () => {
  //Tenstake diye data fetch

  return (
    <div>
      <Slider/>
      <Books/>
       <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-5 text-blue-500">
        Our Coverage Area
      </h2>

      <Map />
    </div>
      {/* More components */}
      <Section/>
    </div>
  );
};

export default Home;
