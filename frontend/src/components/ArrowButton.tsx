import { AiOutlineArrowDown } from "react-icons/ai";

export default function ArrowButton({ cssClass, handleSubmit }: { cssClass: string, handleSubmit: any }) {

    return (
        <button
            type="submit"
            className={`btn-down ${cssClass} `}
            onClick={handleSubmit}
        >
            <AiOutlineArrowDown />
        </button>
    )
}