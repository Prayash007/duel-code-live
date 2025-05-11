// services/codeExecution.ts
import axios from 'axios';

const JUDGE0_API_KEY = 'db1016fdb4mshed8374d241b7fc9p156cd1jsnaf48d2683b3e'; // Get from RapidAPI
const JUDGE0_URL = 'https://rapidapi.com';

export const executeCode = async (code: string, languageId: number) => {
  const options = {
    method: 'POST',
    url: `${JUDGE0_URL}/submissions`,
    params: {
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': JUDGE0_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      source_code: code,
      language_id: languageId,
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Execution error:', error);
    return null;
  }
};
