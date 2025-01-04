import fetch from 'node-fetch';
import config from '../config/config.js';

class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                this.handleStream(streamUrl);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            throw error;
        }
    }
}

export default new LangflowClient(config.baseURL, config.applicationToken);
