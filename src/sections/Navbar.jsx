import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };
  return (
  <>
    <nav
      ref={navRef}
      className="fixed z-50 flex flex-col justify-between w-full h-full px-4 py-16 uppercase bg-black text-white/80 gap-y-6 md:w-[32%] md:left-[68%] overflow-y-auto"
    >
      {/* Menu Links */}
      <div className="flex flex-col text-3xl gap-y-2 md:text-4xl lg:text-5xl tracking-tight">
        {["home", "services", "about", "work", "contact"].map(
          (section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="hover:text-white transition-all duration-200 cursor-pointer"
                to={`${section}`}
                smooth
                offset={0}
                duration={1400}
              >
                {section}
              </Link>
            </div>
          )
        )}
      </div>

      {/* Contact & Resume */}
      <div
        ref={contactRef}
        className="flex flex-col gap-4 text-xs tracking-wider"
      >
        {/* Email */}
        <div className="font-light text-[11px]">
          <p className="text-white/50">E-mail</p>
          <p className="lowercase break-all leading-tight">
            abhijeetsaxena615@gmail.com
          </p>
        </div>

        {/* Social */}
        <div className="font-light text-[11px]">
          <p className="text-white/50">Social</p>
          <div className="flex flex-row flex-wrap gap-2">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase hover:text-white transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Resume Button */}
<div className="font-light text-[11px]">
  <p className="text-white/50">Resume</p>
  <a
    href="https://drive.google.com/file/d/1sIhyQwkN5a7qj1rFgP0ynR0af3sl-AbH/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-3 py-1 mt-1 text-black text-xs bg-white rounded-sm hover:bg-gray-300 transition-all"
  >
    Download
  </a>
</div>

      </div>
    </nav>

    {/* Burger Menu */}
    <div
      className="fixed z-50 flex flex-col items-center justify-center gap-0.5 bg-black rounded-full cursor-pointer w-10 h-10 md:w-12 md:h-12 top-4 right-5 transition-all duration-300"
      onClick={toggleMenu}
      style={
        showBurger
          ? { clipPath: "circle(50% at 50% 50%)" }
          : { clipPath: "circle(0% at 50% 50%)" }
      }
    >
      <span
        ref={topLineRef}
        className="block w-5 h-0.5 bg-white rounded-full origin-center"
      ></span>
      <span
        ref={bottomLineRef}
        className="block w-5 h-0.5 bg-white rounded-full origin-center"
      ></span>
    </div>
  </>
);

};

export default Navbar;
