import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Packs.module.css'
import {Button, IconButton} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {deletePackTC, getPacksTC, savePageAC, updatePackTC} from "../../../reducers/packsReducer";
import {RangeSlider} from "../../common/pages/slider/RangeSlider";
import {SearchAppBar} from "../searchBar/SearchBar";
import {Paginator} from "../../common/pages/pagination/Paginator";
import {Selector} from "../../common/pages/select/Select";
import Navbar from "../../navbar/Navbar";
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export const Packs = () => {

    const [isActive, setIsActive] = useState(true)
    const [sortDirection, setSortDirection] = useState(false)


    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const user_id = useAppSelector(state => state.profile.userId)
    const loginUserId = useAppSelector(state => state.login.loginUserId)


    const getPacks = () => {
        if (!page) {
            return dispatch(getPacksTC())
        }
        return dispatch(getPacksTC({page}))
    }

    useEffect(() => {
        getPacks()
    }, [])


    const myPacksHandler = () => {
        if (user_id) {
            dispatch(getPacksTC({user_id, pageCount}))
            setIsActive(!isActive)
        } else {
            dispatch(getPacksTC({user_id: loginUserId, pageCount}))
            setIsActive(!isActive)
        }
    }

    const allPacksHandler = () => {
        dispatch(getPacksTC({pageCount}))
        setIsActive(!isActive)
    }


    const onPageChange = (page: number) => {
        dispatch(savePageAC(page))
        dispatch(getPacksTC({page, pageCount}))
    }

    const onChangePageCount = (pageCount: number) => {
        dispatch(getPacksTC({page, pageCount}))
    }

    const onSearchPacks = (packName: string) => {
        dispatch(getPacksTC({packName, page, pageCount}))
    }

    const onSortPacks = () => {
        dispatch(getPacksTC({sortPacks: `${Number(sortDirection)}` + `updated`}))
        setSortDirection(!sortDirection)
    }

    const sliderHandler = (min: number, max: number) => {
        dispatch(getPacksTC({min, max}))
    }


    return (
        <>
            <Navbar/>

            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div>
                        <p className={styles.title}>Show packs cards</p>
                        <div className={styles.buttonBlock}>
                            <Button className={styles.button} variant={'contained'}
                                    disabled={!isActive}
                                    color="primary"
                                    onClick={myPacksHandler}>
                                My
                            </Button>
                            <Button variant={'contained'} color="primary"
                                    disabled={isActive}
                                    onClick={allPacksHandler}>
                                All
                            </Button>
                        </div>
                    </div>
                    <div>
                        <p className={styles.title}>Number of cards</p>
                        <div className={styles.rangeSlider}>
                            <RangeSlider sliderHandler={sliderHandler}/>
                        </div>
                    </div>
                </div>
                <div className={styles.mainTable}>
                    <h3>Packs List</h3>
                    <SearchAppBar onSearchPacks={onSearchPacks}/>
                    <TableContainer component={Paper} className={styles.cardsTable}>
                        <Table className={styles.mainCardsTable} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={onSortPacks} className={styles.headerText}
                                               align={'center'}><b>Name</b></TableCell>
                                    <TableCell onClick={onSortPacks} className={styles.headerText} align={'center'}><b>Cards
                                        count</b></TableCell>

                                    <TableCell className={styles.headerSortText}
                                               align={'center'}>Updated

                                        <IconButton onClick={onSortPacks} aria-label="arrow" size="small">
                                            <UnfoldMoreIcon fontSize="inherit"/>
                                        </IconButton>

                                    </TableCell>
                                    <TableCell onClick={onSortPacks} className={styles.headerTextActive}
                                               align={'center'}><b>Author</b></TableCell>
                                    <TableCell className={styles.headerText} align={'center'}><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packs.map((p) => (
                                    <TableRow
                                        key={p._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell className={styles.tableText} component="th" scope="row">
                                            {p.name}
                                        </TableCell>
                                        <TableCell className={styles.tableText}
                                                   align={'center'}>{p.cardsCount}</TableCell>
                                        <TableCell className={styles.tableText}
                                                   align={'center'}>
                                            {`${(p.updated).slice(8, 10)}.${(p.updated).slice(5, 7)}.${(p.updated).slice(0, 4)}`}
                                        </TableCell>
                                        <TableCell className={styles.tableText}>{p.user_name}</TableCell>


                                        {(p.user_id === user_id || p.user_id === loginUserId) ?
                                            <TableCell className={styles.tableText} align={'center'}>
                                                <div className={styles.iconBlock}>
                                                    <IconButton aria-label="school" size="small">
                                                        <SchoolIcon fontSize="inherit"/>
                                                    </IconButton>

                                                    <IconButton onClick={() => (dispatch(deletePackTC(p._id)))}
                                                                aria-label="delete" size="small">
                                                        <DeleteIcon fontSize="inherit"/>
                                                    </IconButton>

                                                    <IconButton onClick={() => {
                                                        dispatch(updatePackTC({_id: p._id, name: "Pack name changed"}))
                                                    }}
                                                                aria-label="delete" size="small">
                                                        <EditIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                            :
                                            <TableCell className={styles.tableText} align={'left'}>
                                                <div className={styles.iconBlock1}>
                                                    <IconButton aria-label="school" size="small">
                                                        <SchoolIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={styles.paginatorBlock}>
                        <div className={styles.paginator}>
                            <Paginator onPageChange={onPageChange}/>
                        </div>
                        <div className={styles.selector}>
                            Show
                            <Selector value={pageCount} onChangePageCount={onChangePageCount}/>
                            Packs per page
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
