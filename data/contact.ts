/**
 * Official Contact & WhatsApp Configuration for Nimble Holidays
 * Phone: +91 70929 36243
 */
export const CONTACT_INFO = {
  phone: '+91 70929 36243',
  phoneRaw: '+917092936243',
  whatsappNumber: '917092936243', // 7092936243 with India +91 country code
  whatsappDisplay: '+91 70929 36243',
  email: 'info@nimbleholidays.com',
  address: 'Onattukara, Mavelikkara, Alappuzha District, Kerala 690101, India',
};

/**
 * Generates an official WhatsApp click-to-chat URL with pre-filled message text.
 */
export const getWhatsAppLink = (message: string): string => {
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
