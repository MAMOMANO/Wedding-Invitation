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

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function App() {
  const TargetScroll = useRef(null);
  // const GambarLoad = [fixbunga4, bmekar, mkr2, corner1];
  // const [isLoad, setIsLoad] = useState(true);

  // useEffect(() => {
  //   const sapromise = GambarLoad.map((src) => {
  //     return new Promise((resolve) => {
  //       const img = new Image();
  //       img.src = src;
  //       img.onload = () => resolve();
  //     });
  //   });

  //   Promise.all(sapromise).then(() => {
  //     setIsLoad(false);
  //   });
  // }, []);

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
      <Amplop />
      <Close />
    </div>
  );
}
