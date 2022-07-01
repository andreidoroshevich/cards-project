import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import style from "./Profile.module.css"
import Navbar from "../../navbar/Navbar";
import {EditableSpan} from "../../common/pages/EditableSpan";
import {updateUserNameTC} from "../../../reducers/profileReducer";
import {changeNameType} from "../../../api/loginAPI";

const ProfilePage = () => {

    const profile = useAppSelector(state => state.profile.profile)
    const dispatch = useAppDispatch()

    return (
        <div>
            <Navbar/>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <div className={style.profileContainer}>
                        <div className={style.profile}>

                            <div className={style.innerContainer}>
                                <div><img alt={'avatar'} className={style.photo} src={profile.avatar}/>
                                </div>
                                <div className={style.name}><b>Имя: </b>
                                    <EditableSpan
                                        title={profile.name}
                                        onChange={(newValue) => {
                                            const newData: changeNameType = {avatar: profile.avatar, newName: newValue}
                                            dispatch(updateUserNameTC(newData))
                                        }}/>
                                </div>
                                <div className={style.email}><b>E-mail:</b> {profile.email}</div>
                                <div className={style.cardPacks}><b>Количество созданных
                                    колод:</b> {profile.publicCardPacksCount}</div>
                            </div>
                        </div>
                        <div className={style.cards}> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;