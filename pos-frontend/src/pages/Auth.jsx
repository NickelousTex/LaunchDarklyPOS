import React, { useEffect } from "react";
import restaurant from "../assets/images/restaurant-img.jpg"
import logo from "../assets/images/logo.png"
import launchdarklyLogo from "../assets/images/launchdarkly-logo.png"
import QuickLogin from "../components/auth/QuickLogin";

const Auth = () => {

  useEffect(() => {
    document.title = "POS | Quick Login"
  }, [])

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        {/* BG Image */}
        <img className="w-full h-full object-cover" src={restaurant} alt="Restaurant Image" />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Deliver features with confidence, speed, and control — delight your users every time, and they’ll keep coming back."
          <br />
          <span className="block mt-4 text-yellow-400">- Motto of Rollout Noodles</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Restro Logo" className="h-14 w-14 border-2 rounded-full p-1" />
            <img src={launchdarklyLogo} alt="LaunchDarkly Logo" className="h-14 w-14 object-contain" />
          </div>
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Rollout Noodles</h1>
          <p className="text-sm text-[#ababab]">Powered by LaunchDarkly</p>
        </div>

        {/* Quick Login Component */}  
        <div className="mt-16">
          <QuickLogin />
        </div>

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab] text-center">
            Select your role to access the POS system
            <br />
            <span className="text-yellow-400">No registration required!</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
