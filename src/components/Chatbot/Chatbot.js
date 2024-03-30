import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.scss';

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const genAI = new GoogleGenerativeAI('AIzaSyALnvr7xp3rNEf21P2QuxNnjvQm_jBjwD0');

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `I have ${ingredients} and I prefer ${preferences}. Can you suggest a recipe for me?`;
    setLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setRecipeData(text);
      // Add the user query and response to chat history
      setChatHistory(prevHistory => [...prevHistory, { query: prompt, response: text }]);
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

  return (
    <div className="chatbot-container">
      <h1>Recipe Chatbot</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
          <label htmlFor="ingredients" className="form-label" style={{ fontSize: '24px' }}>Ingredients I have: </label>
            <input type="text" className="form-control" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          </div>
          <div className="col-lg-6">
            <label htmlFor="preferences" className="form-label" style={{ fontSize: '24px' }}>Preferences: </label>
            <input type="text" className="form-control" id="preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-primary" style={{ fontSize: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>Submit</button>
        </div>
      </form>
      <div className="mt-3" ref={recipeRef}>
        {loading ? <p>Loading...</p> : (
          <div>
            {recipeData.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
      
      {/* Chat History */}
      <br/>
      <div className="chat-history">
        <h2>Chat History</h2>
        <div className="chat-messages">
          {chatHistory.map((item, index) => (
            <div className="chat-message" key={index}>
              <p><strong>User:</strong> {item.query}</p>
              <p><strong>Chatbot:</strong> {item.response}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
