import Link from "next/link";
import { Pagination, PaginationItem, PaginationRenderItemParams } from "@material-ui/lab";
import { forwardRef } from "react";
import { asString } from "../../helpers/asString";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default function LaptopPagination({ totalPages }: { totalPages: number }) {

    const { query } = useRouter();

    return (
        <Pagination
            page={parseInt(asString(query.page))}
            count={totalPages}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => (
                <PaginationItem
                    component={StyledLink}
                    query={query}
                    item={item}
                    //to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                />
            )}
        />
    )
}

export interface StyledLinkTypes {
    item: PaginationRenderItemParams;
    query: ParsedUrlQuery;
}

/**** function StyledLink({ item, query, ...props }: StyledLinkTypes) { //... } ****/

const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkTypes>(({ item, query, ...props }, ref) => {
    return (
        <Link href={{
            pathname: '/laptops',
            query: { ...query, page: item.page }
        }}  >
            <a {...props}></a>
        </Link>
    )
})