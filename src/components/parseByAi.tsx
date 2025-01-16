
export async function filterResumeItems(rawText: string): Promise<any> {

  const response = await fetch('https://resumebackend-6ywp.onrender.com/api/parse', {
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