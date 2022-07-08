import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDebounce} from "usehooks-ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {saveMaxAC, saveMinAC} from "../../../../reducers/packsReducer";

function valuetext(value: number) {
    return `${value}`;
}

const minDistance = 1;

type SliderPropsType = {
    sliderHandler: (min: number, max: number) =>void
}

export const RangeSlider = (props: SliderPropsType) => {

    const maxCardsInPacks = useAppSelector(state=>state.packs.maxCardsCount)
    const dispatch=useAppDispatch()
    const [value, setValue] = React.useState<number[]>([0, maxCardsInPacks]);
    const debouncedValue = useDebounce<number[]>(value, 1000)
    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {

        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
        props.sliderHandler(value[0], value[1])

    };

    useEffect(() => {
        dispatch(saveMinAC(value[0]))
        dispatch(saveMaxAC(value[1]))
    }, [debouncedValue])

    return (
        <Box sx={{width: 200}}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                color={'primary'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                style={{'width': '90%'}}
                marks
                max={maxCardsInPacks}
                disableSwap
            />
        </Box>
    );
}
