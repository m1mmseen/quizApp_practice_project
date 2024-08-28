import {useEffect, useState} from "react";

export default function QuestionProgressBar({timeout, onTimeout}) {

    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        setTimeout(onTimeout, timeout)
    }, [timeout, onTimeout])

    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100)
    }, []);


    return <progress max={timeout} value={remainingTime}/>

}
