import React, { useState } from 'react';
import './App.css';

// Utility function to update the document title
const updateTitle = (title) => {
    document.title = title;
};

const App = () => {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = ["Alphabets", "Numbers", "Highest lowercase alphabet"];

    const handleSubmit = async () => {
        try {
            // Parse JSON data
            const parsedData = JSON.parse(jsonData);

            // Log parsed data for debugging
            console.log("Parsed Data:", parsedData);

            // Call the REST API directly with the parsed data
            const res = await fetch('https://bajaj-be-1.onrender.com/bfhl', { // Update with your backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the parsed data directly
                body: JSON.stringify(parsedData),
            });

            // Get the response and update state
            const result = await res.json();
            setResponse(result);

            // Clear the error if successful
            setError('');
        } catch (err) {
            // Handle any errors, such as JSON parsing errors
            console.error("Error:", err); // Log error for debugging
            setError('Invalid JSON or API error');
            setResponse(null);
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOptions(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div className="filtered-response">
                {selectedOptions.includes("Alphabets") && (
                    <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
                )}
                {selectedOptions.includes("Numbers") && (
                    <div>Numbers: {JSON.stringify(response.numbers)}</div>
                )}
                {selectedOptions.includes("Highest lowercase alphabet") && (
                    <div>
                        Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}
                    </div>
                )}
            </div>
        );
    };

    // Update the document title to your roll number
    updateTitle("21bps1444");

    return (
        <div>
            <h1>21bps1444</h1>
            <textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder='Enter JSON'
                rows={10}
                cols={50}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <div>
                        {options.map(option => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <div>
                        {renderResponse()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
