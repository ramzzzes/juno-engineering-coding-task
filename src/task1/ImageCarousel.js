import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {fetchImages} from "../api";


const ImageCarousel = () => {
    const theme = useTheme();
    const [index, setActiveStep] = useState(0);
    const [images,setImages] = useState([])

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const goToPrevPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    useEffect(() => {
        fetchImages().then(r => {
            setImages(r)
        })
    },[])

    return (
        <div
            style={{
                marginLeft: "40%",
            }}
        >
            <div
                style={{
                    maxWidth: 400,
                    flexGrow: 1,
                }}
            >
                <img
                    src={images[index]}
                    style={{
                        height: 255,
                        width: "100%",
                        maxWidth: 400,
                        display: "block",
                        overflow: "hidden",
                    }}
                    alt="not found"
                />
                <MobileStepper
                    position="static"
                    nextButton={
                        <Button
                            size="small"
                            onClick={goToNextPicture}
                            disabled={index === images.length - 1}
                        >
                            Next
                            {theme.direction !== "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={goToPrevPicture}
                            disabled={index === images.length - 1}
                        >
                            Prev
                            {theme.direction !== "ltr" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
            </div>
        </div>
    );
};

export default ImageCarousel;