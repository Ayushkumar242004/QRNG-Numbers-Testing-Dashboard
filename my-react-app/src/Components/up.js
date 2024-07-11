import React, { useState, useRef, useEffect } from "react";
import "./GridContainerUp.css"; // Import CSS file for styling
import RandomTest from "./RandomTest";
import RandomVariantTest from "./RandomVariantTest";
import Down from "./down";

const CHUNK_SIZE = 2; // Define the chunk size
const myArray = [];
let s=0;
let c=0;
const GridContainer1 = ({ getData, onBinaryDataChange }) => {
  const [initialInputData, setInitialInputData] = useState(["", "", ""]); // Initialize with 3 empty strings
  const [binaryDataChunks, setBinaryDataChunks] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const fileInputRefs = useRef([null, null, null]);

  const [chunkResults, setChunkResults] = useState([]); // Initialize chunkResults as an array
  const testMainResults = useRef([]); // Initialize testResults as a ref to keep it stable
  //to fetch the binary data
  const fetchBinaryData = async (index) => {
    try {
        const response = await fetch('http://localhost:5454/binaryData');
        const data = await response.json();
        const binaryString = atob(data.binary_data);

        setInitialInputData((prevData) => {
            const newData = [...prevData];
            newData[index] = binaryString;
            return newData;
        });

        handleInputChange(index, binaryString);
    } catch (error) {
        console.error("Error fetching binary data:", error);
    }
  };
  // Split the data into chunks
  const splitIntoChunks = (data, chunkSize) => {
    let chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    s=chunks.length;
    return chunks;
  };

  // Update binaryDataChunks whenever initialInputData changes
  useEffect(() => {
    if (initialInputData[0] && initialInputData[0].length > CHUNK_SIZE) {
      // Assuming the binary data is entered in the first input
      const chunks = splitIntoChunks(initialInputData[0], CHUNK_SIZE);
      setBinaryDataChunks(chunks);
      // console.log('Updated binaryDataChunks:', chunks);
    }
  }, [initialInputData]);

  const testResults = useRef([]); // Initialize testResults as a ref to keep it stable

  // Set up the interval to update initialInputData with binaryDataChunks
  useEffect(() => {
    if (binaryDataChunks.length > 0) {
      // console.log('Starting interval for binaryDataChunks:', binaryDataChunks);
      let chunkIndex = 0;
      
      const interval = setInterval(() => {
       
        if (chunkIndex === s-1) {
          
          let flag = false;
          // console.log("final chunkIndex",chunkIndex);
          // console.log("final total length of all the chunks : ",s);
          for (let i = 0; i < myArray.length; i++) {
            if (myArray[i] === true) {
              flag = true;
              window.alert("Non Random number");
            }
          }
          if (!flag) {
            window.alert("Random number");
          }
        }
        if (chunkIndex < binaryDataChunks.length) {
          c=chunkIndex;
          // Ensure chunkIndex is within bounds
          // console.log("chunkIndex",chunkIndex);
          // console.log(" total length of all the chunks : ",s);
          console.log(
            
             "Updating chunkIndex to:",
            chunkIndex,
             "with data:",
            binaryDataChunks[chunkIndex]
          );

          // Update initialInputData with the current chunk
          setInitialInputData((prevData) => {
            const newData = [...prevData];
            newData[0] = binaryDataChunks[chunkIndex];
            return newData;
          });

          // Update the current chunk index
          setCurrentChunkIndex(chunkIndex);

          // Trigger the onBinaryDataChange callback with the new binary data chunk
          if (onBinaryDataChange) {
            onBinaryDataChange(binaryDataChunks[chunkIndex]);
          }
          if (getData) {
            getData(binaryDataChunks[chunkIndex]);
          }

          chunkIndex += 1;

          // Stop the interval once all chunks are processed
          if (chunkIndex >= binaryDataChunks.length) {
            clearInterval(interval);
          }
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [binaryDataChunks, onBinaryDataChange, getData]);

  const handleInputChange = (index, value) => {
    const newData = [...initialInputData]; // Create a copy of the current state
    newData[index] = value; // Update the value at the specified index
    setInitialInputData(newData); // Update the state

    // console.log('Initial input data updated:', newData);
  };

  const handleButtonClick = (index) => {
    // Trigger click on the respective file input
    if (index === 1 || index === 2) {
      fileInputRefs.current[index].click();
    }
  };

  const handleFileInputChange = (event, index) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    const chunkSize = 64 * 1024; // 64KB
    let offset = 0;
    let binaryData = "";

    reader.onload = (e) => {
      binaryData += e.target.result;
      offset += chunkSize;

      if (offset < selectedFile.size) {
        readNextChunk();
      } else {
        const binaryString = String.fromCharCode.apply(
          null,
          new Uint8Array(binaryData)
        );
        setInitialInputData((prevData) => {
          const newData = [...prevData];
          newData[index] = binaryString;
          return newData;
        });
        handleInputChange(0, binaryString);
      }
    };

    const readNextChunk = () => {
      const slice = selectedFile.slice(offset, offset + chunkSize);
      reader.readAsArrayBuffer(slice);
    };

    readNextChunk();
  };

  useEffect(() => {
   

    if (chunkResults.length > 0) {
      // Check if any number in chunkResults is non-random
      const isNonRandom = chunkResults.some(
        (result) => result === "non-random number"
      );
      if (chunkResults.length > 2) myArray.push(isNonRandom);

    }
  }, [chunkResults]);




  return (
    <div className="grid-container">
      {/* Input Data in the first row */}
      <div className="header">Input Data</div>

      {/* Content for the remaining grid cells */}
      {initialInputData.map((value, index) => (
        <div key={index + 1} className="input-row">
          <div className="label">
            {index === 0
              ? "Binary data "
              : index === 1
              ? "Binary data file"
              : "Binary string file"}
          </div>
          <input
            type="text"
            value={
              index === 0
                ? value
                : String.fromCharCode.apply(null, new Uint8Array(value))
            }
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="text-input"
            placeholder={index === 0 ? "Enter data here" : ""}
            disabled={index !== 0}
          />
          {/* Add a div to display the current chunk index */}
          {index === 0 && (
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "black",
                color: "#fff",
                borderRadius: "50%" /* Make it a circle */,
                textAlign: "center",
                lineHeight: "30px",
                animation: "pulse 1s infinite alternate" /* Animation */,
                margin: "10px" /* Margin */,
              }}
            >
              {c+1}
            </div>
          )}

          {index === 1 && (
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(e, index)}
            />
          )}

          {index === 1 && (
            <button
              className="select-btn"
              onClick={() => handleButtonClick(index)}
            >
              Select binary data file
            </button>
          )}
          {index === 2 && (
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(e, index)}
            />
          )}
          {index === 2 && (
            <button
              className="select-btn"
              onClick={() => handleButtonClick(index)}
            >
              Select string data file
            </button>
          )}
        </div>
      ))}

      {/* <Down binaryData={initialInputData[0]} />
      <RandomTest binaryData={initialInputData[0]} />
      <RandomVariantTest binaryData={initialInputData[0]} /> */}

      <Down
        binaryData={initialInputData[0]}
        chunkResults={chunkResults}
        setChunkResults={setChunkResults}
        testMainResults={testMainResults}
      />
      <RandomTest
        binaryData={initialInputData[0]}
        chunkResults={chunkResults}
      />
      <RandomVariantTest
        binaryData={initialInputData[0]}
        chunkResults={chunkResults}
      />
    </div>
  );
};

export default GridContainer1;
