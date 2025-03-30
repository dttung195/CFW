// Google Sheets Service - Handles integration with Google Apps Script

// Secret token used for authentication with Google Apps Script
// In a production app, this should be stored in environment variables
const SECRET_TOKEN = "iuwrgnh8wuegh8weuafasi8uhfuyq32fi8ueqwaf8vuqhenfiquy34hwfyqwh4.dajfi38diuauhw";

// Google Apps Script deployed web app URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUEkwUKO0i9AQib0G4mbN9TRw_yUIgLxDhDAkN43y52Ny05B3LSG6NBo7rpJu1JHpZGA/exec';

// Define the contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  registerMessage: string;
}

// Response interface from Google Apps Script
interface SheetResponse {
  result: 'success' | 'error';
  success: boolean;  // Added for compatibility with form component
  data?: any;
  error?: string;
}

/**
 * Submits form data to Google Sheets via Apps Script
 * @param formData The contact form data to submit
 * @returns Promise that resolves with the submission result
 */
export const submitToGoogleSheet = async (formData: ContactFormData): Promise<SheetResponse> => {
  try {
    // Format the current date in dd/MM/yyyy HH:mm format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    
    // Format the data for Google Sheets
    const data = {
      Timestamp: formattedDate,
      Name: formData.name,
      Email: formData.email,
      Phone: "'" + formData.phone, // Adding single quote to preserve leading zeros
      Subject: formData.subject,
      Message: formData.message,
      RegisterMessage: formData.registerMessage,
      // Add security parameters
      token: SECRET_TOKEN,
      referrer: window.location.hostname
    };
    
    console.log("Submitting data:", { ...data, token: "[REDACTED]" });
    
    // Create URL with parameters
    const url = new URL(SCRIPT_URL);
    Object.entries(data).forEach(([key, value]) => {
      console.log("key: ", key, "param: ", value);
      url.searchParams.append(key, String(value));
    });
    
    // Send the request
    const response = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow'
    });
    
    // Parse the response
    const responseText = await response.text();
    let responseData: SheetResponse;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse response:", responseText);
      throw new Error("Invalid response from server");
    }
    
    if (responseData.result === "error") {
      console.error("Server error:", responseData.error);
      throw new Error(responseData.error || "Unknown server error");
    }
    
    console.log('Form submitted successfully, response:', responseData);
    // Add success property based on result
    return {
      ...responseData,
      success: responseData.result === 'success'
    };
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    return {
      result: 'error',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 