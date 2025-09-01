
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateProductDescription = async (product) => {
  console.log('🔑 API Key loaded:', !!GEMINI_API_KEY);

  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
    throw new Error("API key is missing. Please check your .env.local file and restart the dev server.");
  }

  const prompt = `Write a compelling e-commerce product description for "${product.title}" in the ${product.category} category. Make it engaging and persuasive in 100-150 words.`;
  
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 200
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("No text generated from AI");
    }

    return text.trim();
  } catch (error) {
    console.error('Generate description error:', error);
    throw error;
  }
};

export const generateSpeech = async (text) => {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      window.speechSynthesis.speak(utterance);
    } else {
      reject(new Error("Speech synthesis not supported"));
    }
  });
};
