import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Paper, Box, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Bikestation } from "../types/types";
import { filterByKeywordAndColumn } from "../util/util";

export default function ListStations() {
    const [stations, setStations] = useState<Bikestation[]>([])
    const [filteredStations, setFilteredStations] = useState<Bikestation[]>([])
    const [partStations, setPartStations] = useState<Bikestation[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterKeyword, setFilterKeyword] = useState<string>('')
    const [selectValue, setSelectValue] = useState<number>(0)

    const fetchStations = async () => {
        try {
            const response = await fetch('http://localhost:8080/bikestations')
            const result: Bikestation[] = await response.json()
            setStations(result)
            setFilteredStations(result)
            setPartStations(result.slice((page) * rowsPerPage, (page + rowsPerPage)))
            
            const res = result.slice(0, 5)
            for (let a of res) {
                console.log(a)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [])

    //Page and row changes
    //https://mui.com/material-ui/react-pagination/
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
        setPartStations(filteredStations.slice((newPage)*rowsPerPage,(newPage)*rowsPerPage+rowsPerPage))
      };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        
      };

    useEffect(() => {
        setPage(0);
        setPartStations(filteredStations.slice((page)*rowsPerPage, page*rowsPerPage+rowsPerPage))
    }, [rowsPerPage])

    useEffect(() => {
        setPage(0)
        const result = filterByKeywordAndColumn(stations, filterKeyword, selectValue)
        setFilteredStations(result)
        setPartStations(result.slice(0, rowsPerPage))
    },[filterKeyword])

    const changeFilterKeyword = (e: any) => {
        setFilterKeyword(e.target.value)
    }
    const updateValue = (e: any) => {
        setFilterKeyword('')
        setSelectValue(e.target.value)
    }
    
    return (
        <Box sx={{padding: 2}}>
            <Typography variant='h2'>Stations</Typography>
            <TableContainer>
                <Paper sx={{ margin: 1, padding: 1, marginTop: 5}}>
                    <TextField  label="Filter" onChange={(e) => changeFilterKeyword(e)} value={filterKeyword}></TextField>
                    <Typography sx={{margin: 1}}>By</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="filterSelect">Column</InputLabel>
                        <Select
                            label="filterSelect"
                            value={selectValue}
                            onChange={(e) => updateValue(e)}
                        >
                            <MenuItem value={0}>Name</MenuItem>
                            <MenuItem value={1}>Id</MenuItem>
                            <MenuItem value={2}>Address</MenuItem>
                            <MenuItem value={3}>City</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Operator</TableCell>
                            <TableCell>Capacity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partStations.map((station, index) => {
                            let city = ''
                            if (station.Kaupunki) city = station.Kaupunki.length > 1? station.Kaupunki : 'Helsinki'
                            return (<TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgb(220,220,220)' }}>
                                <TableCell>{station.ID}</TableCell>
                                <TableCell>{station.Name}</TableCell>
                                <TableCell>{station.Osoite}</TableCell>
                                <TableCell>{city}</TableCell>
                                <TableCell>{station.Operaattor}</TableCell>
                                <TableCell>{station.Kapasiteet}</TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={filteredStations.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}