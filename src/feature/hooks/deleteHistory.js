import useAuthenticatedMutation from '@src/hooks/useAuthenticatedMutation.js';
import { fetchPost } from '@common/services/fetchService.js';

/**
 * Deletes a specific Nmap scan history log.
 *
 * @param {string} filename - The name of the file to delete.
 * @return {Object} The result of the mutation.
 */
const useDeleteHistory = () => {
    return useAuthenticatedMutation({
        mutationFn: (filename) => fetchPost({
            module: 'nmap',
            action: 'deleteHistory',
            filename,
        }),
        onSuccess: () => {
            // Handle success if necessary, e.g., refetch history or show confirmation
            console.log(`File ${filename} deleted successfully.`);
        },
        onError: (error) => {
            // Handle errors if necessary
            console.error(`Error deleting file ${filename}:`, error);
        },
    });
};

export default useDeleteHistory;
