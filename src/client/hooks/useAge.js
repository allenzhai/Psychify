import { useState, useEffect } from 'react';

export default function useAge(date) {
  const [age, setAge] = useState();

  useEffect(() => {
    // Takes in a UTC date string and calculates how long ago it was, returning a formatted string
    // Mainly used in ForumPost and ForumComment to show timestamp, but can be used anywhere
    const now = new Date(new Date(Date.now()).toUTCString());
    let dateDelta = now - new Date(date);
    let ageString = '';
    let years = 0;
    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    while (dateDelta > 31536000000) {
      years += 1;
      dateDelta -= 31536000000;
    }
    if (years > 0) {
      ageString += `${years}yrs `;
    }
    while (dateDelta > 2592000000) {
      months += 1;
      dateDelta -= 2592000000;
    }
    if (months > 0) {
      ageString += `${months}mo `;
    }
    while (dateDelta > 86400000) {
      days += 1;
      dateDelta -= 86400000;
    }
    if (days > 0) {
      ageString += `${days}d `;
    }
    while (dateDelta > 3600000) {
      hours += 1;
      dateDelta -= 3600000;
    }
    if (hours > 0) {
      ageString += `${hours}h `;
    }
    while (dateDelta > 60000) {
      minutes += 1;
      dateDelta -= 60000;
    }
    if (minutes > 0) {
      ageString += `${minutes}m `;
    }
    while (dateDelta > 1000) {
      seconds += 1;
      dateDelta -= 1000;
    }
    if (minutes === 0 && hours === 0 && days === 0 && months === 0 && years === 0 && seconds >= 0) {
      ageString += 'just now';
    }
    if (dateDelta < 0) {
      ageString = 'from the future';
    }
    setAge(ageString);
  }, [date]);

  return [age];
}
