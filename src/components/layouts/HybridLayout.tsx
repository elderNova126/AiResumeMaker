import React from 'react';
import { Mail, MapPin, Phone, Globe, Linkedin } from 'lucide-react';

interface HybridLayoutProps {
  themeColor: string;
  visibleSections:string[];
}

const HybridLayout = ({ themeColor,visibleSections }: HybridLayoutProps) => {
  

  return (
    <div className="bg-white shadow-lg mx-auto mt-24 p-8 w-[60vw]">
      {/* Header with Photo */}
      <div className="flex items-start space-x-8 mb-8">
        <div className="w-44 h-44 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <input
            type="text"
            className="p-l-2 text-5xl font-bold w-full border-b border-transparent hover:border-gray-200 focus:outline-none"
            style={{ color: themeColor }}
            defaultValue="John Doe"
            placeholder="Your Name"
          />
          <input
            type="text"
            className="text-lg text-gray-600 w-full mb-4 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
            defaultValue="SENIOR SOFTWARE ENGINEER"
            placeholder="Your Title"
          />
          
          <h2 className="text-xl font-bold mt-6 mb-4" style={{ color: themeColor }}>PERSONAL DETAILS</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {visibleSections.includes('location') && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" style={{ color: themeColor }} />
              <input
                type="text"
                className="p-l-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                defaultValue="New York, USA"
                placeholder="Location"
              />
            </div>
            )}
            {visibleSections.includes('email') && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" style={{ color: themeColor }} />
              <input
                type="email"
                className="p-l-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                defaultValue="john.doe@email.com"
                placeholder="Email"
              />
            </div>
            )}
            {visibleSections.includes('phone') && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" style={{ color: themeColor }} />
              <input
                type="tel"
                className="p-l-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                defaultValue="123-456-7890"
                placeholder="Phone"
              />
            </div>
            )}
            {visibleSections.includes('website') && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" style={{ color: themeColor }} />
              <input
                type="url"
                className="p-l-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                defaultValue="johndoe.com"
                placeholder="Website"
              />
            </div>
            )}
            {visibleSections.includes('linkedin') && (
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4" style={{ color: themeColor }} />
              <input
                type="text"
                className="p-l-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                defaultValue="in/johndoe"
                placeholder="LinkedIn"
              />
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* About Me */}
          {visibleSections.includes('about') && (
          <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>ABOUT ME</h2>
          <div className="mb-8">
            <textarea
              className="p-l-2 w-full p-2 text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
              rows={4}
              style={{
                borderStyle: 'dashed',
                borderColor: 'transparent',
                '&:hover': {
                  borderColor: themeColor
                }
              }}
              defaultValue="Highly skilled and experienced software engineer with a proven track record in developing scalable applications and leading development teams. Passionate about creating efficient solutions and mentoring junior developers."
              placeholder="Professional Summary"
            />
          </div>
          </div>
          )}
          {/* Experience */}
          {visibleSections.includes('experience') && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>EXPERIENCE</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between">
                  <input
                    type="text"
                    className="font-semibold border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                    defaultValue="Tech Solutions Inc."
                    placeholder="Company Name"
                  />
                  <input
                    type="text"
                    className="text-sm text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                    defaultValue="2018 - Present"
                    placeholder="Date Range"
                  />
                </div>
                <input
                  type="text"
                  className="p-2 text-gray-700 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none w-full"
                  defaultValue="Senior Software Engineer"
                  placeholder="Position"
                />
                <textarea
                  className="w-full text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
                  rows={4}
                  defaultValue="• Led development of cloud-native applications using microservices architecture
• Managed team of 5 developers, improving sprint velocity by 40%
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored junior developers and conducted code reviews"
                  placeholder="Job Description"
                />
              </div>
            </div>
          </div>
          )}
          {/* Education */}
          {visibleSections.includes('education') && (
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>EDUCATION</h2>
            <div>
              <div className="flex justify-between">
                <input
                  type="text"
                  className="font-semibold border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                  defaultValue="University of Technology"
                  placeholder="School Name"
                />
                <input
                  type="text"
                  className="text-sm text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                  defaultValue="2014 - 2018"
                  placeholder="Date Range"
                />
              </div>
              <input
                type="text"
                className="text-gray-700 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none w-full"
                defaultValue="Bachelor of Science in Computer Science"
                placeholder="Degree"
              />
            </div>
          </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          {/* Skills */}
          {visibleSections.includes('skills') && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>SKILLS</h2>
            <textarea
              className="w-full p-2 text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
              rows={6}
              defaultValue="Web Development
UI/UX Design
Project Management
Team Leadership
Problem Solving
Communication"
              placeholder="Your Skills"
            />
          </div>
          )}
          {/* Languages */}
          {visibleSections.includes('languages') && (
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>LANGUAGES</h2>
            <textarea
              className="w-full p-2 text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
              rows={3}
              defaultValue="English (Native)
Spanish (Fluent)
French (Basic)"
              placeholder="Languages"
            />
          </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-400">
        Created for free by: <a href="https://airesumemaker.online" className="hover:text-gray-600 transition-colors">airesumemaker.online</a>
      </div>
    </div>
  );
};

export default HybridLayout;