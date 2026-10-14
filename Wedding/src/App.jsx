import { useRef, useState, useEffect } from "react";
import Hero from "./components/Hero";
import Verse from "./components/Verse";
// import { useGSAP } from "@gsap/react";
import MempelaiPria from "./components/MempelaiPria";
import Countdown from "./components/Countdown";
// import Salam from "./components/Salam";
import MempelaiWanita from "./components/MempelaiWanita";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import Close from "./components/Close";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Amplop from "./components/Salam";
import Generator from "./components/Generator";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function App() {
  const TargetScroll = useRef(null);
  const params = new URLSearchParams(window.location.search);
  console.log(params.get("mode"), params.get("key"));
  if (
    params.get("mode") === "generator" &&
    params.get("key") === "yosefmaria2026"
  ) {
    return <Generator />;
  }
  const tampilRek = params.get("rek") === "1";
  function tombolScroll() {
    TargetScroll.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  return (
    <div>
      <Hero handleScroll={tombolScroll} />
      <Verse ref={TargetScroll} />
      <MempelaiPria />
      <MempelaiWanita />
      <Countdown />
      <EventDetails />
      <Gallery />
      <RSVP />
      {tampilRek && <Amplop />}
      <Close />
    </div>
  );
}
