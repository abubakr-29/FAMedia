"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  {
    name: "Home",
    href: "#hero",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: 2,
        },
      });

      // Animate divider
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      // Animate logo section
      if (logoSectionRef.current) {
        tl.fromTo(
          logoSectionRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.2
        );
      }

      // Animate links
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.3
        );
      }

      // Animate bottom section
      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.4
        );
      }
    },
    { scope: footerRef }
  );

  // Handle navigation clicks with Lenis
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    // Handle home page link
    if (href === "/") {
      if (pathname === "/") {
        // Already on home, scroll to top
        lenis?.scrollTo(0, {
          duration: 1.8,
          easing: (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        });
      } else {
        // Navigate to home page
        router.push("/");
      }
      return;
    }

    // Handle section links
    if (href.startsWith("#")) {
      if (pathname === "/") {
        // Same page - smooth scroll
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element && lenis) {
          const navbar = document.querySelector("header");
          const offset = navbar?.offsetHeight ?? 80;

          lenis.scrollTo(element, {
            offset: -offset - 20,
            duration: 1.8,
            easing: (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          });

          window.history.pushState({}, "", href);
        }
      } else {
        // Different page - navigate to home with hash
        router.push(`/${href}`);
      }
      return;
    }

    // Handle regular page links (like /privacy-policy)
    router.push(href);
  };

  return (
    <footer
      ref={footerRef}
      className="font-inter px-4 pt-24 pb-12 relative z-10 bg-linear-to-b from-black to-[#0a0a0a]"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Gradient Divider */}
        <div
          ref={dividerRef}
          className="w-full h-0.5 bg-linear-to-r from-transparent via-stone-600 to-transparent mb-12 origin-center opacity-0"
        ></div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 mb-16">
          {/* Logo Section */}
          <div
            ref={logoSectionRef}
            className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 opacity-0"
          >
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-lime-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <Image
                  src="/famedialogo.webp"
                  alt="FAMedia Logo"
                  width={90}
                  height={60}
                  className="relative z-10"
                />
              </div>
            </Link>
            <p className="text-center sm:text-left text-sm text-stone-400 mt-6 max-w-xs font-light leading-relaxed">
              Elevating brands with stunning web experiences that captivate and
              convert.
            </p>
            {/* Social Icons */}
            <p className="text-stone-400 text-sm mt-6 mb-4">Connect with us</p>
            <div className="flex gap-4">
              <Link
                href={"https://www.instagram.com/famedia.labs/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </Link>
              {/* <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link> */}
              <Link
                href={"https://www.linkedin.com/company/fa-media-labs/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href={
                  "https://wa.me/+919007873303?text=Hi%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20your%20services."
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Link>
              <Link
                href={
                  "https://mail.google.com/mail/?view=cm&fs=1&to=support@famedia.co.in&su=Inquiry%20from%20FA%20Media%20Website&body=Hi%20FA%20Media%20Team%2C%0D%0A%0D%0AI%20came%20across%20your%20website%20and%20I'm%20interested%20in%20working%20with%20you.%20Please%20let%20me%20know%20how%20we%20can%20proceed.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D"
                }
                className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-stone-700 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <ul
            ref={linksRef}
            className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-stone-300 text-base font-medium mt-8 md:mt-0 opacity-0"
          >
            {links.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative group cursor-pointer"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#54d265] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-stone-400 text-sm font-light pt-8 border-t border-stone-800/50 opacity-0"
        >
          <p className="text-center sm:text-left">
            © {currentYear} FA Media. All Rights Reserved.
          </p>

          <div className="flex justify-center sm:justify-start gap-x-6">
            <Link
              href="/terms-of-service"
              className="relative group hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/privacy-policy"
              className="relative group hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
