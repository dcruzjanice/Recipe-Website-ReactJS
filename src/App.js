import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home, MealDetails, Error, Category } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chatbot from "./components/Chatbot/Chatbot"; // Import the Chatbot component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="/chatbot" element={<Chatbot />} /> {/* Add this route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
