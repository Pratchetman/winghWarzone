import React, { useEffect, useState } from "react";
import "./countdown.scss";
export const Countdown = ({ DATE_TARGET }) => {
  const [seconds, setSeconds] = useState("00");
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [now, setNow] = useState(new Date());
  const [duration, setDuration] = useState(DATE_TARGET - now);

  useEffect(() => {
    setDays(Math.floor(duration / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((duration % (1000 * 60)) / 1000));
  }, [duration]);

  setInterval(() => {
    setDuration(DATE_TARGET - new Date());
  }, 1000);

  return (
    <h1>
      {days} : {hours < 10 && 0}
      {hours} : {minutes < 10 && 0}
      {minutes} : {seconds < 10 && 0}
      {seconds}
    </h1>
  );
};
