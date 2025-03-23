import { useState, useEffect } from 'react';

/**
 * Custom hook to persist form state in localStorage
 * This allows form data to be preserved when navigating between pages
 * 
 * @param key - Unique identifier for the form
 * @param initialState - Initial state of the form
 * @param expireTime - Optional time in milliseconds after which the stored form data expires
 * @returns [formState, setFormState, clearFormState] - Form state and functions to update or clear it
 */
function useFormPersist<T>(
  key: string, 
  initialState: T, 
  expireTime?: number
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  // Create a full key that includes a prefix to avoid conflicts
  const storageKey = `form_state_${key}`;
  
  // Initialize state either from localStorage or with initialState
  const [formState, setFormState] = useState<T>(() => {
    try {
      // Try to get the stored data
      const item = localStorage.getItem(storageKey);
      
      // If we have stored data
      if (item) {
        const storedState = JSON.parse(item);
        
        // Check if the stored data has expired
        if (expireTime && storedState._timestamp) {
          const now = new Date().getTime();
          if (now - storedState._timestamp > expireTime) {
            // Data has expired, return initial state
            return initialState;
          }
        }
        
        // Filter out the _timestamp property before returning
        const { _timestamp, ...data } = storedState;
        return data as T;
      }
      
      // No stored data found, return initial state
      return initialState;
    } catch (error) {
      // If there's an error (e.g. localStorage not available), return initial state
      console.error('Error reading form state from localStorage:', error);
      return initialState;
    }
  });
  
  // Update localStorage whenever state changes
  useEffect(() => {
    try {
      // Add a timestamp to the stored data for expiration check
      const dataWithTimestamp = {
        ...formState,
        _timestamp: new Date().getTime()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(dataWithTimestamp));
    } catch (error) {
      console.error('Error saving form state to localStorage:', error);
    }
  }, [formState, storageKey]);
  
  // Function to clear the stored form state
  const clearFormState = () => {
    try {
      localStorage.removeItem(storageKey);
      setFormState(initialState);
    } catch (error) {
      console.error('Error clearing form state:', error);
    }
  };
  
  return [formState, setFormState, clearFormState];
}

export default useFormPersist; 