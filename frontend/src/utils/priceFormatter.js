/**
 * Format price in Indian Rupee format
 * @param {number} price - The price to format
 * @returns {string} Formatted price string with ₹ symbol and Indian number format
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '₹0';
  }
  
  // Convert to number and round to 2 decimal places
  const numPrice = parseFloat(price);
  const roundedPrice = Math.round(numPrice * 100) / 100;
  
  // Format with Indian number system (lakhs, crores)
  // Using toLocaleString with 'en-IN' for Indian number format
  const formatted = roundedPrice.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });
  
  return `₹${formatted}`;
};

/**
 * Format price with decimal places
 * @param {number} price - The price to format
 * @returns {string} Formatted price string with ₹ symbol and decimals
 */
export const formatPriceWithDecimals = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '₹0.00';
  }
  
  const numPrice = parseFloat(price);
  const roundedPrice = Math.round(numPrice * 100) / 100;
  
  const formatted = roundedPrice.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
  
  return `₹${formatted}`;
};

