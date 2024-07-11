import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Grid = ({binaryData}) => {
  // State to store the digit value
  // const [digit, setDigit] = useState(1);
  // const [isChecked, setIsChecked] = useState(false);
  // const [runRandomExcursionsVariantTestResponse, setrunRandomExcursionsVariantTestResponse] = useState('');


  // useEffect(() => {
  //   const fetchrunRandomExcursionsVariantTestData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/random_excursions_variant_test/?binary_data=${binaryData}`);
  //       setrunRandomExcursionsVariantTestResponse(response.data);
  //     } catch (error) {
  //       console.error('Error executing Random Excursions test:', error);
  //     }
  //   };
  //   fetchrunRandomExcursionsVariantTestData();
  // }, [binaryData] );

  // // Function to handle incrementing or decrementing the digit value
  // const handleButtonClick = (operation) => {
  //   if (operation === 'increment') {
  //     setDigit(digit + 1);
  //   } else if (operation === 'decrement' && digit > 1) {
  //     setDigit(digit - 1);
  //   }
  // };

  // // Function to handle checkbox change
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };


    // State to store the digit value
    const [digit, setDigit] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [runRandomExcursionsVariantTestResponse, setrunRandomExcursionsVariantTestResponse] = useState('');
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const fileDownloadedRef = useRef(false);

  const handleButtonClick = (operation) => {
    if (operation === 'increment') {
      setDigit(digit + 1);
    } else if (operation === 'decrement' && digit > 1) {
      setDigit(digit - 1);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const testConfigs = [
    { name: 'Random Excursions Variant Test', url: '/random_excursions_variant_test', setter: setrunRandomExcursionsVariantTestResponse },
  ];

  const saveResultToFile = (testName, pValue, resultRandomness) => {
    const result = `${testName}: p-value = ${pValue}, result of randomness test: ${resultRandomness}\n`;
    setResults(prevResults => [...prevResults, result]);
  };

  // const runTestsSequentially = async () => {
  //   for (let i = 0; i < testConfigs.length; i++) {
  //     const test = testConfigs[i];
  //     try {
  //       const response = await axios.get(`http://localhost:8000${test.url}/?binary_data=${binaryData}`);
  //       test.setter(response.data);
  //       saveResultToFile(test.name, response.data.p_value, response.data.result);

  //       // Wait for 15 seconds before running the next test
  //       await new Promise(resolve => setTimeout(resolve, 1000));
  //     } catch (error) {
  //       console.error(`Error executing ${test.name}:`, error);
  //     }
  //   }

  //   // Check if the file has already been downloaded
  //   if (!fileDownloadedRef.current) {
  //     const finalResult = results.join('');
  //     const blob = new Blob([finalResult], { type: 'text/plain;charset=utf-8' });
  //     const fileName = 'AllTestResults.txt';
  //     saveAs(blob, fileName);
  //     fileDownloadedRef.current = true; // Mark file as downloaded
  //   }
  // };
  
  const runTestsSequentially = async () => {
    const testResults = []; // Array to store the results of each test
  
    for (let i = 0; i < testConfigs.length; i++) {
      const test = testConfigs[i];
      try {
        const response = await axios.get(`http://localhost:8000${test.url}/?binary_data=${binaryData}`);
        test.setter(response.data);
        saveResultToFile(test.name, response.data.p_value, response.data.result);
        
        // Store the result (random or nonrandom) of each test in the array
        testResults.push(response.data.result);
        
        // Wait for 15 seconds before running the next test
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error executing ${test.name}:`, error);
      }
    }
  
    // const isNonrandom = testResults.includes("nonrandom");
    // if (!fileDownloadedRef.current) {
    //   const finalResult = isNonrandom ? "nonrandom" : "random"; // Check if any test result is nonrandom
    //   const blob = new Blob([finalResult], { type: 'text/plain;charset=utf-8' });
    //   const fileName = 'AllTestResults.txt';
    //   saveAs(blob, fileName);
    //   fileDownloadedRef.current = true; // Mark file as downloaded
    // }
  
    // // Render a pop-up window if any element in the array is "nonrandom"
    // if (isNonrandom) {
    //   window.alert("The final result is nonrandom!");
    // }
  };
  

  
  /////////////
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      runTestsSequentially();
    }, 100);

    setTimer(newTimer);

    return () => clearTimeout(newTimer);
  }, [binaryData]);


  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr', // One column in the first row
      gridTemplateRows: '1fr 1fr', // Two rows, first row with one row, second and third rows with four columns each
      // black border
    }}>
      {/* First row */}
      <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> */}
        <div style={{ marginLeft: '5px', textAlign: 'center' }}>15. Random Excursion Variant Test</div>
      </div>
      {/* Second row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr', // Four columns in the second row
        border: '1px solid black', // black border
      }}>
        {['State', 'Count', 'p-value', 'Result'].map((columnName, index) => (
          <div key={`column-${index}`} style={{ border: '1px solid black', textAlign: 'center', background: 'blue', color: 'white' }}>
            {columnName}
            </div>
        ))}
      </div>
      {/* Third row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr', // Four columns in the third row
        border: '1px solid black', // black border
      }}>
         {['Digit', 'Chi^2', 'p-value', 'Result'].map((columnName, index) => {
    if (index === 0) {
      return (
        <div key={index} style={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => handleButtonClick('decrement')}>-</button>
          <span style={{ border: '1px solid black', paddingLeft: '5px', paddingRight: '5px' }}>{digit}</span>
          <button onClick={() => handleButtonClick('increment')}>+</button>
        </div>
      );
    } else if (index === 1) {
      return (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center',color:'red', }}>
           {runRandomExcursionsVariantTestResponse ? runRandomExcursionsVariantTestResponse['chi^2'] : ''}
        </div>
      );
    } else if (index === 2) {
      return (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center',color:'red', }}>
          {runRandomExcursionsVariantTestResponse ? runRandomExcursionsVariantTestResponse.p_value : ''}
        </div>
      );
    } else if (index === 3) {
      return (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center', color:'red',}}>
          {runRandomExcursionsVariantTestResponse ? runRandomExcursionsVariantTestResponse.result : ''}
        </div>
      );
    }
  })}
        
        <div style={{ border: '1px solid black' }}></div>
        <div style={{ border: '1px solid black' }}></div>
        <div style={{ border: '1px solid black' }}></div>
        <div style={{ border: '1px solid black' }}></div>
      </div>
    </div>
  );
}

export default Grid;
