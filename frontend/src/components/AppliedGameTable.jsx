import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

const allAppliedGames = [1,2,3,4]; 

function AppliedGameTable() {
  return (
    <div>
        <Table>
            <TableCaption>A list of your applied Games</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>GameName</TableHead>
                    <TableHead>GameCategory</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedGames.length <= 0 ? <span>You haven't applied any game yet.</span> :  allAppliedGames.map((appliedJob,index)=>(
                        <TableRow key={index}>
                            <TableCell>12-03-25</TableCell>
                            <TableCell>Cricket</TableCell>
                            <TableCell>Outdoor Game</TableCell>
                            <TableCell className="text-right"><Badge>selected</Badge></TableCell>
                        </TableRow>
                    ))
                } 
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedGameTable