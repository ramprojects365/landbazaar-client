import PaginationNextSvg from "@/components/SVG/Pagination/PaginationNextSvg";
import PaginationPrevSvg from "@/components/SVG/Pagination/PaginationPrevSvg";

export default function PropertyPagination() {
    return (
        <div className="tp-pagination tp-rent-pagination pt-30">
            <nav>
                <ul className="justify-content-center">
                    <li>
                        <button
                            className="prev-page-number disabled">
                            <PaginationPrevSvg />
                            {" "} Prev
                        </button>
                    </li>
                    <li>
                        <button className="disabled">1</button>
                    </li>
                    <li>
                        <button className="current">2</button>
                    </li>
                    <li>
                        <button className="disabled">3</button>
                    </li>
                    <li>
                        <button
                            className="next-page-number disabled">
                            Next {" "} <PaginationNextSvg />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}