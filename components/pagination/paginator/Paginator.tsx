import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PaginatorStyle } from "./Paginator.style";
import { ParsedUrlQuery } from "querystring";

interface PaginationTypes {
    cursor: number;
    pageCount: number;
    pageBuffer?: number;
    query?: ParsedUrlQuery;
    onPageChange?: (cur: number) => void;
    children?({ state }: childrenTypes): React.ReactChild | React.ReactChild[];
}

interface StateTypes {
    cursor: number;
    pageCount: number;
    pageBuffer?: number;
    offsetStart: number;
    offsetEnd: number;
}

interface childrenTypes {
    state: StateTypes;
    changePage: (cur: number) => void;
    prevPage: () => void;
    nextPage: () => void;
}

const setOffset = {
    end: function (cursor, pageCount, pageBuffer) {
        if (cursor + (pageBuffer - 1) > pageCount) {
            return pageCount;
        } else {
            return cursor + (pageBuffer - 1);
        }
    },
    start: function (cursor, pageCount, pageBuffer) {
        if ((pageCount - cursor + 1) <= pageBuffer) {
            return pageCount - pageBuffer + 1;
        } else {
            return cursor;
        }
    }
}

export function Paginator({ cursor = 0, pageCount = 0, pageBuffer = pageCount, onPageChange, children, ...props }: PaginationTypes) {

    const [state, setState] = useState<StateTypes>({
        cursor: cursor || 0,
        pageCount: pageCount || 0,
        pageBuffer: pageBuffer || 0,
        offsetStart: setOffset.start(cursor, pageCount, pageBuffer),
        offsetEnd: setOffset.end(cursor, pageCount, pageBuffer),
    });

    useEffect(() => {

        console.log('Page count difference emerged!');
        setState(state => {
            return {
                ...state,
                pageCount: pageCount,
                pageBuffer: pageBuffer,
                offsetStart: setOffset.start(cursor, pageCount, pageBuffer),
                offsetEnd: setOffset.end(cursor, pageCount, pageBuffer),
            }
        });

    }, [pageCount]);

    useEffect(() => {

        if (state.cursor === state.offsetEnd && !(state.cursor + 1 > state.pageCount)) {
            setState(state => {
                return {
                    ...state,
                    offsetEnd: state.offsetEnd + 1,
                    offsetStart: state.offsetStart + 1,
                }
            });
        }
        else if (state.cursor === state.offsetStart && !(state.cursor - 1 <= 0)) {
            /*if (state.offsetEnd === state.cursor + 1 || state.offsetEnd === state.cursor) {
                setState(state => {
                    return {
                        ...state,
                        offsetStart: state.offsetStart - 1,
                    }
                });
            } else {*/
            setState(state => {
                return {
                    ...state,
                    offsetEnd: state.offsetEnd - 1,
                    offsetStart: state.offsetStart - 1,
                }
            });
            //}
        }
    }, [state.cursor]);

    const changePage = (newCursor: number) => {
        setState(state => {
            return {
                ...state,
                cursor: newCursor,
            }
        });
        onPageChange(newCursor);
    }

    const prevPage = () => {
        setState(state => {
            return {
                ...state,
                cursor: state.cursor - 1
            }
        });
    }

    const nextPage = () => {
        setState(state => {
            return {
                ...state,
                cursor: state.cursor + 1
            }
        });
    }

    return (
        <>
            {children({ state, changePage, prevPage, nextPage })}
        </>
    )
}

export default function StyledPagination(props: PaginationTypes) {

    return (
        <Paginator {...props}>
            { ({ state, changePage, nextPage, prevPage }) => {
                const buffer: number[] = Array(state.pageBuffer).fill(0);
                const prevBtnText = state.cursor - 1 <= 0 ? false : true;
                const nextBtnText = state.pageCount >= state.cursor + 1 ? true : false;
                console.log('Props pageCount: ', state.pageCount, 'Props cursor ', state.cursor);
                return (
                    <PaginatorStyle>
                        <Link href={{ pathname: '/laptops', query: { ...props.query, page: state.cursor - 1 } }}>
                            <button className={!prevBtnText ? 'navBtn chevron not-active' : 'navBtn chevron active'}
                                onClick={prevPage}
                            >
                                <FiChevronLeft />
                            </button>
                        </Link>

                        {
                            state.offsetStart > 1 &&
                            <button className={`navBtn active`}><span>...</span></button>
                        }

                        {buffer.map((item, index) => {
                            const pageIndex = state.offsetStart + index;
                            const itemClass = pageIndex === state.cursor ? 'selected' : 'active';
                            return (
                                <Link
                                    key={`item-${pageIndex}`}
                                    href={{
                                        pathname: '/laptops',
                                        query: { ...props.query, page: pageIndex }
                                    }}>
                                    <button
                                        key={`item-${pageIndex}`}
                                        onClick={() => changePage(pageIndex)}
                                        className={`navBtn ${itemClass}`}
                                    >
                                        <a>{pageIndex}</a>
                                    </button>
                                </Link>
                            )
                        })}

                        {
                            (state.pageBuffer < state.pageCount) && (state.offsetEnd !== state.pageCount) &&
                            <button className={`navBtn active`}><span>...</span></button>
                        }

                        <Link href={{ pathname: '/laptops', query: { ...props.query, page: state.cursor + 1 } }}>
                            <button className={!nextBtnText ? 'navBtn chevron not-active' : 'navBtn chevron active'}
                                onClick={nextPage}
                            >
                                <FiChevronRight />
                            </button>
                        </Link>
                    </PaginatorStyle>
                )
            }}
        </Paginator>
    )
}