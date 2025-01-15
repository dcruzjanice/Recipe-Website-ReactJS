import React, { useState } from 'react';

const UnitConverter = ({ value, unit }) => {
  const [isMetric, setIsMetric] = useState(() => {
    const saved = localStorage.getItem('preferredUnit');
    return saved ? JSON.parse(saved) : true;
  });

  const convertUnit = (value, fromUnit) => {
    const conversions = {
      g: { to: 'oz', factor: 0.035274 },
      oz: { to: 'g', factor: 28.3495 },
      ml: { to: 'fl oz', factor: 0.033814 },
      'fl oz': { to: 'ml', factor: 29.5735 },
      kg: { to: 'lb', factor: 2.20462 },
      lb: { to: 'kg', factor: 0.453592 },
      c: { to: 'f', factor: (x) => (x * 9/5) + 32 },
      f: { to: 'c', factor: (x) => (x - 32) * 5/9 }
    };

    const conversion = conversions[fromUnit.toLowerCase()];
    if (!conversion) return { value, unit: fromUnit };

    const converted = typeof conversion.factor === 'function' 
      ? conversion.factor(value)
      : value * conversion.factor;

    return {
      value: Math.round(converted * 100) / 100,
      unit: conversion.to
    };
  };

  const toggleUnit = () => {
    setIsMetric(prev => {
      const newValue = !prev;
      localStorage.setItem('preferredUnit', JSON.stringify(newValue));
      return newValue;
    });
  };

  const converted = isMetric ? { value, unit } : convertUnit(value, unit);

  return (
    <span className="inline-flex items-center space-x-1">
      <span>{converted.value}</span>
      <span>{converted.unit}</span>
      <button
        onClick={toggleUnit}
        className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
      </button>
    </span>
  );
};

export default UnitConverter;
