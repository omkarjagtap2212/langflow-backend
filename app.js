// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import fetch from 'node-fetch';

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// class LangflowClient {
//     constructor(baseURL, applicationToken) {
//         this.baseURL = baseURL;
//         this.applicationToken = applicationToken;
//     }

//     async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
//         headers["Authorization"] = `Bearer ${this.applicationToken}`;
//         const url = `${this.baseURL}${endpoint}`;
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(body)
//             });

//             const responseMessage = await response.json();
//             if (!response.ok) {
//                 throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
//             }
//             return responseMessage;
//         } catch (error) {
//             console.error('Request Error:', error.message);
//             throw error;
//         }
//     }

//     async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
//         const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
//         return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
//     }

//     async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false) {
//         try {
//             const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
//             if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
//                 const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
//                 this.handleStream(streamUrl);
//             }
//             return initResponse;
//         } catch (error) {
//             console.error('Error running flow:', error);
//             throw error;
//         }
//     }
// }

// app.post('/runFlow', async (req, res) => {
//     const { flowIdOrName, langflowId, inputValue, tweaks = {}, stream } = req.body;
//     const applicationToken = 'AstraCS:UQzxZflZSIDGnhAFXpwPDJzx:0a15faad4887ee8a6b38e7c5a7de96cded1ae7e8a4c7f02d0b3d5656f3474498'; 

//     const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

//     try {
//         const response = await langflowClient.runFlow(flowIdOrName, langflowId, inputValue, 'chat', 'chat', tweaks, stream);
//         if (response && response.outputs) {
//             res.json(response);
//         } else {
//             res.status(400).json({ error: 'No response from Langflow API' });
//         }
//     } catch (error) {
//         console.error('Backend Error:', error.message);
//         res.status(500).json({ error: 'Error connecting to Langflow API' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import langflowRoutes from './routes/langflowRoutes.js';
import { handleError } from './utils/errorHandler.js';
import config from './config/config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', langflowRoutes);

// Error handling middleware
app.use(handleError);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
export default createServer(app);