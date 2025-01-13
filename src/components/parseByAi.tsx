
export async function filterResumeItems(rawText: string): Promise<any> {

  const response = await fetch('http://127.0.0.1:5000/api/parse', {
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