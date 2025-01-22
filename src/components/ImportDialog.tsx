import React, { useState, useRef, useEffect } from "react";
import { X, AlertCircle, FileUp } from "lucide-react";
import {
  parsePDFContent,
  mapToTemplate,
  initializePDFWorker,
} from "../utils/resumeParser";
// import { filterResumeItems } from './parseByAi';
import axios from "axios";
import { isArrayEqual } from "pdfjs-dist/types/src/shared/util";
interface ImportDialogProps {
  onClose: () => void;
  onImport: (data: string[]) => void;
}

const ImportDialog = ({ onClose, onImport }: ImportDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize PDF.js worker when component mounts
  useEffect(() => {
    initializePDFWorker().catch((error) => {
      console.error("Failed to initialize PDF parser:", error);
      setError("PDF parser initialization failed. Please try again.");
    });
  }, []);
  useEffect(() => {
  }, []);

  const mergeJSON = async (json1, json2) => {
    const mergedResult = {};

    // Merge primitive properties (Name, Role, Location, etc.)
    for (const key in json1) {
      mergedResult[key] = json1[key] || json2[key]; // If json1 has value, use it, otherwise use json2
    }

    for (const key in json2) {
      // Add missing keys from json2 (if not already added by json1)
      if (!(key in mergedResult)) {
        mergedResult[key] = json2[key];
      }
    }

    // Merge arrays (Skill and Experience)
    if (Array.isArray(json1.Skill) && Array.isArray(json2.Skill)) {
      mergedResult["Skill"] = [...new Set([...json1.Skill, ...json2.Skill])]; // Merge and remove duplicates
    }
    if (Array.isArray(json1.Education) && Array.isArray(json2.Education)) {
      mergedResult["Education"] = [...new Set([...json1.Education, ...json2.Education])]; // Merge and remove duplicates
    }
    if (Array.isArray(json1.Experience) && Array.isArray(json2.Experience)) {
      mergedResult["Experience"] = [...new Set([...json1.Experience, ...json2.Experience])]; // Merge Experience arrays
    }
    if (Array.isArray(json1.Language) && Array.isArray(json2.Language)) {
      mergedResult["Language"] = [...json1.Language, ...json2.Language]; // Merge Language arrays
    }
    if (Array.isArray(json1.Interest) && Array.isArray(json2.Interest)) {
      mergedResult["Interest"] = [...json1.Interest, ...json2.Interest]; // Merge Interest arrays
    }

    return mergedResult;
  }

  const splitTextIntoChunks = async (text, maxTokens = 8000) => {
    const chunks = [];
    while (text.length > maxTokens) {
      const splitIndex = text.lastIndexOf(".", maxTokens);
      const chunk = text.slice(0, splitIndex);
      chunks.push(chunk);
      text = text.slice(splitIndex + 1);
    }
    chunks.push(text);
    return chunks;
  };
  const openai_key = import.meta.env.VITE_API_KEY;
  ///////////////////////////////////////////////////////////////////
  const handleExtractData = async (resumeText) => {
    if (!resumeText.trim()) {
      setError("Please enter resume text.");
      return;
    }
    const chunks = await splitTextIntoChunks(resumeText);
    let jsonData = {};

    for (let i = 0; i < chunks.length; i++) {
      try {
        const promptTxt = `
        Parse the following resume and extract the following details:
        - Name
        - Role
        - Location
        - Email
        - Phone
        - Website
        - Linkedin        
        - Profile
        - Experience (including Company, DateRange, Position, location, Description)
        - Skill
        - Education (including School, DateRange, Degree)
        - Language (including Name)
        - Interest
        - Other
        Resume text:
        ${chunks[i]}
        Description of Experience, Skill, Language, Interest have to be array format.
        Description of Experience have to be array format devided by enter key.
        and Name, Role, Location, Email, Phone, Website, Linkedin, Profile, Other have to be string format.
        Please give me data as JSON format according to above exact name.`;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o-mini", // Replace with the desired model
            messages: [
              { role: "system", content: "You are an assistant that extracts key information from resumes.", },
              { role: "user", content: promptTxt, },], max_tokens: 3000,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: openai_key,
            },
          }
        );
        const parsedContent = await response.data.choices[0].message.content.replace("```json", "").replace("```", "");
        jsonData = await mergeJSON(jsonData, JSON.parse(parsedContent));
        console.log(i, "-------------send data------------", chunks[i]);
        console.log(i, "-------------receive data------------", JSON.parse(parsedContent));
        console.log(i, "-------------json data------------", jsonData);
        // return JSON.parse(parsedContent);
      } catch (err) {
        console.error("Error extracting data:", err);
        setError("Failed to extract data. Please try again.");
      } finally {
      }
    }
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",jsonData);
    // debugger;
    return jsonData;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Reset file input to allow re-uploading the same file
    event.target.value = "";
    // Add file size check
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 10MB limit");
      return;
    }

    if (!file.type.includes("pdf")) {
      setError("Please upload a PDF file");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log("Starting PDF processing...");
      // console.log('Processing file:', file.name, 'Size:', file.size);
      const extractedData = await parsePDFContent(file);
      // console.log("Extracted data:", extractedData);
      let structuredData;
      structuredData = await handleExtractData(extractedData);
      // console.log("structuredData file:", structuredData);
      // const mappedData = await mapToTemplate(structuredData);

      onImport(structuredData);
      onClose();
    } catch (err) {
      console.error("PDF parsing error:", err);
      setError("Failed to parse resume. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ scale: "200%" }}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Import Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover: transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isProcessing
            ? "border-emerald-300 bg-emerald-50"
            : "border-gray-300"
            }`}
        >
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FileUp className="h-12 w-12 text-gray-400 mb-4" />
            <span className="text-sm ">
              {isProcessing ? "Processing..." : "Click to upload PDF resume"}
            </span>
          </label>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Supported format: PDF
        </p>
      </div>
    </div>
  );
};

export default ImportDialog;
