import React, { useState } from "react";
import ResumeATSPDF from "../resumePDF/PreviewResumeATS";
import ResumeClassicPDF from "../resumePDF/PreviewResumeClassic";
import ResumePDF from "../resumePDF/PreviewResumeSplit";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface Experience {
  company: string;
  dateRange: string;
  position: string;
  location: string;
  description: string[];
}
interface Education {
  school: string;
  dateRange: string;
  degree: string;
}
interface Skill {
  skillname: string;
}
interface Language {
  name: string;
}
interface Hobby {
  name: string;
}
interface ModalDownloadProps {
  setShowDownloadModal: () => boolean;
  currentLayout: string;
  themeColor: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  other: string;
  websiteLink: string;
  linkedinLink: string;
  summery: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  avatar: string;
  visibleSections: string[];
  currentTypography: { font: string; size: string };
}

const ModalDownload: React.FC<ModalDownloadProps> = ({
  setShowDownloadModal,
  currentLayout,
  themeColor,
  name,
  role,
  location,
  email,
  phone,
  other,
  websiteLink,
  linkedinLink,
  summery,
  experiences,
  educations,
  skills,
  languages,
  hobbies,
  avatar,
  visibleSections,
  currentTypography,
}) => {
  const [shareToDownload, setShareToDownload] = useState(true);
  const [downloadingLoading, setDownloadingLoading] = useState(false);

  async function updateGoogleSheet(position: number): Promise<any> {
    try {
      // Send the POST request to the server
      const response = await fetch('http://localhost:5000/api/doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set header for JSON payload
        },
        body: JSON.stringify({ cellPosition: position }), // Send position as a number
      });
  
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      // Parse the response
      const data = await response.text();
      console.log('Response:', data);
      return data;
    } catch (error) {
      // Log and rethrow errors
      console.error('Error updating Google Sheet:', error);
      throw error;
    }
  }


  return (
    <div id="modalDownload" className="modal" style={{ display: "flex" }}>
      <div style={{ maxWidth: "33rem" }}>
        <div
          className="close"
          onClick={() => setShowDownloadModal(false)}
        ></div>
        <div>
          <div className="freeDownload">
            <h3 data-translate="Free Download" style={{ fontSize: "large" }}>
              Free Download
            </h3>

            <div className="bullets">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9ZM13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9ZM8.47433 14.1913C9.27227 13.6109 10.4745 13 12 13C13.5255 13 14.7277 13.6109 15.5257 14.1913C15.9266 14.4828 16.2365 14.7743 16.4486 14.9956C16.555 15.1067 16.638 15.2013 16.6966 15.2712C16.726 15.3062 16.7493 15.3351 16.7666 15.3568L16.7879 15.3841L16.7951 15.3935L16.7978 15.3971L16.799 15.3987C16.7992 15.399 16.8 15.4 16 16L16.8 15.4C17.1314 15.8418 17.0418 16.4686 16.6 16.8C16.1596 17.1303 15.5353 17.0424 15.2031 16.6042L15.1985 16.5982C15.1925 16.5907 15.1812 16.5766 15.1647 16.5569C15.1315 16.5174 15.0778 16.4558 15.0046 16.3794C14.8573 16.2257 14.6359 16.0172 14.3493 15.8087C13.7723 15.3891 12.9745 15 12 15C11.0255 15 10.2277 15.3891 9.65067 15.8087C9.36407 16.0172 9.14272 16.2257 8.99543 16.3794C8.92219 16.4558 8.86846 16.5174 8.83531 16.5569C8.81877 16.5766 8.80745 16.5907 8.8015 16.5982L8.79729 16.6036L8.79839 16.6021L8.79913 16.6012M8.79913 16.6012C8.79823 16.6024 8.79819 16.6024 8.79729 16.6036C8.46511 17.0418 7.84044 17.1303 7.4 16.8C6.95817 16.4686 6.86863 15.8418 7.2 15.4L8 16C7.2 15.4 7.19975 15.4003 7.2 15.4L7.20216 15.3971L7.2049 15.3935L7.21211 15.3841L7.23341 15.3568C7.25065 15.3351 7.27401 15.3062 7.30336 15.2712C7.36201 15.2013 7.445 15.1067 7.55145 14.9956C7.76353 14.7743 8.07343 14.4828 8.47433 14.1913"
                    fill="currentColor"
                  ></path>
                </svg>
                <span data-translate="Basic Quality.">Basic Quality.</span>
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9ZM13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9ZM8.47433 14.1913C9.27227 13.6109 10.4745 13 12 13C13.5255 13 14.7277 13.6109 15.5257 14.1913C15.9266 14.4828 16.2365 14.7743 16.4486 14.9956C16.555 15.1067 16.638 15.2013 16.6966 15.2712C16.726 15.3062 16.7493 15.3351 16.7666 15.3568L16.7879 15.3841L16.7951 15.3935L16.7978 15.3971L16.799 15.3987C16.7992 15.399 16.8 15.4 16 16L16.8 15.4C17.1314 15.8418 17.0418 16.4686 16.6 16.8C16.1596 17.1303 15.5353 17.0424 15.2031 16.6042L15.1985 16.5982C15.1925 16.5907 15.1812 16.5766 15.1647 16.5569C15.1315 16.5174 15.0778 16.4558 15.0046 16.3794C14.8573 16.2257 14.6359 16.0172 14.3493 15.8087C13.7723 15.3891 12.9745 15 12 15C11.0255 15 10.2277 15.3891 9.65067 15.8087C9.36407 16.0172 9.14272 16.2257 8.99543 16.3794C8.92219 16.4558 8.86846 16.5174 8.83531 16.5569C8.81877 16.5766 8.80745 16.5907 8.8015 16.5982L8.79729 16.6036L8.79839 16.6021L8.79913 16.6012M8.79913 16.6012C8.79823 16.6024 8.79819 16.6024 8.79729 16.6036C8.46511 17.0418 7.84044 17.1303 7.4 16.8C6.95817 16.4686 6.86863 15.8418 7.2 15.4L8 16C7.2 15.4 7.19975 15.4003 7.2 15.4L7.20216 15.3971L7.2049 15.3935L7.21211 15.3841L7.23341 15.3568C7.25065 15.3351 7.27401 15.3062 7.30336 15.2712C7.36201 15.2013 7.445 15.1067 7.55145 14.9956C7.76353 14.7743 8.07343 14.4828 8.47433 14.1913"
                    fill="currentColor"
                  ></path>
                </svg>
                <span translate-data="Contains Watermark.">
                  Contains Watermark.
                </span>
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9ZM13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9ZM8.47433 14.1913C9.27227 13.6109 10.4745 13 12 13C13.5255 13 14.7277 13.6109 15.5257 14.1913C15.9266 14.4828 16.2365 14.7743 16.4486 14.9956C16.555 15.1067 16.638 15.2013 16.6966 15.2712C16.726 15.3062 16.7493 15.3351 16.7666 15.3568L16.7879 15.3841L16.7951 15.3935L16.7978 15.3971L16.799 15.3987C16.7992 15.399 16.8 15.4 16 16L16.8 15.4C17.1314 15.8418 17.0418 16.4686 16.6 16.8C16.1596 17.1303 15.5353 17.0424 15.2031 16.6042L15.1985 16.5982C15.1925 16.5907 15.1812 16.5766 15.1647 16.5569C15.1315 16.5174 15.0778 16.4558 15.0046 16.3794C14.8573 16.2257 14.6359 16.0172 14.3493 15.8087C13.7723 15.3891 12.9745 15 12 15C11.0255 15 10.2277 15.3891 9.65067 15.8087C9.36407 16.0172 9.14272 16.2257 8.99543 16.3794C8.92219 16.4558 8.86846 16.5174 8.83531 16.5569C8.81877 16.5766 8.80745 16.5907 8.8015 16.5982L8.79729 16.6036L8.79839 16.6021L8.79913 16.6012M8.79913 16.6012C8.79823 16.6024 8.79819 16.6024 8.79729 16.6036C8.46511 17.0418 7.84044 17.1303 7.4 16.8C6.95817 16.4686 6.86863 15.8418 7.2 15.4L8 16C7.2 15.4 7.19975 15.4003 7.2 15.4L7.20216 15.3971L7.2049 15.3935L7.21211 15.3841L7.23341 15.3568C7.25065 15.3351 7.27401 15.3062 7.30336 15.2712C7.36201 15.2013 7.445 15.1067 7.55145 14.9956C7.76353 14.7743 8.07343 14.4828 8.47433 14.1913"
                    fill="currentColor"
                  ></path>
                </svg>
                <span translate-data="No Save/Edit Later.">
                  No Save/Edit Later.
                </span>
              </span>
              {/* Repeat for other SVG and bullet points */}
            </div>
            <div className="columns">
              {shareToDownload ? (
                <>
                  <button
                    className="btn-secondary"
                    disabled
                    id="freeDownloadBtn"
                    data-complete="Download"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V9.15032C18.2826 9.21225 18.5539 9.30243 18.816 9.43597C19.5686 9.81947 20.1805 10.4314 20.564 11.184C20.8113 11.6694 20.9099 12.1861 20.9558 12.7482C21 13.2894 21 13.9537 21 14.7587V16.2413C21 17.0463 21 17.7106 20.9558 18.2518C20.9099 18.8139 20.8113 19.3306 20.564 19.816C20.1805 20.5686 19.5686 21.1805 18.816 21.564C18.3306 21.8113 17.8139 21.9099 17.2518 21.9558C16.7106 22 16.0463 22 15.2413 22H8.75868C7.95372 22 7.28936 22 6.74817 21.9558C6.18608 21.9099 5.66937 21.8113 5.18404 21.564C4.43139 21.1805 3.81947 20.5686 3.43597 19.816C3.18868 19.3306 3.09012 18.8139 3.04419 18.2518C2.99998 17.7106 2.99999 17.0463 3 16.2413V14.7587C2.99999 13.9537 2.99998 13.2894 3.04419 12.7482C3.09012 12.1861 3.18868 11.6694 3.43597 11.184C3.81947 10.4314 4.43139 9.81947 5.18404 9.43597C5.44614 9.30243 5.71739 9.21225 6 9.15032V8ZM8 9.00163C8.23771 8.99999 8.4904 9 8.7587 9H15.2413C15.5096 9 15.7623 8.99999 16 9.00163V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9.00163ZM6.91104 11.0376C6.47262 11.0734 6.24842 11.1383 6.09202 11.218C5.7157 11.4097 5.40973 11.7157 5.21799 12.092C5.1383 12.2484 5.07337 12.4726 5.03755 12.911C5.00078 13.3611 5 13.9434 5 14.8V16.2C5 17.0566 5.00078 17.6389 5.03755 18.089C5.07337 18.5274 5.1383 18.7516 5.21799 18.908C5.40973 19.2843 5.7157 19.5903 6.09202 19.782C6.24842 19.8617 6.47262 19.9266 6.91104 19.9624C7.36113 19.9992 7.94342 20 8.8 20H15.2C16.0566 20 16.6389 19.9992 17.089 19.9624C17.5274 19.9266 17.7516 19.8617 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C18.8617 18.7516 18.9266 18.5274 18.9624 18.089C18.9992 17.6389 19 17.0566 19 16.2V14.8C19 13.9434 18.9992 13.3611 18.9624 12.911C18.9266 12.4726 18.8617 12.2484 18.782 12.092C18.5903 11.7157 18.2843 11.4097 17.908 11.218C17.7516 11.1383 17.5274 11.0734 17.089 11.0376C16.6389 11.0008 16.0566 11 15.2 11H8.8C7.94342 11 7.36113 11.0008 6.91104 11.0376ZM12 13.5C12.5523 13.5 13 13.9477 13 14.5V16.5C13 17.0523 12.5523 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5V14.5C11 13.9477 11.4477 13.5 12 13.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    <span translate-data="Share to Download">
                      Share to Download
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {currentLayout === "split" && (
                    <PDFDownloadLink
                      document={
                        <ResumePDF
                          themeColor={themeColor}
                          name={name}
                          role={role}
                          location={location}
                          email={email}
                          phone={phone}
                          other={other}
                          websiteLink={websiteLink}
                          linkedinLink={linkedinLink}
                          summery={summery}
                          experiences={experiences}
                          educations={educations}
                          skills={skills}
                          languages={languages}
                          hobbies={hobbies}
                          avatar={avatar}
                          visibleSections={visibleSections}
                          currentTypography={currentTypography}
                        />
                      }
                      fileName={"split_Resume_" + name + ".pdf"}
                    >
                      {" "}
                      <button
                        className="btn-secondary"
                        id="freeDownloadBtn"
                        data-complete="Download"
                        disabled={downloadingLoading}
                        onClick={() => updateGoogleSheet(0)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <span translate-data="Share to Download">
                          {downloadingLoading ? "Preparing..." : "Download"}
                        </span>
                      </button>
                    </PDFDownloadLink>
                  )}
                  {currentLayout === "classic" && (
                    <PDFDownloadLink
                      document={
                        <ResumeClassicPDF
                          themeColor={themeColor}
                          name={name}
                          role={role}
                          location={location}
                          email={email}
                          phone={phone}
                          other={other}
                          websiteLink={websiteLink}
                          linkedinLink={linkedinLink}
                          summery={summery}
                          experiences={experiences}
                          educations={educations}
                          skills={skills}
                          languages={languages}
                          hobbies={hobbies}
                          avatar={avatar}
                          visibleSections={visibleSections}
                          currentTypography={currentTypography}
                        />
                      }
                      fileName={"Classic_Resume_" + name + ".pdf"}
                      //   style={{width:"inherit"}}
                    >
                      <>
                        <button
                          className="btn-secondary"
                          id="freeDownloadBtn"
                          data-complete="Download"
                          disabled={downloadingLoading}
                          onClick={() => updateGoogleSheet(0)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                          <span translate-data="Share to Download">
                            {downloadingLoading ? "Preparing..." : "Download"}
                          </span>
                        </button>
                      </>
                    </PDFDownloadLink>
                  )}
                  {currentLayout === "hybrid" && (
                    <PDFDownloadLink
                      document={
                        <ResumeATSPDF
                          themeColor={themeColor}
                          name={name}
                          role={role}
                          location={location}
                          email={email}
                          phone={phone}
                          other={other}
                          websiteLink={websiteLink}
                          linkedinLink={linkedinLink}
                          summery={summery}
                          experiences={experiences}
                          educations={educations}
                          skills={skills}
                          languages={languages}
                          hobbies={hobbies}
                          avatar={avatar}
                          visibleSections={visibleSections}
                          currentTypography={currentTypography}
                        />
                      }
                      fileName={"ATS_Resume" + name + ".pdf"}
                    >
                      <>
                        <button
                          className="btn-secondary"
                          id="freeDownloadBtn"
                          data-complete="Download"
                          disabled={downloadingLoading}
                          onClick={() => updateGoogleSheet(0)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                          <span translate-data="Share to Download">
                            {downloadingLoading ? "Preparing..." : "Download"}
                          </span>
                        </button>
                      </>
                    </PDFDownloadLink>
                  )}
                  {/* <button
                    className="btn-secondary"
                    id="freeDownloadBtn"
                    data-complete="Download"
                    onClick={}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>

                    <span translate-data="Share to Download">Download</span>
                  </button> */}
                </>
              )}
              {shareToDownload && (
                <>
                  <a
                    className="btn-secondary social"
                    href="https://www.facebook.com/sharer/sharer.php?u=https://resumemakerbuilder.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    onClick={() => {setShareToDownload(false)
                        updateGoogleSheet(1)
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                  <a
                    className="btn-secondary social"
                    href="https://www.linkedin.com/shareArticle?mini=true&url=https://resumemakerbuilder.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    onClick={() => {setShareToDownload(false)
                        updateGoogleSheet(2)
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5563 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2938 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
};

export default ModalDownload;
