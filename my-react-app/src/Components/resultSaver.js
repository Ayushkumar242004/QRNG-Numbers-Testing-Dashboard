// TestContext.js
import React, { createContext, useContext, useState } from 'react';
import { saveAs } from 'file-saver';


export const TestProvider = ({ children }) => {
  const [resultsFile, setResultsFile] = useState(new Blob([], { type: 'text/plain;charset=utf-8' }));
  const [completedTests, setCompletedTests] = useState(0);
  const totalTests = 15; // Update this number based on the total tests you have across all files

  const saveResultToFile = (testName, pValue, resultRandomness) => {
    const result = `${testName}: p-value = ${pValue}, result of randomness test: ${resultRandomness}\n`;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    setResultsFile(prevFile => new Blob([prevFile, blob], { type: 'text/plain;charset=utf-8' }));

    setCompletedTests(prevCount => prevCount + 1);
  };

  const downloadResultsFile = () => {
    const fileName = 'AllTestResults.txt';
    saveAs(resultsFile, fileName);
  };

  return (
     {children}
    
  );
};
