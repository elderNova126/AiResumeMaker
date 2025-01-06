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
    setEducations([
      ...educations,
      { school: "", dateRange: "", degree: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="my-3 py-2">
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
                            className="absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeEducation(index)}
                            aria-label="Remove Education"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            className="absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            M
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        className="absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
                        onClick={addEducation}
                        aria-label="Add Education"
                      >
                        +
                      </button>

                      <AutoResizeField
                        defaultValue={education.school}
                        className="p-2 textEdit font-semibold placeholder-green-600 text-green-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                        placeholder="School Name"
                      />

                      <div className="flex justify-between gap-4">
                        <AutoResizeField
                          defaultValue={education.degree}
                          className="p-2 textEdit text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                          placeholder="Degree"
                        />
                        <AutoResizeField
                          defaultValue={education.dateRange}
                          style={{ width: "30%" }}
                          className="p-2 textEdit text-sm text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                          placeholder="From ~ Until"
                        />
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
