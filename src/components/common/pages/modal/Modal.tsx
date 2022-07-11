import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styles from './Modal.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    children: React.ReactNode
    openModalButtonName: any
    operationName: string
    operationButtonName: string
    handleOperation: (packId?: string, name?: string)=>void
}


export const BasicModal: FC<PropsType> = ({
                                              children,
                                              openModalButtonName,
                                              operationName,
                                              operationButtonName,
                                              handleOperation
                                          }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div onClick={handleOpen}>{openModalButtonName}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.modalHead}>
                        <div className={styles.operationName}>{operationName}</div>
                        <div className={styles.closeCross} onClick={handleClose}>X</div>
                    </div>


                   <div className={styles.children}>{children}</div>

                    <div className={styles.buttonBlock}>
                        <Button variant={'contained'} color="primary"
                                onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant={'contained'} color="primary"
                                onClick={()=>handleOperation()}>
                            {operationButtonName}
                        </Button>

                    </div>


                </Box>
            </Modal>
        </div>
    );
}