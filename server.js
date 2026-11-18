const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json' };

const fallbackLesson = (topic) => ({ topic, subtitle: `A two-minute visual explanation of ${topic}.`, steps: [
  { at:0, title:'The big idea', narration:`Let’s make ${topic} click. We’ll build the idea from a simple picture, one step at a time.`, draw:'intro' },
  { at:24, title:'Step 1 · Start with the parts', narration:`First, identify the main parts of ${topic}. Naming the pieces gives us a map for the whole idea.`, draw:'sun' },
  { at:52, title:'Step 2 · See the connection', narration:`Next, connect those parts. The important insight is how one change leads to the next.`, draw:'ingredients' },
  { at:82, title:'Step 3 · Watch it work', narration:`Now apply the idea to a concrete example. This is where the abstract concept becomes useful.`, draw:'glucose' },
  { at:108, title:'The takeaway', narration:`The takeaway is simple: understand the parts, follow the connection, and test the idea with an example.`, draw:'takeaway' }
] });

async function readBody(req) { let body = ''; for await (const chunk of req) body += chunk; return JSON.parse(body || '{}'); }
async function aiRequest(messages) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch('https://api.openai.com/v1/chat/completions', { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${process.env.OPENAI_API_KEY}`}, body:JSON.stringify({ model:process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature:.6, messages }) });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json(); return data.choices?.[0]?.message?.content || '';
}
async function handleApi(req,res,pathname) {
  try {
    const body = await readBody(req);
    if (pathname === '/api/lesson') {
      const topic = String(body.topic || 'photosynthesis').trim().slice(0,160);
      const raw = await aiRequest([{role:'system',content:'Return JSON only with keys topic, subtitle, steps. steps must contain exactly 5 objects with at values 0,24,52,82,108 and title, narration, draw. draw must be one of intro,sun,ingredients,glucose,takeaway. Make the narration beginner-friendly and approximately two minutes when spoken.'},{role:'user',content:`Create a visual whiteboard lesson about ${topic}.`}]);
      const lesson = raw ? JSON.parse(raw.replace(/```json|```/g,'').trim()) : fallbackLesson(topic);
      res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify({...lesson,live:Boolean(raw)}));
    }
    if (pathname === '/api/ask') {
      const question = String(body.question || '').trim().slice(0,500); const topic = String(body.topic || 'the lesson');
      const raw = await aiRequest([{role:'system',content:'You are Lumen, a warm visual tutor. Answer in 2-4 concise sentences and refer back to the current lesson when useful.'},{role:'user',content:`The lesson topic is ${topic}. Learner asks: ${question}`}]);
      const answer = raw || `Great question. Connect it back to ${topic} by looking for the parts, the relationship between them, and a concrete example.`;
      res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify({answer,live:Boolean(raw)}));
    }
    res.writeHead(404); return res.end('Not found');
  } catch (error) { res.writeHead(500,{'Content-Type':'application/json'}); return res.end(JSON.stringify({error:error.message})); }
}

http.createServer((req, res) => {
  const requested = decodeURIComponent(req.url.split('?')[0]);
  if (req.method === 'POST' && requested.startsWith('/api/')) return handleApi(req,res,requested);
  const safePath = requested === '/' ? '/index.html' : requested;
  const filePath = path.join(root, safePath);
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (error, content) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  });
}).listen(port, () => console.log(`Lumen is running at http://localhost:${port}`));
