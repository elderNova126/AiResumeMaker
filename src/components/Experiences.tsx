import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import RemoveButton from "./RemoveButton";
import ReorderButton from "./ReorderButton";
import AddButton from "./AddButton";

import WorkExperienceEditor from "./WorkExperienceEditor";
import Ai_Modal from "./../components/Ai_Modal";
import Contenteditable from "./Contenteditable";
import { color } from "html2canvas/dist/types/css/types/color";
import { fontStyle } from "html2canvas/dist/types/css/property-descriptors/font-style";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

interface ExperienceType {
  company: string;
  dateRange: string;
  position: string;
  description: string[];
  isSplit: boolean;
}

const Experiences: React.FC<{
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  experiences: ExperienceType[];
  themeColor: string;
  isSplit: boolean;
}> = ({ setExperiences, experiences, themeColor, isSplit }) => {
  const [showModal, setShowModal] = useState(false);

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
    // console.log("Drag Result:", result);
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experiences">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} id="work">
              <h2
                contentEditable="true"
                translate-data="Experience"
                placeholder="Experience"
                data-gramm="false"
              ></h2>
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
                      {...provided.dragHandleProps}
                      className="sortable-wrapper"
                    >
                      <div className="with-border">
                        {isSplit ? (
                          <div style={{ display: "contents" }}>
                            <div style={{ display: "flex" }}>
                              <Contenteditable
                                value={experience.position}
                                onChange={(updatedContent) => {
                                  updateExperience(
                                    index,
                                    "position",
                                    updatedContent
                                  );
                                }}
                                as="p"
                                style={{ color: themeColor, fontWeight: "bold" }}
                                placeholder="Position"
                              /><p style={{ fontSize: "large" }}>   |   </p>
                              <Contenteditable
                                value={experience.company}
                                onChange={(updatedContent) => {
                                  updateExperience(
                                    index,
                                    "company",
                                    updatedContent
                                  );
                                }}
                                as="p"
                                style={{ fontWeight: "bold" }}
                                placeholder="Company"
                              />
                            </div>
                            <div style={{ display: "flex" }}>
                              <Contenteditable
                                value={experience.dateRange}
                                onChange={(updatedContent) => {
                                  updateExperience(
                                    index,
                                    "dateRange",
                                    updatedContent
                                  );
                                }}
                                as="p"
                                placeholder="From - Until"
                              /><p style={{ fontSize: "large" }}>   -   </p>
                              <Contenteditable
                                // value={experience.dateRange}
                                // onChange={(updatedContent) => {
                                //   updateExperience(
                                //     index,
                                //     "dateRange",
                                //     updatedContent
                                //   );
                                // }}
                                as="p"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <Contenteditable
                              value={experience.company}
                              onChange={(updatedContent) => {
                                updateExperience(
                                  index,
                                  "company",
                                  updatedContent
                                );
                              }}
                              as="h3"
                              placeholder="Employer"
                            />
                            <div>
                              <Contenteditable
                                value={experience.position}
                                onChange={(updatedContent) => {
                                  updateExperience(
                                    index,
                                    "position",
                                    updatedContent
                                  );
                                }}
                                as="h4"
                                placeholder="Position"
                              />
                              <Contenteditable
                                value={experience.dateRange}
                                onChange={(updatedContent) => {
                                  updateExperience(
                                    index,
                                    "dateRange",
                                    updatedContent
                                  );
                                }}
                                as="p"
                                placeholder="From - Until"
                              />
                            </div>
                          </>
                        )}
                        <WorkExperienceEditor
                          initialDescription={experience.description}
                          updateExperience={updateExperienceByDescription}
                          index={index}
                        />
                        <div className="btn-edit">
                          <span
                            className="writing-assistant"
                            onClick={() => setShowModal(true)}
                            translate-data="✧ Writing Assistant"
                          >
                            ✧ Writing Assistant
                          </span>
                          {experiences.length > 1 && (
                            <>
                              <RemoveButton
                                index={index}
                                removeFunc={removeExperience}
                              />
                              <ReorderButton provided={provided} />
                            </>
                          )}
                          <AddButton addFunc={addExperience} />
                        </div>
                        {experiences.length > 1 &&
                          experiences.length - 1 > index && (
                            <div
                              className="timeline_linea"
                              style={{ background: themeColor }}
                            ></div>
                          )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showModal && (
        <Ai_Modal
          onClose={() => setShowModal(false)}
          headerText={"Experience"}
        />
      )}
    </>
  );
};

export default Experiences;
