import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

const MealPlanner = () => {
  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('weeklyPlan');
    return saved ? JSON.parse(saved) : Array(7).fill({ breakfast: '', lunch: '', dinner: '' });
  });

  useEffect(() => {
    localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const startDate = startOfWeek(new Date());

  const updateMeal = (dayIndex, mealType, mealId) => {
    const newPlan = [...weeklyPlan];
    newPlan[dayIndex] = { ...newPlan[dayIndex], [mealType]: mealId };
    setWeeklyPlan(newPlan);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Weekly Meal Planner</h2>
      <div className="grid gap-4">
        {weeklyPlan.map((day, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
            <h3 className="font-semibold mb-2">
              {format(addDays(startDate, index), 'EEEE')}
            </h3>
            <div className="space-y-2">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="flex items-center justify-between">
                  <span className="capitalize">{mealType}:</span>
                  <input
                    type="text"
                    value={day[mealType]}
                    onChange={(e) => updateMeal(index, mealType, e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="Add meal"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
