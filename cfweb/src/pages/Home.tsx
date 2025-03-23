import { useState, useEffect, useRef } from 'react';
import Banner from '../components/home/Banner';
import WhyUs from '../components/home/WhyUs';
import HomeCourse from '../components/home/HomeCourse';
import Feedback from '../components/home/Feedback';
import HomeContact from '../components/home/HomeContact';
import ScrollToTop from '../components/shared/ScrollToTop';
import ScrollProgress from '../components/shared/ScrollProgress';

// Create a global store for our animation state
// This persists between component mounts/unmounts
const globalStore = {
  // Track if sections have been animated already
  animatedSections: new Set<string>(),
  // Track if home has been mounted
  hasBeenMounted: false
};

const Home = () => {
  // Initialize visibility based on whether sections have been animated before
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({
    banner: true, // Banner is always visible initially
    whyUs: globalStore.animatedSections.has('whyUs'),
    homeCourse: globalStore.animatedSections.has('homeCourse'),
    feedback: globalStore.animatedSections.has('feedback'),
    homeContact: globalStore.animatedSections.has('homeContact')
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mark that Home has been mounted
  useEffect(() => {
    globalStore.hasBeenMounted = true;
  }, []);

  useEffect(() => {
    // Only set up new observers for sections that haven't been animated yet
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibleSections: { [key: string]: boolean } = {};
        
        entries.forEach(entry => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            newVisibleSections[sectionId] = true;
            // Add to our global store of animated sections
            globalStore.animatedSections.add(sectionId);
            // Once a section is visible, we don't need to observe it anymore
            observerRef.current?.unobserve(entry.target);
          }
        });

        if (Object.keys(newVisibleSections).length > 0) {
          setVisibleSections(prev => ({
            ...prev,
            ...newVisibleSections
          }));
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    // Only observe sections that haven't been animated yet
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionId = section.id;
      if (!globalStore.animatedSections.has(sectionId)) {
        observerRef.current?.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        sections.forEach(section => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, []); // Empty dependency array since we only want to set up the observer once

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      
      <Banner isVisible={visibleSections.banner} />
      <WhyUs isVisible={visibleSections.whyUs} />
      <HomeCourse isVisible={visibleSections.homeCourse} />
      <Feedback isVisible={visibleSections.feedback} />
      <HomeContact isVisible={visibleSections.homeContact} />

      <ScrollToTop />
    </div>
  );
};

export default Home; 