import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoNgang from '../../assets/images/logo-ngang.png';

interface NavLink {
  name: string;
  path: string;
  section?: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    direction: 'none' // 'left', 'right', or 'none'
  });
  const location = useLocation();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<string>('');
  const navItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add a small threshold to prevent flickering
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  // Update active tab based on location
  useEffect(() => {
    // Find the active link based on current path or hash
    const activeLink = navLinks.find(link => {
      return (link.path != '/' && location.pathname.startsWith(link.path)) || 
      (link.path === location.pathname && link.path === '/' ) || 
      (link.section && location.pathname === '/' && location.hash === `#${link.section}` && link.name !== 'Course')
    });
    
    if (activeLink) {
      const prevTab = activeTabRef.current;
      const newTab = activeLink.name;
      
      // Determine direction of movement for animation
      if (prevTab && newTab !== prevTab) {
        const prevIndex = navLinks.findIndex(link => link.name === prevTab);
        const newIndex = navLinks.findIndex(link => link.name === newTab);
        const direction = prevIndex < newIndex ? 'right' : 'left';
        setIndicatorStyle(prev => ({ ...prev, direction }));
      }
      
      setActiveTab(newTab);
      activeTabRef.current = newTab;
    } else {
      // Default to home if no match
      setActiveTab('Home');
      activeTabRef.current = 'Home';
    }
  }, [location]);

  // Update indicator position when active tab changes
  useEffect(() => {
    if (activeTab && navItemRefs.current[activeTab]) {
      const activeElement = navItemRefs.current[activeTab];
      if (activeElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        
        // Calculate position relative to the nav container
        const left = activeRect.left - navRect.left;
        const width = activeRect.width;
        
        setIndicatorStyle(prev => ({
          ...prev,
          left,
          width
        }));
      }
    }
  }, [activeTab, isScrolled]);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string | undefined, linkName: string, event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!sectionId) return;
    
    setIsMobileMenuOpen(false);
    setActiveTab(linkName);
    activeTabRef.current = linkName;
    
    // Create ripple effect if event is provided
    if (event) {
      createRippleEffect(event);
    }
    
    // Only scroll if we're on the homepage
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a small delay to ensure any state changes complete first
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  };

  // Create ripple effect on click
  const createRippleEffect = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove the ripple after animation completes
    setTimeout(() => {
      if (circle) {
        circle.remove();
      }
    }, 600);
  };

  const navLinks: NavLink[] = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khoá học', path: '/courses' },
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Đánh giá', path: '/feedback' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logoNgang} alt="Code Fun Logo" className="h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav 
          ref={navRef}
          className="hidden md:flex items-center space-x-8 relative"
        >
          {/* Animated Indicator */}
          <div 
            ref={indicatorRef}
            className={`menu-indicator ${
              indicatorStyle.direction === 'left' 
                ? 'menu-indicator-left' 
                : indicatorStyle.direction === 'right' 
                  ? 'menu-indicator-right' 
                  : 'menu-indicator-active'
            }`}
            style={{ 
              left: `${indicatorStyle.left}px`, 
              width: `${indicatorStyle.width}px`,
              '--indicator-color': '#3b82f6'
            } as React.CSSProperties}
          ></div>

          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            
            // Special case for Courses - always use NavLink
            if (link.name === 'Course') {
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  ref={(el) => { navItemRefs.current[link.name] = el; }}
                  onClick={(e) => {
                    setActiveTab(link.name);
                    activeTabRef.current = link.name;
                    createRippleEffect(e);
                  }}
                  className={`text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                    isActive 
                      ? 'text-primary' 
                      : isScrolled ? 'text-gray-800' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                  <span className={`absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg ${
                    isActive ? 'bg-opacity-5' : ''
                  }`}></span>
                </NavLink>
              );
            }
            
            return link.section ? (
              <a
                key={link.name}
                href={link.path}
                ref={(el) => { navItemRefs.current[link.name] = el; }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.section, link.name, e);
                }}
                className={`text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'text-primary' 
                    : isScrolled ? 'text-gray-800' : 'text-gray-800'
                }`}
              >
                {link.name}
                <span className={`absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg ${
                  isActive ? 'bg-opacity-5' : ''
                }`}></span>
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                ref={(el) => { navItemRefs.current[link.name] = el; }}
                onClick={(e) => {
                  setActiveTab(link.name);
                  activeTabRef.current = link.name;
                  createRippleEffect(e);
                }}
                className={`text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'text-primary' 
                    : isScrolled ? 'text-gray-800' : 'text-gray-800'
                }`}
              >
                {link.name}
                <span className={`absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg ${
                  isActive ? 'bg-opacity-5' : ''
                }`}></span>
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6 text-gray-800" />
          ) : (
            <FaBars className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container py-8">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, index) => {
              const isActive = activeTab === link.name;
              const animationDelay = `${(index + 1) * 0.1}s`;
              
              if (link.name === 'Course') {
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab(link.name);
                      activeTabRef.current = link.name;
                    }}
                    className={`text-xl font-medium transition-all duration-300 ${
                      isActive ? 'text-primary' : 'text-gray-800'
                    } opacity-0 animate-fade-in-up`}
                    style={{ animationDelay, animationFillMode: 'forwards' }}
                  >
                    {link.name}
                  </NavLink>
                );
              }
              
              return link.section ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    scrollToSection(link.section, link.name);
                  }}
                  className={`text-xl font-medium transition-all duration-300 ${
                    isActive ? 'text-primary' : 'text-gray-800'
                  } opacity-0 animate-fade-in-up`}
                  style={{ animationDelay, animationFillMode: 'forwards' }}
                >
                  {link.name}
                </a>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveTab(link.name);
                    activeTabRef.current = link.name;
                  }}
                  className={`text-xl font-medium transition-all duration-300 ${
                    isActive ? 'text-primary' : 'text-gray-800'
                  } opacity-0 animate-fade-in-up`}
                  style={{ animationDelay, animationFillMode: 'forwards' }}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 