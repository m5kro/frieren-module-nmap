import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import PanelCard from '@src/components/PanelCard';
import Button from '@src/components/Button';
import useGetHistory from '@module/feature/hooks/getHistory.js';
import useDeleteHistory from '@module/feature/hooks/deleteHistory.js';
import useGetHistoryContent from '@module/feature/hooks/getHistoryContent.js';

const HistoryCard = () => {
    const query = useGetHistory();
    const { mutate: deleteHistory, isPending: deleteHistoryRunning } = useDeleteHistory();
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: fileContent, isLoading: isLoadingContent } = useGetHistoryContent(selectedFile);
    const { data, isSuccess } = query;

    const handleOpenClick = (item) => {
        setSelectedFile(item);
    };

    const handleDeleteClick = (item) => {
        deleteHistory({ filename: item });
    };

    return (
        <PanelCard title={'History'} query={query}>
            {isSuccess && (
                <>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Scan File</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item}</td>
                                        <td>
                                            <Button
                                                label={'Open'}
                                                icon={'folder-open'}
                                                onClick={() => handleOpenClick(item)}
                                            />
                                            <Button
                                                label={'Delete'}
                                                icon={'trash-2'}
                                                variant={'danger'}
                                                loading={deleteHistoryRunning}
                                                onClick={() => handleDeleteClick(item)}
                                                className={'ms-2'}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2}>No scan history to display.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {selectedFile && (
                        <div className="mt-4">
                            <h5>File Content: {selectedFile}</h5>
                            {isLoadingContent ? (
                                <p>Loading content...</p>
                            ) : (
                                <pre>{fileContent || 'No content available.'}</pre>
                            )}
                        </div>
                    )}
                </>
            )}
        </PanelCard>
    );
};

export default HistoryCard;
