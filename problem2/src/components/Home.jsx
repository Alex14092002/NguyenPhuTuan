import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
const Home = () => {
  const [price, setPrice] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [value, setValue] = useState(1);
  const [result, setRessult] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://interview.switcheo.com/prices.json`);
      const data = await res.json();
      setPrice(data);
    };
    getData();
  }, []);
  const resultExchange = async () => {
    if(value > 0){
    let fromPrice = 0;
    let toPrice = 0;

    if (start) {
      const selectedFromPrice = price.find((item) => item.currency === start);
      if (selectedFromPrice) {
        fromPrice = selectedFromPrice.price;
      }
    }

    if (end) {
      const selectedToPrice = price.find((item) => item.currency === end);
      if (selectedToPrice) {
        toPrice = selectedToPrice.price;
      }

      setRessult(value * (fromPrice / toPrice));
      console.log(result);
    }
    } else{
      alert('The conversion value must be greater than 0')
    }
    
  };

  return (
    <>
      {price && (
        <div className="p-1 md:p-5">
          <h1 className="text-center text-2xl md:text-3xl font-bold">
            Cryptocurrency Conversion Calculator
          </h1>

          <div className="bg-[#f8fafd]">
            <div className="flex items-center justify-center pt-10">
              <input
                className="border border-solid border-[#c4c4c4] w-[100%] md:w-[53%] h-[48px] pl-2 rounded-md"
                type="number"
                placeholder="Enter the number you want to change..."
                value={value}
                onChange={(event) => {
                  const newValue = parseFloat(event.target.value);
                  setValue(newValue);
                }}
              />
            </div>
            <div className="flex items-center justify-center py-10">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={price} // Sử dụng biến 'price' thay vì 'top100Films'
                getOptionLabel={(option) => option.currency}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="From" />}
                onChange={(envent, newValue) => {
                  if (newValue) {
                    setStart(newValue.currency);
                  } else {
                    setStart("");
                  }
                }}
                defaultValue={price[32]}
              />
              <div className="mx-5">
                <Button variant="contained" onClick={resultExchange}>
                  Exchange
                </Button>
              </div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={price} // Sử dụng biến 'price' thay vì 'top100Films'
                getOptionLabel={(option) => option.currency}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="To" />}
                onChange={(envent, newValue) => {
                  if (newValue) {
                    setEnd(newValue.currency);
                  } else {
                    setEnd("");
                  }
                }}
                defaultValue={price[4]}
              />
            </div>

            {result > 0 && value > 0 ? (
              <div className="text-center pb-4 flex justify-center text-center">
                <h5>
                  {value} {start}
                </h5>
                <h5 className="px-6"> =</h5>
                <h5>
                   {result} {end}
                </h5>
              </div>
            ) : (
              <h5 className="text-center  text-xl">No conversion required</h5>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
