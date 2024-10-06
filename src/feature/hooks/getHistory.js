import useAuthenticatedQuery from '@common/hooks/useAuthenticatedQuery.js';
import { fetchPost } from '@common/services/fetchService.js';
import { NMAP_GET_HISTORY } from '@module/feature/helpers/queryKeys.js';

/**
 * Fetch the Nmap scan history.
 *
 * @return {Object} The result of the query.
 */
const useGetHistory = () => (
    useAuthenticatedQuery({
        queryKey: [NMAP_GET_HISTORY],
        queryFn: () => fetchPost({
            module: 'nmap',
            action: 'getHistory',
        }),
    })
);

export default useGetHistory;
