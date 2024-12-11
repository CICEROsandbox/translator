"use client";
import { useState } from 'react';

export default function Home() {
  const [inputText, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      setTranslatedText(data.translation || 'Translation failed');
    } catch (error) {
      setTranslatedText('Translation failed: ' + error.message);
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Norwegian Text</h1>
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Norwegian text..."
            className="w-full p-2 border rounded min-h-[100px]"
          />
        </div>
        <button
          onClick={handleTranslate}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Translate
        </button>
        {translatedText && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">English Translation</h2>
            <div className="p-2 border rounded bg-gray-50">
              {translatedText}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
