"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll for navbar visibility and active section
  useEffect(() => {
    let lastScroll = 0; // Local variable instead of state

    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);

      if (scrollY === 0) {
        setIsVisible(true);
      } else if (scrollY < lastScroll) {
        setIsVisible(true);
      } else if (scrollY > lastScroll && scrollY > 100) {
        setIsVisible(false);
      }

      lastScroll = scrollY; // Update local variable, not state

      // Track active section - only on home page
      if (pathname === "/") {
        const sections = NAV_ITEMS.filter((item) =>
          item.href.startsWith("#")
        ).map((item) => item.href.replace("#", ""));
        const scrollPosition = scrollY + 150;

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Only pathname in dependency array

  // Handle hash navigation after page load (for cross-page navigation)
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash;
      const targetId = hash.replace("#", "");

      // Wait for page to fully load
      const timer = setTimeout(() => {
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
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    // Close mobile menu immediately
    setIsMenuOpen(false);

    // Handle home page link
    if (href === "/") {
      if (pathname === "/") {
        // Already on home, scroll to top
        setTimeout(() => {
          lenis?.scrollTo(0, {
            duration: 1.8,
            easing: (t: number) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          });
        }, 300);
      } else {
        // Navigate to home page
        router.push("/");
      }
      return;
    }

    // Handle section links
    if (href.startsWith("#")) {
      if (pathname === "/") {
        // Same page - smooth scroll with delay for mobile menu close
        setTimeout(() => {
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
        }, 300);
      } else {
        // Different page - navigate to home with hash
        router.push(`/${href}`);
      }
      return;
    }

    // Handle regular page links (like /privacy-policy)
    router.push(href);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive =
      item.href === "/"
        ? pathname === "/" && activeSection === "hero"
        : pathname === "/" && activeSection === item.href.replace("#", "");

    return (
      <Link
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`font-inter font-semibold uppercase text-[0.7rem] tracking-wide transition-all duration-300 cursor-pointer ${
          isActive ? "text-[#54d265]" : "text-white group-hover:text-[#54d265]"
        }`}
      >
        {item.name}
      </Link>
    );
  };

  const MobileNavLink = ({ item }: { item: NavItem }) => {
    const isActive =
      item.href === "/"
        ? pathname === "/" && activeSection === "hero"
        : pathname === "/" && activeSection === item.href.replace("#", "");

    return (
      <Link
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`font-inter font-semibold uppercase text-sm transition-all duration-300 cursor-pointer ${
          isActive ? "text-[#54d265]" : "text-white group-hover:text-[#54d265]"
        }`}
      >
        {item.name}
      </Link>
    );
  };

  const navItems1 = NAV_ITEMS.slice(0, 3);
  const navItems2 = NAV_ITEMS.slice(3);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${
        isVisible
          ? isScrolled
            ? "backdrop-blur-md shadow-md translate-y-0"
            : "translate-y-0"
          : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto px-6 md:px-14 xl:px-30">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Navigation 1 */}
          <div className="hidden xl:flex space-x-14 h-full items-center">
            {navItems1.map((item) => (
              <div
                key={item.name}
                className="h-full group relative flex items-center cursor-pointer"
              >
                <NavLink item={item} />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] mt-[9px] bg-[#54d265] h-px transition-all duration-300 ${
                    (
                      item.href === "/"
                        ? pathname === "/" && activeSection === "hero"
                        : pathname === "/" &&
                          activeSection === item.href.replace("#", "")
                    )
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="z-50"
          >
            <Image
              src="/famedialogo.webp"
              width={100}
              height={100}
              alt="FA Media Logo"
              priority
              style={{ width: "auto", height: "75px" }}
            />
          </Link>

          {/* Desktop Navigation 2 */}
          <div className="hidden xl:flex space-x-14 h-full items-center">
            {navItems2.map((item) => (
              <div
                key={item.name}
                className="h-full group relative flex items-center cursor-pointer"
              >
                <NavLink item={item} />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] mt-[9px] bg-[#54d265] h-px transition-all duration-300 ${
                    (
                      item.href === "/"
                        ? pathname === "/" && activeSection === "hero"
                        : pathname === "/" &&
                          activeSection === item.href.replace("#", "")
                    )
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="z-50 xl:hidden">
            <button
              className={`menu ${isMenuOpen ? "opened" : ""}`}
              aria-label="Main Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="50" height="50" viewBox="0 0 100 100">
                <path
                  className="line line1"
                  stroke="#fff"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className="line line2" stroke="#fff" d="M 20,50 H 80" />
                <path
                  className="line line3"
                  stroke="#fff"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`xl:hidden fixed inset-0 z-40 px-10 sm:px-14 h-screen w-full bg-black transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-8 items-center justify-center h-full">
            {NAV_ITEMS.map((item) => (
              <div className="group w-fit" key={item.name}>
                <MobileNavLink item={item} />
                <div
                  className={`mx-auto bg-[#54d265] h-px transition-all duration-300 ${
                    (
                      item.href === "/"
                        ? pathname === "/" && activeSection === "hero"
                        : pathname === "/" &&
                          activeSection === item.href.replace("#", "")
                    )
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
