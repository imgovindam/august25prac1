
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

// Lightweight profanity filter (client-side fallback)
const PROFANITY = [
  "damn",
  "shit",
  "fuck",
  "bullshit",
  "bitch",
];

export const moderateText = (text) => {
  if (!text) return { blocked: false, reason: null };
  const low = text.toLowerCase();
  const found = PROFANITY.find((w) => low.includes(w));
  if (found) return { blocked: true, reason: `Contains profanity: ${found}` };
  return { blocked: false, reason: null };
};

// Summarize an array of reviews using the same Gemini API when available.
// Falls back to a simple JS-based summary when no API key is present.
export const summarizeReviews = async (reviews = []) => {
  if (!reviews || reviews.length === 0) return { summary: "No reviews yet.", sentiment: "neutral" };

  // Simple fallback summary
  const fallbackSummary = () => {
    const avg = (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) || 0;
    const sample = reviews.slice(0, 3).map((r) => `"${(r.text || '').slice(0, 80)}"`).join(' — ');
    return { summary: `Avg rating ${avg.toFixed(1)} / 5. Sample reviews: ${sample}`, sentiment: avg >= 4 ? 'positive' : avg >= 2.5 ? 'neutral' : 'negative' };
  };

  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
    return fallbackSummary();
  }

  const joined = reviews.map((r, i) => `Review ${i + 1} (rating ${r.rating || 0}): ${r.text || ''}`).join('\n');
  const prompt = `Summarize the following product reviews in 2-3 sentences and give an overall sentiment (positive/neutral/negative):\n\n${joined}`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 256 }
  };

  try {
    const resp = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!resp.ok) {
      return fallbackSummary();
    }
    const result = await resp.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Try to parse a sentiment token if present
    const sentimentMatch = text.match(/(positive|neutral|negative)/i);
    const sentiment = sentimentMatch ? sentimentMatch[1].toLowerCase() : 'neutral';
    return { summary: text.trim(), sentiment };
  } catch (err) {
    console.error('summarizeReviews error', err);
    return fallbackSummary();
  }
};
