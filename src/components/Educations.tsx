import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";
import { color } from "html2canvas/dist/types/css/types/color";

interface EducationType {
  school: string;
  dateRange: string;
  degree: string;
}

const Educations: React.FC<{
  setEducations: React.Dispatch<React.SetStateAction<EducationType[]>>;
  educations: EducationType[];
  themeColor: string;
}> = ({ setEducations, educations, themeColor }) => {
  const reorder = (
    list: EducationType[],
    startIndex: number,
    endIndex: number
  ): EducationType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedEducations = reorder(
      educations,
      result.source.index,
      result.destination.index
    );
    setEducations(reorderedEducations);
  };

  const addEducation = () => {
    setEducations([...educations, { school: "", dateRange: "", degree: "" }]);
  };

  const removeEducation = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) setEducations(educations.filter((_, i) => i !== index));
  };
  const updateEducation = (
    index: number,
    key: keyof EducationType,
    value: string
  ) => {
    const updatedExperiences = educations.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience
    );
    setEducations(updatedExperiences);
  };
  console.log("educations: ", educations);
  return (
    <div id="education">
      <h2
        contentEditable="true"
        translate-data="Education"
        placeholder="Education"
        data-gramm="false"
      ></h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="educations">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {educations.map((education, index) => (
                <Draggable
                  key={`education-${index}`}
                  draggableId={`education-${index}`}
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
                            translate-data="School"
                            placeholder="School"
                            data-gramm="false"
                            spellcheck="false"
                            style={{ color: themeColor }}
                          >{education.school}</h3>
                          <div>
                            <h4
                              contentEditable="true"
                              translate-data="Degree"
                              placeholder="Degree"
                              data-gramm="false"
                            >{education.degree}</h4>
                            <p
                              contentEditable="true"
                              translate-data="From - Until"
                              placeholder="From - Until"
                              data-gramm="false"
                            >{education.dateRange}</p>
                          </div>
                          <div className="btn-edit">
                            <span
                              className="remove-button"
                              translate-data="Remove"
                              data-tooltip="Remove"
                              onClick={() => removeEducation(index)}
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
                              onClick={addEducation}
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Educations;
