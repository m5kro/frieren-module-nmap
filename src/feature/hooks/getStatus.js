import useAuthenticatedQuery from '@src/hooks/useAuthenticatedQuery.js';
import { fetchPost } from '@common/services/fetchService.js';
import { NMAP_GET_STATUS } from '@module/feature/helpers/queryKeys.js';
import isRunningAtom from '@module/feature/atoms/isRunningAtom.js';
import { useSetAtom } from 'jotai';

/**
 * Fetch Nmap status and update the isRunningAtom.
 *
 * @return {Object} The result of the query.
 */
const useGetStatus = () => {
    const setIsRunning = useSetAtom(isRunningAtom);

    return useAuthenticatedQuery({
        queryKey: [NMAP_GET_STATUS],
        queryFn: () => fetchPost({
            module: 'nmap',
            action: 'status',
        }),
        onSuccess: (data) => {
            // Update the atom based on the response
            setIsRunning(data.nmap_running);
        },
    });
};

export default useGetStatus;
