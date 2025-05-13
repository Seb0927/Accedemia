import { createContext, useState, useEffect } from 'react';

// Create the context
export const LessonContext = createContext();

// List of WCAG Level A success criteria
const WCAG_LEVEL_A_CRITERIA = [
  // Principle 1: Perceivable
  "wcag-1-1-1", // Non-text Content
  "wcag-1-2-1", // Audio-only and Video-only (Prerecorded)
  "wcag-1-2-2", // Captions (Prerecorded)
  "wcag-1-2-3", // Audio Description or Media Alternative
  "wcag-1-3-1", // Info and Relationships
  "wcag-1-3-2", // Meaningful Sequence
  "wcag-1-3-3", // Sensory Characteristics
  "wcag-1-4-1", // Use of Color
  "wcag-1-4-2", // Audio Control
  
  // Principle 2: Operable
  "wcag-2-1-1", // Keyboard
  "wcag-2-1-2", // No Keyboard Trap
  "wcag-2-1-4", // Character Key Shortcuts
  "wcag-2-2-1", // Timing Adjustable
  "wcag-2-2-2", // Pause, Stop, Hide
  "wcag-2-3-1", // Three Flashes or Below Threshold
  "wcag-2-4-1", // Bypass Blocks
  "wcag-2-4-2", // Page Titled
  "wcag-2-4-3", // Focus Order
  "wcag-2-4-4", // Link Purpose (In Context)
  "wcag-2-5-1", // Pointer Gestures
  "wcag-2-5-2", // Pointer Cancellation
  "wcag-2-5-3", // Label in Name
  "wcag-2-5-4", // Motion Actuation
  
  // Principle 3: Understandable
  "wcag-3-1-1", // Language of Page
  "wcag-3-2-1", // On Focus
  "wcag-3-2-2", // On Input
  "wcag-3-3-1", // Error Identification
  "wcag-3-3-2", // Labels or Instructions
  
  // Principle 4: Robust
  "wcag-4-1-1", // Parsing
  "wcag-4-1-2", // Name, Role, Value
];

export const LessonProvider = ({ children }) => {
  // Initialize state
  const [lessonState, setLessonState] = useState(() => {
    // Try to load from localStorage first
    const savedLessons = localStorage.getItem('lessonProgress');
    
    if (savedLessons) {
      return JSON.parse(savedLessons);
    }
    
    // Create initial state with all lessons set to not completed
    const initialState = {};
    WCAG_LEVEL_A_CRITERIA.forEach(criterion => {
      initialState[criterion] = { completed: false };
    });
    
    return initialState;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(lessonState));
  }, [lessonState]);

  // Mark a lesson as completed
  const completeLesson = (criterionId) => {
    setLessonState(prevState => ({
      ...prevState,
      [criterionId]: { ...prevState[criterionId], completed: true }
    }));
  };

  // Mark a lesson as not completed
  const uncompleteLesson = (criterionId) => {
    setLessonState(prevState => ({
      ...prevState,
      [criterionId]: { ...prevState[criterionId], completed: false }
    }));
  };

  // Reset all lessons to not completed
  const resetAllLessons = () => {
    const resetState = {};
    WCAG_LEVEL_A_CRITERIA.forEach(criterion => {
      resetState[criterion] = { completed: false };
    });
    
    setLessonState(resetState);
    localStorage.setItem('lessonProgress', JSON.stringify(resetState));
  };

  // Get progress statistics
  const getLessonStats = () => {
    const total = WCAG_LEVEL_A_CRITERIA.length;
    const completed = Object.values(lessonState).filter(lesson => lesson.completed).length;
    const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      percentComplete
    };
  };

  return (
    <LessonContext.Provider
      value={{
        lessonState,
        completeLesson,
        uncompleteLesson,
        resetAllLessons,
        getLessonStats,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};