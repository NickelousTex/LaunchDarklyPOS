import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFeatureFlag } from "../../hooks/useFeatureFlag";
import { FEATURE_FLAGS } from "../../config/launchdarkly";

const Greetings = () => {
  const userData = useSelector(state => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  
  // Feature flag for timezone offset (defaults to 0 if not set)
  const timezoneOffset = useFeatureFlag(FEATURE_FLAGS.TIMEZONE_OFFSET, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Get current UTC time
      const now = new Date();
      const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
      
      // Apply timezone offset (in hours) to UTC time
      const offsetTime = new Date(utcTime.getTime() + (timezoneOffset.value * 60 * 60 * 1000));
      setDateTime(offsetTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [timezoneOffset.value]);

  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <div>
        <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
          Good Morning, {userData.name || "TEST USER"}
        </h1>
        <p className="text-[#ababab] text-sm">
          Give your best services for customers 😀
        </p>
      </div>
      <div>
        <h1 className="text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]">{formatTime(dateTime)}</h1>
        <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
