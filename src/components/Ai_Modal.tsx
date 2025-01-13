import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, FileUp } from 'lucide-react';
import AutoResizeField from "./AutoResizeField";
interface Ai_ModalProps {
  onClose: () => void;
  onData: (data: string) => void;
  headerText:string;
}

const Ai_Modal = ({ onClose, onData,headerText }: Ai_ModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [experience, setExperience] = useState(false);
  const [role, setRole] = useState("");
  const [instruction, setInstruction] = useState("");
  return (
    <div className="zorder-top fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-500 hover: transition-colors"><X className="h-5 w-5" /> </button>
          </div>      
          <div className="cute-robot-v1"> 
            <div className="circle-bg"> 
              <div className="robot-ear left"></div>
              <div className="robot-head"> 
                <div className="robot-face"> 
                  <div className="eyes left"></div>
                  <div className="eyes right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
              <div className="robot-ear right"></div>
              <div className="robot-body"></div>
            </div>
          </div>
          <div className="row items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">AI-Powered Writing Assistant</h2>
            <p className="text-xm text-gray-500 text-center">{headerText}</p>          
          </div>

                        
          
            {headerText=="About Me"  ?(
              <div className="grid grid-cols-2 items-center mb-2 bg-gray-100 rounded-md">
                <AutoResizeField
                  value={role}
                  className="p-2 textEdit text-pad border border-transparent border-emerald-500 outline-none rounded-md transition ease-in-out duration-200 max-w-[200px]"
                  placeholder="Role"
                  onChange={(value) => setRole(value)}
                />
                <select
                  value={experience}
                  onChange={(e) =>setExperience(e.target.value)}
                  className="p-2 text-pad border rounded-md bg-white border border-transparent border-emerald-500 outline-none rounded-md outline-none "
                > 
                  <option key={1} value={1}>Little/No Experience</option>
                  <option key={2} value={2}>Some Experience</option>
                  <option key={3} value={3}>A lots of Experience</option>
                </select>
              </div>
            ):(
              // <div className="items-center gap-2 rounded-md">
                <AutoResizeField
                  value={role}
                  className="p-2 textEdit mb-2 text-pad border border-transparent border-emerald-500 outline-none rounded-md ease-in-out w-full"
                  placeholder="Role"
                  onChange={(value) => setRole(value)}
                />
                // </div>
            )}
            
          
          <AutoResizeField
            type="textarea"
            onChange={(value: string) => setInstruction(value)} // Ensure onChange works with string type
            value={instruction}
            className="textEdit w-full  p-2 rounded-md border border-emerald-500 outline-none transition-all"
            placeholder="Instruction(optional)"
          />
          <button
            type="button"
            className="text-default-sm text-default-sm group-hover:flex items-center justify-center h-6 w-full bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all"
            // onClick={addEducation}
            aria-label="Add AI"
            >✧ Generate {headerText}</button>
        </div>   
    </div>
  );
};

export default Ai_Modal;