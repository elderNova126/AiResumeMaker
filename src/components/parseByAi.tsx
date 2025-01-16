
export async function filterResumeItems(rawText: string): Promise<any> {

  const response = await fetch('http://94.131.102.6:5000/api/parse', {
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