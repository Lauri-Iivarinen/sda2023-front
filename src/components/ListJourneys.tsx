import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Trip } from "../types/types";


export default function ListJourneys() {

    const [journeys, setJourneys] = useState<Trip[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [partJourney, setPartJourney] = useState<Trip[]>([])

    const fetchJourneys = async () => {
        try {
            const response = await fetch('http://localhost:8080/bikestations/trips')
            const result: Trip[] = await response.json()
            setJourneys(result)
            setPartJourney(result.slice((page)*rowsPerPage,(page + rowsPerPage)))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchJourneys()
    }, [])

    //Page and row changes
    //https://mui.com/material-ui/react-pagination/
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
        setPartJourney(journeys.slice((newPage)*rowsPerPage,(newPage)*rowsPerPage+rowsPerPage))
      };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        console.log(event.target.value)
        setRowsPerPage(parseInt(event.target.value, 10));
        
      };

    useEffect(() => {
        setPage(0);
        setPartJourney(journeys.slice((page)*rowsPerPage, page*rowsPerPage+rowsPerPage))
    }, [rowsPerPage])
    
    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>(id) Departure station</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Distance (km)</TableCell>
                            <TableCell>Duration (min)</TableCell>
                            <TableCell>(id) Arrival station</TableCell>
                            <TableCell>Arrival Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {partJourney.map((journey, index) => (<TableRow key={index}>
                                <TableCell>({journey.Departure_station_id}) {journey.Departure_station_name}</TableCell>
                                <TableCell>{journey.Departure}</TableCell>
                                <TableCell>{(journey.Covered_distance / 1000).toFixed(1)}</TableCell>
                                <TableCell>{(journey.Duration / 60).toFixed(0)}</TableCell>
                                <TableCell>({journey.Return_station_id}) {journey.Return_station_name}</TableCell>
                                <TableCell>{journey.Return}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={journeys.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

/**
 * 
            
 */