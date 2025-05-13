import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { supabase } from '@/integrations/supabase/client';
import { executeCode } from '../services/codeExecution';

const LANGUAGES = {
  python: { name: 'Python', id: 71, defaultCode: 'print("Hello from Python")' },
  cpp: { name: 'C++', id: 54, defaultCode: '#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello from C++";\n  return 0;\n}' },
  java: { name: 'Java', id: 62, defaultCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java");\n  }\n}' },
};

export const DuelEditor = ({ duelId, userId, isSpectator }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(LANGUAGES['python'].defaultCode);
  const [status, setStatus] = useState('Connecting...');
  const [isSynced, setIsSynced] = useState(true);
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const channel = supabase.channel(`duel-${duelId}`, {
      config: {
        broadcast: { ack: true },
        presence: { key: userId }
      }
    });

    setStatus('Connected to duel');
    channel
      .on('broadcast', { event: 'code' }, ({ payload }) => {
        if (payload.userId !== userId) {
          setCode(payload.code);
          setLanguage(payload.language);
          setIsSynced(true);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      setStatus('Disconnected');
    };
  }, [duelId, userId]);

  const handleCodeChange = (value) => {
    if (value === null) return;
    setCode(value);
    setIsSynced(false);
    if (isSpectator) {
      supabase.channel(`duel-${duelId}`).send({
        type: 'broadcast',
        event: 'code',
        payload: { code: value, language, userId }
      });
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const newCode = LANGUAGES[newLang].defaultCode;
    setCode(newCode);
    if (isSpectator) {
      supabase.channel(`duel-${duelId}`).send({
        type: 'broadcast',
        event: 'code',
        payload: { code: newCode, language: newLang, userId }
      });
    }
  };

  const handleSubmit = async () => {
    if (isSpectator) return;
    setIsSubmitting(true);
    setOutput('Running...');
    try {
      const languageId = LANGUAGES[language].id;
      const submission = await executeCode(code, languageId);
      const { token } = submission;

      let result = null;
      for (let i = 0; i < 10; i++) {
        const res = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
          headers: {
            'X-RapidAPI-Key': 'db1016fdb4mshed8374d241b7fc9p156cd1jsnaf48d2683b3e',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          }
        });
        const data = await res.json();
        if (data.status.id >= 3) {
          result = data;
          break;
        }
        await new Promise(res => setTimeout(res, 1000));
      }

      if (result) {
        setOutput(result.stdout || result.stderr || 'No output');
      } else {
        setOutput('Timeout: Execution took too long.');
      }
    } catch (error) {
      setOutput('Error executing code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden">
      <div className="bg-muted px-4 py-2 text-sm font-medium text-muted-foreground flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span>{isSpectator ? 'Spectator View' : 'Live Coding Duel'}</span>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={isSpectator}
            className="ml-2 px-2 py-1 text-sm bg-background border rounded-md"
          >
            {Object.entries(LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <span className={`text-xs ${isSynced ? 'text-green-500' : 'text-yellow-500'}`}>
          {isSynced ? 'Synced' : 'Typing...'}
        </span>
      </div>

      <div className="flex-grow">
        <Editor
          height="70vh"
          language={language === 'cpp' ? 'cpp' : language}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            readOnly: !isSpectator,
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      {!isSpectator && (
        <div className="p-4 border-t flex items-center justify-between bg-muted">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-codeduels-primary text-white rounded-md hover:bg-primary/90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <div className="ml-4 text-sm text-muted-foreground">{status}</div>
        </div>
      )}

      <div className="p-4 bg-background border-t text-sm">
        <div className="font-semibold mb-1">Output:</div>
        <pre className="bg-black text-white p-2 rounded overflow-x-auto whitespace-pre-wrap max-h-60">{output}</pre>
      </div>
    </div>
  );
};
