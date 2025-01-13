import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";

interface EducationType {
  school: string;
  dateRange: string;
  degree: string;
}

const Educations: React.FC<{
  setEducations: React.Dispatch<React.SetStateAction<EducationType[]>>;
  educations: EducationType[];
  themeColor: string;
  isATS: boolean;
}> = ({ setEducations, educations, themeColor, isATS = false }) => {
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
  return (
    <div className="py-2">
      <h2
        className="text-xl sm:text-xl font-bold mb-2"
        style={{ color: themeColor }}
      >
        EDUCATION
      </h2>
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
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all ${
                        snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                      }`}
                    >
                      {educations.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="zorder-top absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeEducation(index)} aria-label="Remove Education"><Trash className="h-4 w-4" /> </button>
                          <div
                            style={{ cursor: "pointer" }}
                            className="zorder-top absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            {" "}
                            <svg
                              width="24"  height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                          </div>                          
                        </>
                      )}
                      <button
                        type="button"
                        className="zorder-top absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                        onClick={addEducation}
                        aria-label="Add Education"
                      >
                        +
                      </button>
                      {isATS ? (
                        <div className="pl-8  p-2">
                          <div className="relative flex items-center gap-2">
                            <div className="timeline_bola color_estrellas" style={{ background: themeColor }}> </div>
                            <AutoResizeField
                              value={education.degree}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                              placeholder="Degree"
                              onChange={(value) =>
                                updateEducation(index, "degree", value)
                              }
                              flag={true}
                            />
                            <span className="text-gray-400">|</span>
                            <AutoResizeField
                              value={education.school}
                              className="p-2 textEdit text-pad font-semibold placeholder-black-600 text-black-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="University"
                              onChange={(value) =>
                                updateEducation(index, "school", value)
                              }    
                              flag={true}                          
                            />
                          </div>
                          <div className="flex justify-between gap-4">
                            <AutoResizeField
                              value={education.dateRange}
                              style={{ width: "30%" }}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Date Range"
                              onChange={(value) =>
                                updateEducation(index, "dateRange", value)
                              }
                              flag={true}
                            />
                          </div>
                          {educations.length > 1 &&
                              educations.length - 1 > index && (
                              <div
                                className="timeline_linea"
                                style={{ background: themeColor }}
                              ></div>
                            )}
                        </div>
                      ) : (
                        <div style={{ paddingLeft: "2rem" }}>
                          <div style={{ position: "relative" }}>
                            <div
                              className="timeline_bola color_estrellas"
                              style={{ background: themeColor }}
                            ></div>
                            <AutoResizeField
                              value={education.school}
                              className="p-2 textEdit text-pad font-semibold w-full border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="School Name"
                              onChange={(value) =>
                                updateEducation(index, "school", value)
                              }
                            />
                          </div>
                          <div className="flex justify-between gap-4">
                            <AutoResizeField
                              value={education.degree}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                              placeholder="Degree"
                              onChange={(value) =>
                                updateEducation(index, "degree", value)
                              }
                            />
                            <AutoResizeField
                              value={education.dateRange}
                              style={{ width: "30%" }}
                              className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="From ~ Until"
                              onChange={(value) =>
                                updateEducation(index, "dateRange", value)
                              }
                              flag={true}
                            />
                          </div>
                            {educations.length > 1 &&
                              educations.length - 1 > index && (
                              <div
                                className="timeline_linea"
                                style={{ background: themeColor }}
                              ></div>
                            )}
                        </div>
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
    </div>
  );
};

export default Educations;
