import { useState } from 'react';
import AgeCalc from '../components/AgeCalc';

export const useAgeCalc = () => {
  const [age, setAge] = useState({ years: '-', months: '-', days: '-' });

  const isValidDate = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const calculateAge = (day, month, year) => {
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);

    if (!isValidDate(birthDay, birthMonth, birthYear)) {
      alert('Data inválida');
      return;
    }

    const today = new Date();
    let ageYears = today.getFullYear() - birthYear;
    let ageMonths = today.getMonth() + 1 - birthMonth;
    let ageDays = today.getDate() - birthDay;

    if (ageDays < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
      ageMonths--;
    }

    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return { age, calculateAge };
};

