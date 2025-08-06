   import React, { useEffect, useState } from 'react';
   import axios from 'axios';
   import B4N from './components/B4N';

   const App = () => {
       data = [{ words: ['A','Beautiful','Life','Jacket'], solution_index: 2 }];
       const [data, setData] = useState([]);
       const [inputValue, setInputValue] = useState('');
       const [timer, setTimer] = useState(300); // 5 minutes timer
       const [isActive, setIsActive] = useState(false);

    //    useEffect(() => {
    //        // Fetch data from an API
    //        const fetchData = async () => {
    //            try {
    //                const response = 
                   
    //                //await axios.get('https://api.example.com/data'); // Replace with your API, probably just shuffle a dataset
    //                setData(response[0]);
    //            } catch (error) {
    //                console.error('Error fetching data:', error);
    //            }
    //        };

    //        fetchData();
    //    }, []);

    //    useEffect(() => {
    //        let interval = null;
    //        if (isActive && timer > 0) {
    //            interval = setInterval(() => {
    //                setTimer((prevTimer) => prevTimer - 1);
    //            }, 1000);
    //        } else if (timer === 0) {
    //            clearInterval(interval);
    //            alert('Time is up!');
    //        }
    //        return () => clearInterval(interval);
    //    }, [isActive, timer]);

       const handleInputChange = (e) => {
           setInputValue(e.target.value);
       };

       const handleKeyPress = (e) => {
           if (e.key === 'Enter') {
               // Handle the return key press
               console.log('Input submitted:', inputValue);
               setInputValue('');
           }
       };

       return (
           <div className="App">
               <h1>Before 'n After</h1>
               <input
                   type="text"
                   value={inputValue}
                   onChange={handleInputChange}
                   onKeyPress={handleKeyPress}
                   placeholder="Type and press Enter"
               />
               {/* <button onClick={() => setIsActive(true)}>Start Timer</button> 
               <div>Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</div>
               */}
               <B4N data={data} />
           </div>
       );
   };

   export default App;