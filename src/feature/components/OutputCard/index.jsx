import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';

import PanelCard from '@src/components/PanelCard';
import useGetLog from '@module/feature/hooks/getLog.js';

const LogOutput = () => {
    const { data: log, isLoading, isError } = useGetLog();
    const logRef = useRef(null);

    // Scroll to bottom when log is updated
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    return (
        <PanelCard title="Nmap Scan Log">
            <Form.Group>
                <Form.Label>Log Output</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    readOnly
                    value={isLoading ? 'Loading log...' : isError ? 'Error loading log' : log || 'No log available'}
                    ref={logRef}
                    style={{ whiteSpace: 'pre-wrap', overflowY: 'auto' }}
                />
            </Form.Group>
        </PanelCard>
    );
};

export default LogOutput;
