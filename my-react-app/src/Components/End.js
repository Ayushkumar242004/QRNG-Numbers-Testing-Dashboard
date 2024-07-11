import React, { useState , createContext,useEffect } from 'react';
import { runFrequencyTest } from '../api_frequency_test'; // Import the API function
import { runFrequencyBlockTest } from '../api_frequency_test'; // Import the API function
import './GridContainerEnd.css'; // Import CSS file for styling
import {runTest} from '../api_runs_test';
import {runlongestOneBlockTest} from '../api_run_longest_one_block_test';
import {runApproximateEntropyTest} from '../api_approximate_entropy_test';
import {runLinearComplexityTest} from '../api_linear_complexity_test';
import {runNonOverlappingTest} from '../api_template_matching_test';
import {runOverlappingTest} from '../api_template_matching_test';
import {runUniversalTest} from '../api_universal_test';
import {runSerialTest} from '../api_serial_test';
import {runCumulativeSumsTest} from '../api_cumulative_sums_test';
import {runRandomExcursionsTest} from '../api_random_excursions_test';
import {runRandomExcursionsVariantTest} from '../api_random_excursions_test';
import {runBinaryMatrixRankTest} from '../api_binary_matrix_rank_text';
import {runSpectralTest} from '../api_spectral_test';
import Down from './down';
import { TestContext, TestContextProvider } from './TestContext';


//{binaryDataString}-props to Grid Container
const GridContainer = ({binaryDataString}) => {  
 
  // const [checkedTests, setCheckedTests] = useState([]);
//Extra
  // const [checkedTests, setCheckedTests] = useState([]);
  // const [binaryDataString, setBinaryDataString] = useState('');

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8000/ws/random/');

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setBinaryDataString(data.number);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket connection closed');
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   ws.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };

    
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

//Extra

  const handleButtonClick = (buttonName) => {
    // Handle button click actions
    
    if (buttonName === 'Exit Program') {
      // Close the window when "Exit Program" button is clicked
      const confirmed = window.confirm('Are you sure you want to exit the program?');
      if (confirmed) {
        // Optionally, you can then redirect the user or perform other actions
        window.location.href = 'https://www.nist.gov/itl/ssd/software-quality-group/computer-forensics-tool-testing-program-cftt/federated-testing';
       
      }
    }
    else if (buttonName === 'Reset') {
      window.location.reload();
    }
    
    else if (buttonName === 'Execute Test') {
      
      
      runFrequencyTest('1')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Frequency test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing frequency test:', error);
        });

      runFrequencyBlockTest('10100101011111010010')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Frequency block test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing frequency block test:', error);
        });


      runTest('10100101011111010010')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Run test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing frequency block test:', error);
        });

      runlongestOneBlockTest('11011011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('run longest One BlockTest test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing run longest One Block Test:', error);
        });


      runApproximateEntropyTest('10101010101010101')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Approximate Entropy test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Approximate Entropy test:', error);
        });


      runLinearComplexityTest('110101101011010110101101101011011010110110101101101011011010110')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('linear complexity test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing linear complexity test:', error);
        });


      runNonOverlappingTest('110101101011010110101101101011011010110110101101101011011010110')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Non-overlapping test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Non-overlapping test:', error);
        });

      runOverlappingTest('10101000011111111111111111111110100000000101001111111111111111111')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Overlapping test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Overlapping test:', error);
        });


      runUniversalTest('10101000011111111111111111111110100000000101001111111111111111111')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Universal test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Universal test:', error);
        });


      runSerialTest('1010101010011111111101010101011000000')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Serial test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Serial test:', error);
        });

      runCumulativeSumsTest('1010101010011111111101010101011000000')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Cumulative Sums test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Cumulative Sums test:', error);
        });

      runRandomExcursionsTest('1010101010011111111101010101011000000')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Random Excursions test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Random Excursions test:', error);
        });

      runRandomExcursionsVariantTest('1010101010011111111101010101011000000')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Random Excursions Variant test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Random Excursions Variant test:', error);
        });

      runBinaryMatrixRankTest('101010101001111111110101010101100000010000000000000000000000000000000111111111111111111111111111111110101010101010101011101011010110101')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Binary Matrix Rank test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Binary Matrix Rank test:', error);
        });

      runSpectralTest('101010101001111111110101010101100000010000000000000000000000000000000111111111111111111111111111111110101010101010101011101011010110101')
        .then(response => {
          // Handle the response (e.g., update state, display results)
          console.log('Spectral test executed:', response.data);
        })
        .catch(error => {
          // Handle errors (e.g., display error message)
          console.error('Error executing Binary Matrix Rank test:', error);
        });
    } else {
      // Handle other button actions
      console.log(`${buttonName} clicked`);
    }
  };

  // Define button names
  const buttonNames = [
    // 'Select All Test',
    // 'De-Select All Test',
    'Execute Test',
    'Reset',
    'Exit Program'
  ];

  return (
    
    <div>
      {/* Render buttons */}
{/*       
      <div className="button-container">
        {buttonNames.map((name, index) => (
          <button
            key={index}
            className="action-btn"
            onClick={() => handleButtonClick(name)}
          >
            {name}
          </button>
        ))}
      </div> */}
    </div>
   
    
  );
}

export default GridContainer;
