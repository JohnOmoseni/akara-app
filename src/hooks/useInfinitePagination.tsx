import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const useInfinitePagination = <T,>(data: T[]) => {
	const [page, setPage] = useState(1);
	const { ref: loadMoreRef, inView } = useInView();
	const ITEMS_PER_PAGE = 10;

	const paginatedData = useMemo(() => {
		if (!data) return [];
		return data.slice(0, page * ITEMS_PER_PAGE);
	}, [data, page]);

	const hasMore = useMemo(() => {
		return paginatedData?.length < (data?.length || 0);
	}, [paginatedData?.length, data]);

	// Load more when scrolled to bottom
	useEffect(() => {
		if (inView && hasMore) {
			// Add a small delay to simulate loading
			setTimeout(() => {
				setPage((prev) => prev + 1);
			}, 500);
		}
	}, [inView, hasMore]);

	return { page, loadMoreRef, paginatedData, hasMore };
};

export default useInfinitePagination;
