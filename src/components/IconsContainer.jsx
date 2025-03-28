import { useSetAtom } from "jotai";
import { accordionState } from "../store/atoms/editor";


const SearchBar = () => {

    console.log("Rendering SearchBar");

    return(
        <>
        <div className='mt-10 min-h-10 flex justify-between items-center border border-gray-200 rounded-3xl w-[90%] mx-auto overflow-hidden focus-within:border-gray-300 focus-within:shadow-xs hover:border-gray-300 transition-all duration-200'>
            <input type='text' id='search-field' className="outline-none ml-3 text-base w-[80%]" />
            <button className="cursor-pointer mr-0 h-9 aspect-square bg-purple-300 rounded-full flex items-center justify-center">
                <img src='/src/assets/2_SearchBar/1_Search.svg' className="h-[90%]"></img>
            </button>
        </div>
        </>
    )
};

const Accordion = ({ id, content, isSelected } ) => {
    const setIsSelected = useSetAtom(accordionState);
    return(
        <>
            <button 
            onClick={() => {
                setIsSelected((prev) => ({
                    ...prev,
                    [id]: !prev[id]
                }))
            }}
            className="focus-within:cursor-pointer"
            >
                <h1>{id}</h1>
            </button>
            
            {isSelected && content}
        </>
    )
}


export {
    SearchBar,
    Accordion
}