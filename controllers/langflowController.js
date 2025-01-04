import langflowService from '../services/langflowService.js';

export const runFlow = async (req, res) => {
    const { flowIdOrName, langflowId, inputValue, tweaks = {}, stream } = req.body;
    try {
        const response = await langflowService.runFlow(flowIdOrName, langflowId, inputValue, 'chat', 'chat', tweaks, stream);
        if (response && response.outputs) {
            res.json(response);
        } else {
            res.status(400).json({ error: 'No response from Langflow API' });
        }
    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({ error: 'Error connecting to Langflow API' });
    }
};
