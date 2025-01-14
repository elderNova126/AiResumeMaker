import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Trash } from "lucide-react";
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
  // isATS: boolean;
}> = ({ setExperiences, experiences, themeColor }) => {

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
    <div id="work">
      <h2
        contentEditable="true"
        translate-data="Experience"
        placeholder="Experience"
        data-gramm="false"
      ></h2>
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
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all ${snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                        }`}
                    >
                      <div className="sortable-wrapper">
                        <div className="with-border">
                          <h3
                            contentEditable="true"
                            translate-data="Employer"
                            placeholder="Employer"
                            data-gramm="false"
                            spellcheck="false"
                            onInput={(e) => updateExperience(index, "company", e.currentTarget.textContent)}
                          >{experience.company}</h3>
                          <div>
                            <h4
                              contentEditable="true"
                              translate-data="Position"
                              placeholder="Position"
                              data-gramm="false"
                              onInput={(e) => updateExperience(index, "position", e.currentTarget.textContent)}
                            >{experience.position}</h4>
                            <p
                              contentEditable="true"
                              translate-data="From - Until"
                              placeholder="From - Until"
                              data-gramm="false"
                              onInput={(e) => updateExperience(index, "dateRange", e.currentTarget.textContent)}
                            >{experience.dateRange}</p>
                          </div>
                          <WorkExperienceEditor
                            initialDescription={experience.description}
                            updateExperience={updateExperienceByDescription}
                            index={index}
                          />
                          <div className="btn-edit">
                            <span
                              className="writing-assistant"
                              onClick="openModal('Experience', this)"
                              translate-data="✧ Writing Assistant"
                            >
                              ✧ Writing Assistant
                            </span>
                            <span
                              className="remove-button"
                              translate-data="Remove"
                              data-tooltip="Remove"
                              onClick={removeExperience}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12H19"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <span
                              className="reorder-button"
                              translate-data="Reorder"
                              data-tooltip="Reorder"
                              {...provided.dragHandleProps}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 15L12 20L17 15M7 9L12 4L17 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <span
                              className="add-button"
                              translate-data="Add"
                              data-tooltip="Add"
                              onClick={addExperience}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19M5 12H19"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>

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
