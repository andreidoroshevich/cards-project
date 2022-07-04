import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './Cards.module.css';
import Rating from '@mui/material/Rating';
import IconButton from "@material-ui/core/IconButton";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {TextField} from "@mui/material";
import {SearchOutlined} from "@material-ui/icons";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function createData(
	name: string,
	calories: string,
	fat: string,
	carbs: number,
) {
	return {name, calories, fat, carbs,};
}

const rows = [
	createData('how JS', 'sdvvdfvdv', '18.01.1989', 24,),
	createData('How React', 'sdvvdfvdvefv', '18.01.1998', 24,),
	createData('How AJAX', 'sdvvdfvdvfer', '18.01.2010', 67,),
	createData('How HTML', 'sdvvdfvrtdv', '18.01.1991', 37,),
	createData('How CSS', 'sdvvdfvdegrthv', '18.01.2020', 49,),
];

export const Cards = () => {

	const valueRating = 4

	return (
		<>
			<div className={style.container}>

				<div className={style.back}>
					<ArrowBackIcon className={style.arrowBackIcon}/>
					<p>Pack Name</p>
				</div>

				<TextField sx={{'margin-bottom': '20px'}}
				           className={style.searchField}
				           fullWidth
				           size={'small'}
				           id="standard-bare"
				           variant="outlined"
				           placeholder={'search...'}
				           InputProps={{
					           endAdornment: (
						           <IconButton>
							           <SearchOutlined/>
						           </IconButton>
					           ),
				           }}
				/>

				<TableContainer className={style.tableContainer} elevation={3} component={Paper}>
					<Table aria-label="simple table">

						<TableHead>
							<TableRow >
								<TableCell sx={{'font-weight': 'bold'}} >Question</TableCell>
								<TableCell sx={{'font-weight': 'bold'}} align="right">Answer</TableCell>
								<TableCell className={style.affsf} sx={{'font-weight': 'bold'}} align="right">Last Updated<UnfoldMoreIcon
									sx={{'height': '22px', 'position':'relative','top':'5px'}}/></TableCell>
								<TableCell sx={{'font-weight': 'bold'}} align="right">Grade</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell component="th" scope="row" >
										{row.name}
									</TableCell>
									<TableCell align="right">{row.calories}</TableCell>
									<TableCell align="right">{row.fat}</TableCell>
									<TableCell align="right">
										<Rating name="read-only" value={valueRating} size={"small"} readOnly/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						
					</Table>
				</TableContainer>

				<Stack spacing={6}>
					<div className={style.paginationBlock}>
						<Pagination className={style.pagination} count={10} shape="rounded"/>
					</div>
				</Stack>

			</div>
		</>
	)
}
