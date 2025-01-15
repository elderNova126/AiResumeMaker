import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, FileUp } from 'lucide-react';
import AutoResizeField from "./AutoResizeField";
import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
interface Ai_ModalProps {
  onClose: () => void;
  headerText: string;
}

const Ai_Modal = ({ onClose, headerText }: Ai_ModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [experience, setExperience] = useState(false);
  const [role, setRole] = useState("");
  const [instruction, setInstruction] = useState("");
  return (
    <div id="modalSkills" className="modal" style={{ display: "flex" }}>
      <div>
        <div className="close">
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
        <h3 translate-data="AI-Powered Writing Assistant">
          AI-Powered Writing Assistant
        </h3>
        <p translate-data="Skills">{headerText}</p>
        {headerText == "Summary" ? (
          <>
            <div className="columns">
              <div>
                <label translate-data="Role">Role</label>
                <input
                  type="text"
                  className="role"
                  translate-data="Enter your role"
                  placeholder="Enter your role"
                />
              </div>
              <div>
                <label translate-data="Experience Level">Experience Level</label>
                <select>
                  ㅤㅤㅤㅤㅤㅤ
                  <option
                    value="Little/No experience"
                    selected
                    translate-data="Little/No experience"
                  >
                    Little/No experience
                  </option>
                  <option value="Some experience" translate-data="">
                    Some experience
                  </option>
                  <option
                    value="A lot of experience"
                    translate-data="A lot of experience"
                  >
                    A lot of experience
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label translate-data="Instructions (optional)"
              >Instructions (optional)</label
              >
              <textarea
                id="customInstructionsSummary"
                translate-data="Enter any specific details you want to include (e.g., key skills, personal traits, industry focus)"
                placeholder="Enter any specific details you want to include (e.g., key skills, personal traits, industry focus)"
                rows="2"
              ></textarea>
            </div>
            <textarea
              id="modalSummaryOutput"
              className="output"
              translate="no"
              disabled
              placeholder=""
              rows="7"
              style={{ display: "none" }}
            ></textarea>
            <button className="generate btn-secondary">
              <svg
                width="24"
                height="24"
                viewbox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span translate-data="Generate Summary">Generate Summary</span>
            </button>
            {/* <button className="apply btn-tertiary">
              <svg
                width="24"
                height="24"
                viewbox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289Z"
                  fill="currentColor"></path></svg><span translate-data="Use Summary">Use Summary</span>
            </button> */}
          </>
        ) : (
          <>
            <div>
              <label translate-data="Role">Role</label>
              <input
                type="text"
                className="role"
                translate-data="Enter your role for skill suggestions"
                placeholder="Enter your role for skill suggestions"
              />
            </div>
            <button className="generate btn-secondary">
              <span></span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span translate-data="Generate Skills">Generate Skills</span>
            </button>
          </>
        )}


      </div>
    </div>
  );
};

export default Ai_Modal;