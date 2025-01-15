import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PaperAirplaneIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import './Chatbot.scss';

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // To track active accordion item
  const [dishName, setDishName] = useState(''); // To store dish name

  const genAI = new GoogleGenerativeAI('AIzaSyALnvr7xp3rNEf21P2QuxNnjvQm_jBjwD0');

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `I have ${ingredients} and I prefer ${preferences}. Can you suggest a recipe for me?`;
    setLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setRecipeData(text);

      // Extract the dish name from the recipe text before 'Ingredients:'
      const dish = text.split('Ingredients:')[0].trim().replace(/\*/g, '').trim();
      setDishName(dish); // Store dish name

      setChatHistory((prev) => [...prev, { query: prompt, response: text, dish: dish }]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRecipeData('Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const recipeRef = useRef(null);

  useEffect(() => {
    if (!loading && recipeData && recipeRef.current) {
      recipeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, recipeData]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle accordion open/close
  };

  return (
    <div className="chatbot-container max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center py-4 font-bold text-5xl">Recipe Chatbot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="ingredients" className="block font-semibold text-2xl mb-1">Ingredients I have</label>
            <input
              type="text"
              id="ingredients"
              className="w-full border-2 border-solid border-gray-100 rounded-md px-4 py-2 "
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., tomatoes, pasta, cheese"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="preferences" className="block font-semibold text-2xl mb-1 ">Preferences</label>
            <input
              type="text"
              id="preferences"
              className="w-full border-2 border-solid border-gray-100 rounded-md px-4 py-2 "
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., vegetarian, spicy"
            />
          </div>
        </div>
        <div className="text-center flex justify-center">
          <button
            type="submit"
            className="bg-[#5E72E4] hover:bg-sky-600 text-white font-semibold px-3 py-2 rounded-lg flex"
          >
            Submit
            <PaperAirplaneIcon className="h-10 w-10 mx-2 hover:translate-x-2" />
          </button>
        </div>
      </form>

      <div className="mt-6" ref={recipeRef}>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="bg-blue-50 p-4 rounded-lg">
            {recipeData.split('\n').map((line, index) => (
              <p key={index} className="text-gray-700">{line}</p>
            ))}
          </div>
        )}
      </div>

      <div className="chat-history mt-8">
        <h2 className="font-bold text-5xl mb-4 text-center">Chat History</h2>
        <div className="space-y-4">
          {chatHistory.map((item, index) => (
            <div key={index} className='items-center'>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-2 px-4 bg-gray-100 border rounded-md focus:outline-none flex justify-between items-center"
              >
                <div className='flex items-center'>
                  <p className="font-semibold text-blue-600">{item.dish}</p>
                  <p className="font-semibold text-blue-600 ml-5">
                    {activeIndex === index ? <EyeSlashIcon className='h-8 w-8 items-center' /> : <EyeIcon className='h-8 w-8 items-center' />}
                  </p>
                </div>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-blue-50 rounded-lg mt-2">
                  <p className="font-semibold text-[#5e72e4]">User: <span className="font-normal text-gray-800">{item.query}</span></p>
                  <p className="font-semibold text-[#2dce89]">Chatbot: <span className="font-normal text-gray-800">{item.response}</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
