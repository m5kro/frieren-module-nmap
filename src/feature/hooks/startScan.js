import useAuthenticatedMutation from '@src/hooks/useAuthenticatedMutation.js';
import { fetchPost } from '@common/services/fetchService.js';
import isRunningAtom from '@module/feature/atoms/isRunningAtom.js';
import { useSetAtom } from 'jotai';

/**
 * Starts an Nmap scan and updates the isRunningAtom.
 *
 * @param {string} command - The Nmap command to execute.
 * @return {Object} The result of the mutation.
 */
const useStartScan = () => {
    const setIsRunning = useSetAtom(isRunningAtom);

    const re = useAuthenticatedMutation({
        mutationFn: (command) => fetchPost({
            module: 'nmap',
            action: 'startScan',
            command,
        }),
        onSuccess: () => {
            // Set the atom to true when the scan starts successfully
            setIsRunning(true);
        },
        onError: () => {
            // Handle errors and set the atom to false if the scan fails
            setIsRunning(false);
        },
    });
    console.log(re);
    return re;
};

export default useStartScan;
