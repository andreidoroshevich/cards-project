import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../common/pages/modal/Modal";
import {IconButton, TextField} from "@mui/material";
import {updatePackTC} from "../../../../reducers/packsReducer";
import {useAppDispatch} from "../../../../store/store";
import styles from '../../../common/pages/modal/Modal.module.css'
import EditIcon from "@mui/icons-material/Edit";

type UpdatePackPropsType = {
    _id: string
    userId: string
    page: number
    pageCount: number
    sortPacks: string
    min: number
    max: number
    packName: string
}

export const UpdatePackModal = (props: UpdatePackPropsType) => {

    const [newName, setNewName] = useState<string>(props.packName)

    const dispatch = useAppDispatch()

    const nameEnter = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    console.log(newName)


    const UpdatePackHandler = () => {
        dispatch(updatePackTC({_id: props._id, name: newName},
            {
                user_id: props.userId,
                page: props.page,
                pageCount: props.pageCount,
                sortPacks: props.sortPacks,
                min: props.min,
                max: props.max,
                name: newName
            }
        ))
    }

    return (

        <>
            <BasicModal operationButtonName={"SAVE"}
                        operationName={"Edit Pack Name"}
                        //@ts-ignore
                        handleOperation={UpdatePackHandler}
                        openModalButtonName={
                            <IconButton
                                aria-label="delete" size="small">
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        }>
                <div>
                    <TextField
                        type="text"
                        id="standard-basic"
                        className={styles.input}
                        label="Pack Name"
                        variant="standard"
                        value={newName}
                        onChange={nameEnter}
                    />

                </div>
            </BasicModal>

        </>
    );
};

