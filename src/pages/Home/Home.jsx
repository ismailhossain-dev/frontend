import Blog from "../../components/Home/Blog/Blog.jsx";
import Books from "../../components/Home/Books";
import FaqSection from "../Section/FaqSection.jsx/FaqSection.jsx";
import FeaturedItems from "../Section/FeaturedItems.jsx";
import Section from "../Section/Section";
import Services from "../Section/Services.jsx";

import HomeSlide from "../Slider/HomeSlide";

const Home = () => {
  //Tenstake diye data fetch

  return (
    <div>
      <HomeSlide />
      <Books />
      <div className="my-10"></div>
      <Section />

      {/* Services section */}
      <Services />

      {/* Featured Item */}
      <FeaturedItems />

      {/* Blog section */}
      <Blog />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

export default Home;
