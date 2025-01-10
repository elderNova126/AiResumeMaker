

import React, { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // Replace with your OpenAI API key
  dangerouslyAllowBrowser: true,
});

interface ParsedData {
  name?: string;
  role?: string;
  location?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  summary?: string;
  workExperiences?: {
    company: string;
    position: string;
    date: string;
    description: string;
  }[];
  education?: {
    school: string;
    degree: string;
    date: string;
  }[];
  skills?: string[];
  languages?: string[];
}

const ResumeExtractor: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>(`John Doe
A senior developer
CONTACT
New York
john.doe@example.com
5551234567
123 Main Street, Apt 4B
John.Doe.com
ABOUT ME
A passionate and results-driven Full
Stack Developer with expertise in Python,
JavaScript, and cloud technologies. Experienced in building scalable web and mobile
applications, leading modernization initiatives, and optimizing performance across
various industries. Proven ability to collaborate with cross-functional teams and deliver innovative solutions that drive business
growth and enhance user experience.
WORK EXPERIENCE
XYZ Solutions, New York
Full Stack Developer
March 2017 to May 2020
• Developed scalable web applications using React, Node.js, and MongoDB, leading to a 20%
increase in customer retention.
• Integrated third-party APIs and external services to improve product functionality and customer
experience.
• Worked with AWS cloud infrastructure, utilizing EC2, Lambda, and S3 to improve server uptime
and reduce costs.
ABC Technologies, New York
Lead Full Stack Developer
June 2020 to Present
• Led the modernization of a real estate platform using Next.js, Node.js, and Python, boosting
platform responsiveness and user experience by 35%.
• Designed and developed a microservices-based architecture on AWS with Docker and Kubernetes, reducing operational costs by 25%.
• Implemented secure payment solutions with Stripe and Plaid APIs, reducing payment errors
by 15% and enhancing transaction security.
• Directed the automation of deployment pipelines with GitHub Actions, reducing release cycles
from two weeks to three days.
• Mentored junior developers, improving team efficiency by 30%.
EDUCATION
University of New York, New York
Bachelor of Science in Computer Science
May 2016
SKILLS
Python Javascript Java
LANGUAGES
English`);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleExtract = async () => {
    setLoading(true);

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Extract the following fields from this resume: \n\n- Name \n- Role \n- Location \n- Email \n- Phone \n- Address \n- Website \n- LinkedIn \n- Summary \n- Work Experiences (Company, Position, Date, Description) as an array \n- Education (School, Degree, Date) as an array \n- Skills \n- Languages \n\nResume: ${resumeText}`,
          },
        ],
      });
      console.log("starging .............");
      const extractedData = chatCompletion.choices[0].message?.content;
      console.log("starging %%%%%%%%%%");
      if (extractedData) {
        setParsedData(JSON.parse(extractedData)); // Ensure the API response is JSON structured
        console.log("################", JSON.parse(extractedData));
      }
    } catch (error) {
      console.error('Error extracting resume data:', error);
      alert('Failed to extract data. Please check the resume format or try again.');
    }

    setLoading(false);
  };

 

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Resume Parser</h1>
      <h1>Resume Parser</h1>
      <h1>Resume Parser</h1>
      <h1>Resume Parser</h1>
      <h1>Resume Parser</h1>
      <textarea
        placeholder="Paste resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        style={{ width: '100%', height: '150px', marginBottom: '10px', padding: '10px' }}
      />
      <button onClick={handleExtract} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Extracting...' : 'Extract Data'}
      </button>

      {parsedData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Parsed Data</h2>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeExtractor;
