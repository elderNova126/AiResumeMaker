
export async function filterResumeItems(rawText: string): Promise<any> {

  // const response = await fetch('https://resumebackend-production-1908.up.railway.app/api/parse', {
  const response = await fetch('http://localhost:5000/api/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body:  rawText ,
  });
  const data = await response.text();
  const jsonData = JSON.parse(data);
  console.log('Parsed Data:', jsonData);
  return jsonData;
}
