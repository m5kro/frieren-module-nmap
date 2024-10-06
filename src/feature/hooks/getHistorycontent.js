import useAuthenticatedQuery from '@common/hooks/useAuthenticatedQuery.js';
import { fetchPost } from '@common/services/fetchService.js';
import { NMAP_GET_HISTORY_CONTENT } from '@module/feature/helpers/queryKeys.js';

/**
 * Fetch the contents of a specific Nmap scan history log.
 *
 * @param {string} filename - The name of the file to fetch the content.
 * @return {Object} The result of the query.
 */
const useGetHistoryContent = (filename) => (
    useAuthenticatedQuery({
        queryKey: [NMAP_GET_HISTORY_CONTENT, filename],
        queryFn: () => fetchPost({
            module: 'nmap',
            action: 'getHistoryContent',
            filename,
        }),
    })
);

export default useGetHistoryContent;
