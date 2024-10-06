import useAuthenticatedMutation from '@src/hooks/useAuthenticatedMutation.js';
import { fetchPost } from '@common/services/fetchService.js';
import isRunningAtom from '@module/feature/atoms/isRunningAtom.js';
import { useSetAtom } from 'jotai';

/**
 * Stops an Nmap scan and updates the isRunningAtom.
 *
 * @return {Object} The result of the mutation.
 */
const useStopScan = () => {
    const setIsRunning = useSetAtom(isRunningAtom);

    return useAuthenticatedMutation({
        mutationFn: () => fetchPost({
            module: 'nmap',
            action: 'stopScan',
        }),
        onSuccess: () => {
            // Set the atom to false when the scan is stopped
            setIsRunning(false);
        },
    });
};

export default useStopScan;
