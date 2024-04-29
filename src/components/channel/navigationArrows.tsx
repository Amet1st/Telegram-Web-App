import arrowLeft from "../../assets/left.png";
import arrowRight from "../../assets/right.png";
import React, {useEffect} from "react";
import {useGlobalStateContext} from "../../services/globalStateProvider";
import {useSearchParams} from "react-router-dom";

export default function NavigationArrows() {
    const {index, dispatch, allMessages, count, activeMessages} = useGlobalStateContext();
    const [params] = useSearchParams()

    const emptyElement = <div className="w-[60px]"></div>
    const isPaginationNeeded = params.has("start") || params.has("count");

    useEffect(() => {
        dispatch({index: 0});
    }, [params]);

    return isPaginationNeeded ? (
            <div className="flex items-center gap-[50px] w-[240px]">
                {index !== 0 ? <button onClick={() => dispatch({index: index - 1})}>
                    <img className="h-[60px]" src={arrowLeft} alt="Previous"/>
                </button> : emptyElement
                }

                <p className="text-3xl">{index + 1}</p>

                {index < Math.floor(allMessages.length / count) && (allMessages.at(-1)?.id !== activeMessages.at(-1)?.id) ?
                    <button onClick={() => dispatch({index: index + 1})}>
                        <img className="h-[60px]" src={arrowRight} alt="Next"/>
                    </button> : emptyElement
                }
            </div>
        )
        : null;
}