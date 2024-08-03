import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import StartButton from './StartButton';
import ProgressIndicator from './LoadingIndicator';
import DataDisplay from './DataDisplay';


const LongRunningProcess = () => {

    const [loading, setLoading] = useState(false); 
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); 

    useEffect(() => {

        let firstConnectionAttempt = true; 

        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7117/progressHub")
            .withAutomaticReconnect()
            .build();
    
        connection.on("ReceiveProgress", (progress) => { 
            console.log(`Progress: ${progress}%`);
            setProgress(progress);
        });
    
        connection.start()
            .then(() => console.log("Connected to SignalR"))
            .catch(err => {
                if (firstConnectionAttempt) { 
                    firstConnectionAttempt = false; 
                } else {
                    console.log("Connection error:", err); 
                }
            });
    }, []);

    const startProcess = async () => {
        setLoading(true); 
        setProgress(0);
        setData(null);
        setError(null); 

        try {
            const startResponse = await fetch("https://localhost:7117/api/process/start", { method: 'POST' });
            if (!startResponse.ok) {
                console.error("Failed to start");
                setError('Failed to start');
                setLoading(false); 
                return;
            }

            const dataResponse = await fetch("https://localhost:7117/api/process/data");
            if (!dataResponse.ok) {
                console.error("Failed to fetch data");
                setError('Failed to fetch data');
                setLoading(false); 
                return;
            }

            const result = await dataResponse.json();
            setData(result);
        } catch (error) {
            console.error("Error:", error);
            setError('An error occurred');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container">
            <StartButton onClick={startProcess} loading={loading} />
            {loading ? (
                <ProgressIndicator progress={progress} />
            ) : (
                <div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {data && <DataDisplay data={data} />}
            </div>
          )}
        </div>
      );
    };
    


export default LongRunningProcess;
