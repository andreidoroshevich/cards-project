import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useAppSelector} from "../../../../store/store";


type PaginatorPropsType = {
    onPageChange: (page: number) => void
}


export const Paginator = (props: PaginatorPropsType) => {

    const page = useAppSelector(state => state.packs.page)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.onPageChange(value)
    };

    return (
        <Stack spacing={10}>
            <Pagination
                count={10}
                defaultPage={1}
                color="primary"
                onChange={handleChange}/>
        </Stack>
    );
}