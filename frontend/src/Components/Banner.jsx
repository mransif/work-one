import React from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const Banner = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="bg-blue-50 md:w-[50vw] md:h-screen pt-25 p-5 sm:h-[50vh] sm:w-screen">
        <div className="">
          <h1 className="md:text-4xl md:p-3 font-bold text-gray-900 sm:text-lg">
            MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY
          </h1>
          <p className="md:pt-3 md:text-lg sm:pt-3 sm:p-5 text-sm">
            Musaliar College of Engineering and Technology, located in
            Pathanamthitta, Kerala, is a prominent institution established in
            2002 under the Musaliar Education Trust. The college is approved by
            AICTE and affiliated with APJ Abdul Kalam Technological University.
          </p>
        </div>
        <div className="p-2 pl-0">
          <Button
            title="Login"
            rightIcon={<TiLocationArrow />}
            containerClass="bg-[#98111E] flex justify-center item-center"
          />
        </div>
      </div>

      <div className="md:w-[50vw] md:h-screen sm:h-[50vh] sm:w-screen">
        <div>
        <img src="/images/bg-img.jpg" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
