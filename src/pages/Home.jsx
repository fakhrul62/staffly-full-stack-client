import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import PlatformShowcase from "../components/PlatformShowcase";
import PricingSection from "../components/PricingSection";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <PlatformShowcase />
      <AboutUs />
      <Testimonial />
      <WhyChooseUs />
      <PricingSection />
    </div>
  );
};

export default Home;
