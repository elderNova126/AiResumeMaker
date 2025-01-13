import React,{useState} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Trash } from "lucide-react";
import AutoResizeField from "./AutoResizeField";
import WorkExperienceEditor from "./WorkExperienceEditor";
import Ai_Modal from "./../components/Ai_Modal";

interface ExperienceType {
  company: string;
  dateRange: string;
  position: string;
  description: string[];
}

const Experiences: React.FC<{
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  experiences: ExperienceType[];
  themeColor: string;
  isATS: boolean;
}> = ({ setExperiences, experiences, themeColor, isATS = false }) => {

  const [showAiDialog, setShowAiDialog] = useState(false);

  const reorder = (
    list: ExperienceType[],
    startIndex: number,
    endIndex: number
  ): ExperienceType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    console.log("Drag Result:", result);
    if (!result.destination) {
      return;
    }
    const reorderedExperiences = reorder(
      experiences,
      result.source.index,
      result.destination.index
    );

    setExperiences(reorderedExperiences);
  };
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", dateRange: "", position: "", description: [] },
    ]);
  };

  const removeExperience = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) setExperiences(experiences.filter((_, i) => i !== index));
  };
  const updateExperience = (
    index: number,
    key: keyof ExperienceType,
    value: string
  ) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience
    );
    setExperiences(updatedExperiences);
  };
  const updateExperienceByDescription = (
    index: number,
    key: keyof ExperienceType,
    value: string[]
  ) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience
    );
    setExperiences(updatedExperiences);
  };
  return (
    <div className="py-2">
      <h2
        className="text-xl sm:text-xl font-bold my-3"
        style={{ color: themeColor }}
      >
        EXPERIENCE
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experiences">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {experiences.map((experience, index) => (
                <Draggable
                  key={`experience-${index}`}
                  draggableId={`experience-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all ${
                        snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                      }`}
                    >
                      
                      {experiences.length > 1 ? (
                        <>
                          <button
                            type="button"
                            className="zorder-top absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeExperience(index)}
                            aria-label="Remove Experience"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            style={{ cursor: "pointer" }}
                            className="zorder-top absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            <svg
                              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round"  stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                          <button
                            type="button"
                            className="zorder-top absolute -top-3 right-[94px] hidden text-default-sm group-hover:flex items-center justify-center h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => setShowAiDialog(true)}
                            aria-label="Add AI"
                            style={{ width: "145px"}}
                          >
                            ✧ Writing Assistant
                          </button>
                        </>                        
                      ):(
                        <button
                          type="button"
                          className="zorder-top absolute -top-3 right-9 hidden group-hover:flex text-text-default-sm items-center justify-center h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                          onClick={() => setShowAiDialog(true)}
                          aria-label="Add AI"
                          style={{ width: "145px"}}>✧ Writing Assistant </button>
                      )}
                      <button
                        type="button"
                        className="zorder-top absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                        onClick={addExperience}
                        aria-label="Add Experience"
                      >
                        +
                      </button>
                      {isATS ? (
                        <div className="pl-8 p-2">
                          <div className="relative flex items-center gap-2">
                            <div className="timeline_bola color_estrellas" style={{ background: themeColor }}></div>
                            <AutoResizeField
                              value={experience.position}
                              className="p-2 textEdit text-pad font-semibold border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Position"
                              onChange={(value) =>
                                updateExperience(index, "position", value)
                              }
                              flag={true}
                            />
                            <span className="text-gray-400">|</span>
                            <AutoResizeField
                              value={experience.company}
                              className="p-2 textEdit text-pad font-semibold placeholder-black-600  border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Company"
                              onChange={(value) =>
                                updateExperience(index, "company", value)
                              }
                              flag={true}
                            />
                          </div>
                          <div className="relative flex items-center gap-2">
                            <AutoResizeField
                              value={experience.dateRange}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Date Range"
                              onChange={(value) =>
                                updateExperience(index, "dateRange", value)
                              }
                              flag={true}
                            />
                            <span className="text-gray-400">|</span>
                            <AutoResizeField
                              value={experience.location}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Location"
                              flag={true}
                            />
                          </div>
                          <WorkExperienceEditor
                            initialDescription={experience.description}
                            updateExperience={updateExperienceByDescription}
                            index={index}
                          />
                        </div>
                      ) : (
                        <div style={{ paddingLeft: "2rem" }}>
                          <div style={{ position: "relative" }}>
                            <div
                              className="timeline_bola color_estrellas"
                              style={{ background: themeColor }}
                            ></div>
                            <AutoResizeField
                              value={experience.company}
                              className="p-2 textEdit text-pad font-semibold w-full border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Company Name"
                              onChange={(value) =>
                                updateExperience(index, "company", value)
                              }
                            />
                          </div>
                          <div className="flex justify-between gap-4">
                            <AutoResizeField
                              value={experience.position}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                              placeholder="Position"
                              onChange={(value) =>
                                updateExperience(index, "position", value)
                              }
                            />
                            <AutoResizeField
                              value={experience.dateRange}
                              style={{ width: "30%" }}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="From ~ Until"
                              onChange={(value) =>updateExperience(index, "dateRange", value)}
                              flag={true}
                              
                            />
                          </div>
                          <WorkExperienceEditor
                            initialDescription={experience.description}
                            updateExperience={updateExperienceByDescription}
                            index={index}
                          />
                        </div>
                      )}

                      {experiences.length > 1 &&
                        experiences.length - 1 > index && (
                          <div
                            className="timeline_linea"
                            style={{ background: themeColor }}
                          ></div>
                        )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            
          )}
        </Droppable>
      </DragDropContext>
      {showAiDialog && (
        <Ai_Modal
          onClose={() => setShowAiDialog(false)}
          // onImport={handleImport}
          headerText={'Experience'}
        />
      )}
    </div>
  );
};

export default Experiences;
