import { useState } from "react";
import "./App.css";
import DataTable from "./Table";
import { Button, TextField, Box } from "@mui/material";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function ContactInformation() {
  const rows = [
    { id: 1, dateOfCreation:"1/1/24",lastName: "Snow", firstName: "Jon", countryCode:"91",phoneNumber:"2376459856" },
    { id: 2, dateOfCreation:"2/2/24",lastName: "Lannister", firstName: "Cersei",countryCode:"91",phoneNumber:"2376459856" },
    { id: 3, dateOfCreation:"3/3/23",lastName: "Lannister", firstName: "Jaime", countryCode:"91" ,phoneNumber:"2376459856" },
    { id: 4, dateOfCreation:"4/4/22",lastName: "Stark", firstName: "Arya", countryCode:"91" ,phoneNumber:"2376459856" },
    { id: 5, dateOfCreation:"5/5/24",lastName: "Targaryen", firstName: "Daenerys", countryCode: 22,phoneNumber:"9999959856"  },
    { id: 6, dateOfCreation:"6/6/24",lastName: "Melisandre", firstName: "Harry", countryCode: 150,phoneNumber:"2222229856"  },
    { id: 7, dateOfCreation:"7/7/24",lastName: "Clifford", firstName: "Ferrara", countryCode: 44 ,phoneNumber:"2376459856" },
    { id: 8, dateOfCreation:"8/8/24",lastName: "Frances", firstName: "Rossini", countryCode: 36 ,phoneNumber:"2376459856" },
    { id: 9, dateOfCreation:"9/9/24",lastName: "Roxie", firstName: "Harvey", countryCode: 65 ,phoneNumber:"2376459856" },
    { id: 10, dateOfCreation:"10/10/24",lastName: "Snow", firstName: "Jon", countryCode: 35 ,phoneNumber:"2376459856" },
    { id: 11, dateOfCreation:"11/11/24",lastName: "Lannister", firstName: "Cersei", countryCode: 42 ,phoneNumber:"2376459856" },
    { id: 12, dateOfCreation:"12/12/24",lastName: "Lannister", firstName: "Jaime", countryCode: 45,phoneNumber:"2376459856"  },
    { id: 13, dateOfCreation:"1/13/24",lastName: "Stark", firstName: "Arya", countryCode: 16 ,phoneNumber:"2376459856" },
    { id: 14, dateOfCreation:"1/14/24",lastName: "Targaryen", firstName: "Daenerys", countryCode: 45 ,phoneNumber:"2376459856" },
    { id: 14, dateOfCreation:"1/15/24",lastName: "Melisandre", firstName: "tyh6", countryCode: 150 ,phoneNumber:"231234566" },
    { id: 16, dateOfCreation:"1/16/24",lastName: "Clifford", firstName: "Ferrara", countryCode: 44,phoneNumber:"9999999999"  },
    { id: 17, dateOfCreation:"1/17/24",lastName: "Frances", firstName: "Rossini", countryCode: 36 ,phoneNumber:"3333333333" },
    { id: 18, dateOfCreation:"1/18/24",lastName: "Roxie", firstName: "Harvey", countryCode: 65 ,phoneNumber:"5555555555" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [allFilteredContacts, setAllFilteredContacts] = useState(rows);

  const handleFilterAllContacts = (event) => {
    event?.preventDefault();
    const filteredContacts = rows?.filter(
      (row) =>
        row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) |
        row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) |
        row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) |
        (row.countryCode === Number(searchQuery))
    );
    setAllFilteredContacts(filteredContacts);
  };

 
  const backend_url = `https://mern-backened-userinfo.onrender.com`;

  const fetchData = () => {
    fetch(`${backend_url}/list`)
      .then(response => {
        return response.json()
      })
      .then(data => {

        const userInformation = data.user;
        setAllFilteredContacts(userInformation);
        console.log(userInformation);
        
      })
  }
  useEffect(() => {
    fetchData()
  }, []);

  


  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop:"20px"
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            width: "100%",
            alignItems: "center",
            padding: "0.5rem 1rem",
          }}
        >
          Contact Management
          
      <div
           style={{
              color:"black",
              backgroundColor:"rgb(235, 133, 255)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              fontSize:"1.2rem",
              width:"200px",
              height: "2.5rem",
              maxHeight: "2.5rem",
              borderRadius:"10px"
            }}
                >
                    <NavLink class="" to="/addUser"  style={{textDecoration:"none"}}>Add User</NavLink>
        </div>
          <Box
            sx={{ display: "flex",gap:"1rem", alignItems: "center",marginTop:"20px" }}
          >
            <form onSubmit={(event) => handleFilterAllContacts(event)}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.9rem",
                    background: "whitesmoke",
                    height: "2.5rem",
                    maxHeight: "2.5rem",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                  },
                }}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event?.target?.value)}
                placeholder="Search contacts"
              />
              <Button
                style={{
                  border: "1px solid lightgreen",
                  color: "lightgreen",
                  padding: "0.2rem 1rem",
                  height: "2.5rem",
                  maxHeight: "2.5rem",
                  marginLeft:"0.5rem"
                }}
                type="submit"
              >
                Filter
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      
      <DataTable allFilteredContacts={allFilteredContacts} />
    </>
  );
}

export default ContactInformation;
