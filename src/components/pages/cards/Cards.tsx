import * as React from 'react';
import {useEffect, useState} from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../reducers/cardsReduser";
import Navbar from "../../navbar/Navbar";
import styles from "../packs/Packs.module.css";
import {Paginator} from "../../common/pages/pagination/Paginator";
import {Selector} from "../../common/pages/select/Selector";
import {SearchAppBar} from "../searchBar/SearchBar";
import AddNewCardModal from './modals/AddNewCardModal';
import {DeleteCardModal} from './modals/DeleteCardModal';
import {UpdateCardModal} from './modals/UpdateCardModal'


export const Cards = React.memo(() => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const {packid, packname} = useParams()

	const page = useAppSelector(state => state.cards.page)
	const pageCount = useAppSelector(state => state.cards.pageCount)
	const cards = useAppSelector(state => state.cards.cards)
	const user_id = useAppSelector(state => state.profile.userId)
	const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

	useEffect(() => {
		if (packid) {
			dispatch(getCardsTC({cardsPack_id: packid}))
		}
	}, [])

	const navigateBackHandler = () => {
		navigate('/packs-page')
	}

	const handlerAddBtn = () => {
		if (packid) {
			dispatch(addCardTC({cardsPack_id: packid}))
		}
	}

	const handlerDeleteCard = (cardId: string) => {
		if (packid) {
			dispatch(deleteCardTC(packid, cardId))
		}
	}

	const handlerUpdateCard = (cardId: string) => {
		if (packid) {
			dispatch(updateCardTC({_id: cardId, question: 'update name card', answer: 'lalala'}, packid))
		}
	}

	const [sortUpdate, setSortUpdate] = useState(false)//для сортировки по update

	const handleSortByUpdate = () => {
		let sortUpdateStr
		sortUpdate ? sortUpdateStr = '0updated' : sortUpdateStr = '1updated'
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				sortCards: sortUpdateStr,
				page,
				pageCount
			}))
		}
		setSortUpdate(!sortUpdate)
	}

	const onPageChange = (page: number) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	const onChangePageCount = (pageCount: number) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	const onSearchPacks = (cardQuestion: string) => {
		if (packid) {
			dispatch(getCardsTC({
				cardsPack_id: packid,
				cardQuestion,
				page,
				pageCount,
				sortCards: `${Number(sortUpdate)}updated`,
			}))
		}
	}

	const deleteCardHandler = (cardId: string) => {
		if (packid) {
			dispatch(deleteCardTC(packid, cardId))
		}
	}
	return (
		<>
			<Navbar/>
			<div className={style.container}>

				<div className={style.back}>
					<ArrowBackIcon onClick={navigateBackHandler} className={style.arrowBackIcon}/>
					<p className={style.packName}>{packname}</p>
				</div>

				<TableContainer className={style.tableContainer} elevation={3} component={Paper}>

					<SearchAppBar onSearchPacks={onSearchPacks}
					              children={<AddNewCardModal/>}
					/>

					<Table aria-label="simple table">

						<TableHead>
							<TableRow>
								<TableCell sx={{'fontWeight': 'bold'}}>Question</TableCell>
								<TableCell sx={{'fontWeight': 'bold'}} align="right">Answer</TableCell>

								<TableCell className={style.updated} sx={{'fontWeight': 'bold'}} align={'right'}>
									<div className={styles.headerSortText}><b>Updated</b>
										<div>
											<IconButton onClick={handleSortByUpdate} aria-label="arrow" size="small">
												<UnfoldMoreIcon fontSize="inherit"/>
											</IconButton>
										</div>
									</div>
								</TableCell>

								<TableCell sx={{'fontWeight': 'bold'}} align="right">Grade</TableCell>
								<TableCell sx={{'fontWeight': 'bold'}} align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

							{cards.map((card) => (
								<TableRow
									key={card._id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell component="th" scope="row">{card.question}</TableCell>
									<TableCell align="right">{card.answer}</TableCell>
									<TableCell align="right">{
										`${(card.updated).slice(8, 10)}.${(card.updated).slice(5, 7)}.${(card.updated).slice(0, 4)}`
									}</TableCell>

									<TableCell align="right">
										<Rating name="read-only"
										        precision={0.5}
										        value={card.grade}
										        size={"small"} readOnly/>
									</TableCell>

									<TableCell align="right">
										{(card.user_id === user_id)
											? <div className={style.iconBlock}>

													<DeleteCardModal handleOperation={() => deleteCardHandler(card._id)}
													                 cardName={card.question}/>

													<UpdateCardModal packid={packid!}
													                 question={card.question}
													                 answer={card.answer}
													                 cardId={card._id}/>
											</div>
											: null
										}
									</TableCell>

								</TableRow>
							))}
						</TableBody>

					</Table>
				</TableContainer>

				<div className={styles.paginatorBlock}>
					<div className={styles.paginator}>
						<Paginator onPageChange={onPageChange} totalCount={cardsTotalCount} pageCount={pageCount}/>
					</div>
					<div className={styles.selector}>
						Show
						<Selector value={pageCount} onChangePageCount={onChangePageCount}/>
						Packs per page
					</div>
				</div>

			</div>
		</>
	)
})

