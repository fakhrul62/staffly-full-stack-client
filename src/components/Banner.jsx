import { Carousel, Button } from "flowbite-react";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { Avatar, AvatarGroup } from "flowbite-react";
import Lottie from "lottie-react";
import heroAnimation from "../assets/lottie/hero-img.json";

const Banner = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 my-5">
      <div className="md:col-span-3">
        <Carousel
          slideInterval={5000}
          className="rounded-xl overflow-hidden h-[550px]"
        >
          <div className="relative h-full md:py-10 py-10 md:px-20 px-10 flex flex-col justify-center  bg-[url(https://i.ibb.co.com/6tJR67L/hero02-img01.jpg)] bg-no-repeat bg-cover md:bg-center bg-right space-y-5">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 md:block hidden">
              <span className="bg-zinc-700 p-3 rounded-xl text-white text-xs font-chivo">
                <span className="bg-white text-black p-1 rounded-md mr-2">
                  Staffly
                </span>{" "}
                POWERFUL BONDS WITHIN TEAMS
              </span>
            </div>
            <div className="relative z-10 block md:hidden">
              <span className="bg-zinc-700 p-3 gap-3 rounded-xl text-white text-xs font-chivo flex md:flex-row flex-col md:items-center">
                <div>
                  <span className="bg-white text-black p-1 rounded-md inline-block mr-2">
                    Staffly
                  </span>
                </div>{" "}
                POWERFUL BONDS WITHIN TEAMS
              </span>
            </div>
            <h2 className="relative z-10 text-white md:text-7xl text-4xl font-chivo uppercase">
              Building Stronger Firms with HR Excellence
            </h2>
            <div>
              <Button color="blue" pill size="xl">
                More About
              </Button>
            </div>
          </div>
          <div className="relative h-full md:py-10 py-10 md:px-20 px-10 flex flex-col justify-center  bg-[url(https://i.ibb.co.com/wyfxL94/hero02-img02.jpg)] bg-no-repeat bg-cover md:bg-center bg-right  space-y-5">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 md:block hidden">
              <span className="bg-zinc-700 p-3 rounded-xl text-white text-xs font-chivo">
                <span className="bg-white text-black p-1 rounded-md mr-2">
                  Staffly
                </span>{" "}
                POWERFUL BONDS WITHIN TEAMS
              </span>
            </div>
            <div className="relative z-10 block md:hidden">
              <span className="bg-zinc-700 p-3 gap-3 rounded-xl text-white text-xs font-chivo flex md:flex-row flex-col md:items-center">
                <div>
                  <span className="bg-white text-black p-1 rounded-md inline-block mr-2">
                    Staffly
                  </span>
                </div>{" "}
                POWERFUL BONDS WITHIN TEAMS
              </span>
            </div>
            <h2 className="relative z-10 text-white md:text-7xl text-3xl font-chivo uppercase">
              Transforming HR, Elevating Success
            </h2>
            <div>
              <Button color="blue" pill size="xl">
                More About
              </Button>
            </div>
          </div>
        </Carousel>
      </div>
      <div>
        <div className="h-56 w-full bg-blue-100 border border-zinc-200 rounded-xl px-5 pt-5 pb-10 space-y-5">
          <LuChartNoAxesCombined className="bg-blue-600 text-white p-2 text-5xl rounded-lg" />
          <div>
            <h2 className="font-body text-xl mb-5">
              Business Growth and Follow Statistics
            </h2>
            <div>
              <AvatarGroup className="flex">
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-1.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-2.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-3.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-4.jpg"
                  rounded
                  stacked
                />
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
                  rounded
                  stacked
                />
              </AvatarGroup>
            </div>
          </div>
        </div>
        <div>
          <span className="h-32">
            <Lottie animationData={heroAnimation} loop={true} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
