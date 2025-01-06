import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";

interface ExperienceType {
  company: string;
  dateRange: string;
  position: string;
  description: string;
}

const Experiences: React.FC<{
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  experiences: ExperienceType[];
  themeColor: string;
}> = ({ setExperiences, experiences, themeColor }) => {
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
      { company: "", dateRange: "", position: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div>
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
                      {experiences.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="zorder-top absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeExperience(index)}
                            aria-label="Remove Experience"
                          >
                            -
                          </button>
                          <div
                            className="zorder-top absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            ::
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        className="zorder-top absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
                        onClick={addExperience}
                        aria-label="Add Experience"
                      >
                        +
                      </button>
                      <div style={{paddingLeft: "2rem"}}>
                      <div style={{position:"relative"}}>
                          <div className="timeline_bola color_estrellas"></div>
                            <AutoResizeField
                              defaultValue={experience.company}
                              className="p-2 textEdit font-semibold placeholder-green-600 text-green-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                              placeholder="Company Name"/>
                      </div>                      
                      <div className="flex justify-between gap-4">
                        <AutoResizeField
                          defaultValue={experience.position}
                          className="p-2 textEdit text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                          placeholder="Position"
                        />
                        <AutoResizeField
                          defaultValue={experience.dateRange}
                          style={{ width: "30%" }}
                          className="p-2 textEdit text-sm text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                          placeholder="From ~ Until"
                        />
                      </div>
                      <AutoResizeField
                        type="textarea"
                        defaultValue={experience.description}
                        className="p-3 textEdit w-full text-sm text-gray-600 border-b border-transparent rounded-lg focus:border-emerald-500 focus:outline-none shadow-sm transition ease-in-out duration-200"
                        placeholder="Job Description"
                      />
                      </div>
                      {experiences.length > 1 && (experiences.length-1 > index) && (
                      <div className="timeline_linea"></div>
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

export default Experiences;
