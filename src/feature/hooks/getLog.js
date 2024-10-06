import useAuthenticatedQuery from '@common/hooks/useAuthenticatedQuery.js';
import { fetchPost } from '@common/services/fetchService.js';
import { NMAP_GET_LOG } from '@module/feature/helpers/queryKeys.js';

/**
 * Fetch the latest Nmap log.
 *
 * @return {Object} The result of the query.
 */
const useGetLog = () => (
    useAuthenticatedQuery({
        queryKey: [NMAP_GET_LOG],
        queryFn: () => fetchPost({
            module: 'nmap',
            action: 'getLog',
        }),
    })
);

export default useGetLog;
