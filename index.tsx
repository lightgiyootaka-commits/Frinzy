// The original file content was invalid and has been replaced with a functional React component.
// This component demonstrates how to use the @google/genai SDK according to the provided guidelines.
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

// Per the guidelines, the API key is sourced exclusively from the environment variable `process.env.API_KEY`.
// It's assumed to be pre-configured, so no UI is provided for key management.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse('');

    try {
      // Per guidelines, use 'gemini-2.5-flash' for general text tasks.
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      // Per guidelines, extract the text response directly from the `text` property.
      const text = result.text;
      setResponse(text);
    } catch (e: any) {
      console.error(e);
      setError(`An error occurred: ${e.message || 'Please check the console for details.'}`);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Gemini API Frontend Demo</h1>
        <p>A simple interface to interact with the Google Gemini API.</p>
      </header>
      
      <main>
        <section>
          <label htmlFor="prompt-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Enter your prompt:
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Explain what a neural network is in simple terms."
            rows={5}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              fontSize: '1rem', 
              boxSizing: 'border-box', 
              borderRadius: '8px', 
              border: '1px solid #ccc' 
            }}
            disabled={loading}
          />
        </section>
        
        <button 
          onClick={generateContent} 
          disabled={loading || !prompt.trim()}
          style={{ 
            marginTop: '1rem', 
            padding: '0.75rem 1.5rem', 
            fontSize: '1rem', 
            cursor: 'pointer', 
            backgroundColor: '#4285F4', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            opacity: (loading || !prompt.trim()) ? 0.6 : 1
          }}
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>

        {error && (
          <div style={{ marginTop: '1rem', color: '#db4437', backgroundColor: '#fbe9e7', padding: '1rem', borderRadius: '8px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {response && (
          <article style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2>Response</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace', fontSize: '1rem' }}>
              {response}
            </pre>
          </article>
        )}
      </main>
    </div>
  );
};

export default App;
