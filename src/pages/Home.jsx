import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <AboutUs></AboutUs>
            <Testimonial></Testimonial>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;