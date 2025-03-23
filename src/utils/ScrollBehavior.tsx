import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that handles scrolling behavior when navigating between routes:
 * - For the home page, it maintains the scroll position when returning from other pages
 * - For other pages, it scrolls to the top when navigating to them
 */
const ScrollBehavior: React.FC = () => {
  const { pathname } = useLocation();
  const homeScrollPositionRef = useRef<number>(0);
  const prevPathRef = useRef<string>('');
  const isFirstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    // Skip the first render to avoid unexpected scroll behavior on initial page load
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevPathRef.current = pathname;
      return;
    }

    // If we're navigating away from the home page, save the current scroll position
    if (prevPathRef.current === '/' && pathname !== '/') {
      homeScrollPositionRef.current = window.scrollY;
    }

    // Update the previous path
    prevPathRef.current = pathname;

    // Handle scrolling behavior
    if (pathname === '/') {
      // When returning to home page, restore the previous scroll position with a slight delay
      // to ensure the page has fully rendered
      setTimeout(() => {
        window.scrollTo({
          top: homeScrollPositionRef.current,
          behavior: 'auto' // Use auto to avoid animation conflict
        });
      }, 0);
    } else {
      // For all other pages, scroll to the top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollBehavior; 