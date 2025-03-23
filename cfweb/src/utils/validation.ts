/**
 * Utility functions for form validation
 */

/**
 * Validates a Vietnamese phone number
 * @param phone The phone number to validate
 * @returns {boolean} True if the phone number is valid, false otherwise
 */
export const isValidVietnamesePhone = (phone: string): boolean => {
  // Strip out any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Vietnam phone number patterns:
  // - Must be 10 digits (excluding country code)
  // - If it includes country code (+84), it will be 11-12 digits
  // - Must start with 0 or 84 (country code)
  // - Common first digits after 0: 3, 5, 7, 8, 9
  
  // Check if the phone number is exactly 10 digits and starts with 0
  if (digitsOnly.length === 10 && digitsOnly.startsWith('0')) {
    const secondDigit = digitsOnly.charAt(1);
    return ['3', '5', '7', '8', '9'].includes(secondDigit);
  }
  
  // Check if the phone number is 11 digits and starts with 84
  if (digitsOnly.length === 11 && digitsOnly.startsWith('84')) {
    const digit = digitsOnly.charAt(2);
    return ['3', '5', '7', '8', '9'].includes(digit);
  }
  
  // Check if it's a number with country code format like +84
  if (digitsOnly.length === 11 && digitsOnly.startsWith('84')) {
    const thirdDigit = digitsOnly.charAt(2);
    return ['3', '5', '7', '8', '9'].includes(thirdDigit);
  }
  
  return false;
};

/**
 * Formats a phone number for display (adds spaces for readability)
 * @param phone The phone number to format
 * @returns {string} The formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Strip out any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // If the number starts with 84, assume it's a country code
  if (digitsOnly.startsWith('84') && digitsOnly.length >= 10) {
    const withoutCode = digitsOnly.substring(2);
    // Format as: 0xxx xxx xxx
    return `0${withoutCode.substring(0, 3)} ${withoutCode.substring(3, 6)} ${withoutCode.substring(6)}`;
  }
  
  // For a regular 10-digit number starting with 0
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    // Format as: 0xxx xxx xxx
    return `${digitsOnly.substring(0, 4)} ${digitsOnly.substring(4, 7)} ${digitsOnly.substring(7)}`;
  }
  
  // Return the original input if it doesn't match expected patterns
  return phone;
}; 