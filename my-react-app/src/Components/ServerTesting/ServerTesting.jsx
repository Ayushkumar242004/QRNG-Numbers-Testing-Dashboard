import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Heading from '../Heading';
import './ServerTesting.css';


// https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new

function ServerTesting() {
  const [serverLink, setServerLink] = useState('');
  const [connected, setConnected] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  let intervalId=null;

  const [frequencyTestResponse, setFrequencyTestResponse] = useState('');
  const [frequencyBlockTestResponse, setFrequencyBlockTestResponse] = useState('');
  const [runTestResponse, setrunTestResponse] = useState('');
  const [ApproximateEntropyTestResponse, setApproximateEntropyTestResponse] = useState('');
  const [runLinearComplexityTestResponse, setrunLinearComplexityTestResponse] = useState('');
  const [runNonOverlappingTestResponse, setrunNonOverlappingTestResponse] = useState('');
  const [runOverlappingTestResponse, setrunOverlappingTestResponse] = useState('');
  const [runUniversalTestResponse, setrunUniversalTestResponse] = useState('');
  const [runSerialTestResponse, setrunSerialTestResponse] = useState('');
  const [runCumulativeSumsTestResponse, setrunCumulativeSumsTestResponse] = useState('');
  const [runlongestOneBlockTestResponse, setrunlongestOneBlockTestResponse] = useState('');
  const [runBinaryMatrixRankTestResponse, setrunBinaryMatrixRankTestResponse] = useState('');
  const [runSpectralTestResponse, setrunSpectralTestResponse] = useState('');
  const [runRandomExcursionsTestResponse, setrunRandomExcursionsTestResponse] = useState('');
  const [runRandomExcursionsVariantTestResponse, setrunRandomExcursionsVariantTestResponse] = useState('');
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const fileDownloadedRef = useRef(false);
  const [digit, setDigit] = useState(1);


  const testConfigs = [
    { name: 'Frequency Test', url: '/run_frequency_test', setter: setFrequencyTestResponse },
    { name: 'Frequency Block Test', url: '/run_frequency_block_test', setter: setFrequencyBlockTestResponse },
    { name: 'Runs Test', url: '/run_runs_test', setter: setrunTestResponse },
    { name: 'Longest One Block Test', url: '/run_longest_one_block_test', setter: setrunlongestOneBlockTestResponse },
    { name: 'Approximate Entropy Test', url: '/run_approximate_entropy_test', setter: setApproximateEntropyTestResponse },
    { name: 'Linear Complexity Test', url: '/run_linear_complexity_test', setter: setrunLinearComplexityTestResponse },
    { name: 'Non-Overlapping Test', url: '/run_non_overlapping_test', setter: setrunNonOverlappingTestResponse },
    { name: 'Overlapping Test', url: '/run_overlapping_test', setter: setrunOverlappingTestResponse },
    { name: 'Universal Test', url: '/run_statistical_test', setter: setrunUniversalTestResponse },
    { name: 'Serial Test', url: '/run_serial_test', setter: setrunSerialTestResponse },
    { name: 'Cumulative Sums Test', url: '/run_cumulative_sums_test', setter: setrunCumulativeSumsTestResponse },
    { name: 'Binary Matrix Rank Test', url: '/run_binary_matrix_rank_text', setter: setrunBinaryMatrixRankTestResponse },
    { name: 'Spectral Test', url: '/run_spectral_test', setter: setrunSpectralTestResponse },
    { name: 'Random Excursions Test', url: '/random_excursions_test', setter: setrunRandomExcursionsTestResponse },
    { name: 'Random Excursions Variant Test', url: '/random_excursions_variant_test', setter: setrunRandomExcursionsVariantTestResponse },
  ];
  
  let testResults=[];


  const handleInputChange = (event) => {
    setServerLink(event.target.value);
  };

  const handleConnect = () => {
    setConnected(true);
    fetchData();
  };

  const handleDisconnect = () => {
    setConnected(false);
    clearInterval(intervalId);
    setRandomNumber(null);
    setServerLink(''); // clear the input box
  };

  

  const fetchData = () => {
    fetch(serverLink)
      .then(response => response.text())
      .then(data => {
      let x = parseInt(data.trim(), 10); // Parse the number from string to integer
      const binaryNumber = x.toString(2); // Convert the number to binary
      setRandomNumber(binaryNumber);

      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    if (connected) {
      intervalId = setInterval(fetchData, 2000); 
      return () => {
        clearInterval(intervalId); // cleanup function
      };
    } 
  }, [connected]);
  


  ///////
  const runTestsSequentially = async () => {
    let isNonRandom = false;
   
   
    for (let i = 0; i < testConfigs.length; i++) {
      const test = testConfigs[i];
      try {
        const response = await axios.get(`http://localhost:8000${test.url}/?binary_data=${randomNumber}`);
        test.setter(response.data);
  
        if (response.data.result === 'nonrandom') {
          isNonRandom = true;
        }
  
        
         testResults.push(response.data.result);
  
        // Collect the results
        setResults(prevResults => [...prevResults, { name: test.name, result: response.data.result }]);
  
        // Wait for 0.1s seconds before running the next test
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error executing ${test.name}:`, error);
      }
    
    }
    
      // Check if any test result is "nonrandom"
      const isNonrandom = testResults.includes("non-random number");
    };
  
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
  
    const newTimer = setTimeout(() => {
      runTestsSequentially();
    }, 1000); // Adjusted timeout to 13000ms
  
    setTimer(newTimer);
  
    return () => clearTimeout(newTimer);
  }, [randomNumber]);
  

///////////////////////
const handleButtonClick = (operation) => {
  if (operation === 'increment') {
    setDigit(digit + 1);
  } else if (operation === 'decrement' && digit > 1) {
    setDigit(digit - 1);
  }
};
  
  return (
    <>  
        <Heading/>
        <Navbar/>
      <div className="gridContainer">
          <div className="server-link-input-container">
            <input
              type="text"
              placeholder="Enter server link"
              id="server-link-input"
              name="serverLink"
              className="server-link-input"
              value={serverLink}
              onChange={handleInputChange}
              style={{ width: 250 }} 
            />
            {connected? (
              <button className="disconnect-button" onClick={handleDisconnect}>
                Disconnect
              </button>
            ) : (
              <button className="connect-button" onClick={handleConnect}>
                Connect
              </button>
            )}
            {randomNumber && (
              <p>Random Number: {randomNumber}</p>
            )}
          </div>
          
          
          <div style={{
      display: 'grid',
      gridTemplateColumns: '20% 20% auto 20% 20%  auto' , // 6 columns of equal width
      gridTemplateRows: 'repeat(10, 1fr)', // 10 rows of equal height (added one extra row)
      width: '100%', // Set width to 100%
      height: '100vh',
      
    }}>
      {/* Row with "Randomness testing" */}
      <div style={{
        gridColumn: '1 / -1', // Span the entire grid width
        gridRow: '1', // First row
        background: 'black',
        color: 'white',
        height: '10vh',
        textAlign: 'center',
        lineHeight: '60px', // Adjust as needed for vertical centering
      }}>Randomness testing</div>
      

      
      {/* Header cells for Test type, p-value, and Result */}
      <div style={{ textAlign: 'center', border: '1px solid black', color:'white',backgroundColor:'blue' }}>Test type</div>
      <div style={{ textAlign: 'center', border: '1px solid black' ,  color:'white',backgroundColor:'blue'}}>p-value</div>
      <div style={{ textAlign: 'center', border: '1px solid black',  color:'white',backgroundColor:'blue' }}>Result</div>
      <div style={{ textAlign: 'center', border: '1px solid black',  color:'white',backgroundColor:'blue' }}>Test type</div>
      <div style={{ textAlign: 'center', border: '1px solid black',  color:'white',backgroundColor:'blue' }}>p-value</div>
      <div style={{ textAlign: 'center', border: '1px solid black',  color:'white',backgroundColor:'blue' }}>Result</div>
      
      
      {/* Content for the remaining grid cells */}
      {Array.from({ length: 48 }).map((_, index) => {
        if (index === 0) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' ,
           
            }}>
              {/* checked={frequencyTestChecked} onChange={handleFrequencyTestCheckboxChange} */}
      {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
      <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center',
        
       }}><span style={{
       }}>1. Frequency Test</span></div>
    </div>
          );
        } 
        else if (index === 6) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
      <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>3. Runs Test</div>
    </div>
          );
        } 
        else if (index === 12) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
      <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>5. Binary Matrix Rank Test</div>
    </div>
          );
        } 
        else if (index === 18) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>7. Non-overlapping Template match</div>
          </div>
          );
        } 
        else if (index === 24) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>9. Maurer's Universal Statistical Test</div>
          </div>
          );
        } 
        else if (index === 30) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>11. Serial Test</div>
          </div>
          );
        } 
        else if (index === 36) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>12. Approximate Entropy Test</div>
          </div>
          );
        } 
        else if (index === 42) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>13. Cumulative Sums Test</div>
          </div>
          );
        } 
       
        else if (index === 3) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2. Frequency Test within a Block</div>
          </div>
          );
        } 
        else if (index === 9) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>4. Test for the longest Run of Ones</div>
          </div>
          );
        } 
        else if (index === 15) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>6. Discrete Fourier Transform Test</div>
          </div>
          );
        } 
        else if (index === 21) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <input type="checkbox"  style={{ marginRight: '10px' }}/> */}
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>8. Overlapping Template Matching Test</div>
          </div>
          );
        } 
        else if (index === 27) { // Check if it's the cell below "Test type"
          return (
            <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input type="checkbox"  style={{ marginRight: '10px' }}/>
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>10. Linear Complexity Test</div>
          </div>
          );
        } 
        
        
        else if(index === 33 || index=== 39){
          return <div key={index} style={{ border: '1px solid black' }}></div>;
        }
        
        else if(index===1) {
          return (
    
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
            <span style={{color:'red',}}>{frequencyTestResponse.p_value}</span>
            </div>
          </div>
          
          );
        }
        else if (index === 2) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
                <span style={{color:'red',marginBottom:'20px'}}>{frequencyTestResponse.result}</span>
              </div>
            </div>
          );
        } 
        else if(index===4) {
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
            <span style={{color:'red'}}>{frequencyBlockTestResponse.p_value}</span>
            </div>
          </div>
          
          );
        }
        else if (index === 5) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center',marginBottom:'13px' }}>
                <span style={{color:'red'}}>{frequencyBlockTestResponse.result}</span>
              </div>
            </div>
          );
        } 
        else if (index === 7) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
                <span style={{color:'red'}}>{runTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 8) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center',marginBottom:'13px' }}>
                <span style={{color:'red'}}>{runTestResponse.result}</span>
              </div>
            </div>
          );
        } 

        else if (index === 10) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
                <span style={{color:'red'}}>{runlongestOneBlockTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 11) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
                <span style={{color:'red'}}>{runlongestOneBlockTestResponse.result}</span>
              </div>
            </div>
          );
        } 

        else if (index === 13) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center',  }}>
                <span style={{color:'red'}}>{runBinaryMatrixRankTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 14) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
                <span style={{color:'red'}}>{runBinaryMatrixRankTestResponse.result}</span>
              </div>
            </div>
          );
        } 

        else if (index === 16) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
                <span style={{color:'red'}}>{runSpectralTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 17) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
                <span style={{color:'red'}}>{runSpectralTestResponse.result}</span>
              </div>
            </div>
          );
        } 

        else if (index === 28) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
                <span style={{color:'red'}}>{runLinearComplexityTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 29) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center',marginBottom:'13px' }}>
                <span style={{color:'red'}}>{runLinearComplexityTestResponse.result}</span>
              </div>
            </div>
          );
        } 


        else if (index === 37) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
                <span style={{color:'red'}}>{ApproximateEntropyTestResponse.p_value}</span>
              </div>
            </div>
          );
        } 
        else if (index === 38) { // Check if it's the cell below "Result"
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
                <span style={{color:'red'}}>{ApproximateEntropyTestResponse.result}</span>
              </div>
            </div>
          );
        } 
       //runNonOverlappingTest

       else if (index === 19) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
              <span style={{color:'red'}}>{runNonOverlappingTestResponse.p_value}</span>
            </div>
          </div>
        );
      } 
      else if (index === 20) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' , marginBottom:'13px'}}>
              <span style={{color:'red'}}>{runNonOverlappingTestResponse.result}</span>
            </div>
          </div>
        );
      } 

       else if (index === 22) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
              <span style={{color:'red'}}>{runOverlappingTestResponse.p_value}</span>
            </div>
          </div>
        );
      } 
      else if (index === 23) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
              <span style={{color:'red'}}>{runOverlappingTestResponse.result}</span>
            </div>
          </div>
        );
      } 
      else if (index === 25) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center',  }}>
              <span style={{color:'red'}}>{runUniversalTestResponse.p_value}</span>
            </div>
          </div>
        );
      } 
      else if (index === 26) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
              <span style={{color:'red'}}>{runUniversalTestResponse.result}</span>
            </div>
          </div>
        );
      } 

      else if (index === 31) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
              <span style={{color:'red'}}>{runSerialTestResponse.p_value}</span>
            </div>
          </div>
        );
      } 
      else if (index === 32) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center',marginBottom:'13px' }}>
              <span style={{color:'red'}}>{runSerialTestResponse.result}</span>
            </div>
          </div>
        );
      } 

      
      else if (index === 43) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
              <span style={{color:'red'}}>{runCumulativeSumsTestResponse.p_value}</span>
            </div>
          </div>
        );
      } 
      else if (index === 44) { // Check if it's the cell below "Result"
        return (
          <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center', marginBottom:'13px' }}>
              <span style={{color:'red'}}>{runCumulativeSumsTestResponse.result}</span>
            </div>
          </div>
        );
      } 

      
        else {
          return (
            <div key={index} style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height:'20px', textAlign: 'center' }}>
            <span style={{color:'red'}}></span>
            </div>
          </div>
          
          );
        }
        
      })}
      
    </div>
      </div>



      {/* ///////////////// */}
      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr', // One column in the first row
      gridTemplateRows: '1fr 1fr', // Two rows, first row with one row, second and third rows with four columns each
      // black border
    }}>
      {/* First row */}
      <div style={{ border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> */}
        <div style={{ marginLeft: '5px', textAlign: 'center' }}>14. Random Excursion Test</div>
      </div>
      {/* Second row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr', // Four columns in the second row
        border: '1px solid black', // black border
      }}>
        {['State', 'Chi^2', 'p-value', 'Result'].map((columnName, index) => (
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
           {runRandomExcursionsTestResponse ? runRandomExcursionsTestResponse['chi^2'] : ''}
        </div>
      );
    } else if (index === 2) {
      return (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center',color:'red', }}>
          {runRandomExcursionsTestResponse ? runRandomExcursionsTestResponse.p_value : ''}
        </div>
      );
    } else if (index === 3) {
      return (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center', color:'red',}}>
          {runRandomExcursionsTestResponse ? runRandomExcursionsTestResponse.result : ''}
        </div>
      );
    }
  })}
        
      </div>
    </div>

    {/* /////////////////// */}
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
    </>
  );
}

export default ServerTesting;