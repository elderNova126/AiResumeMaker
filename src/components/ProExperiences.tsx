import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Trash } from "lucide-react";
import AutoResizeField from "./AutoResizeField";
import WorkExperienceEditor from "./WorkExperienceEditor"

interface ProExperienceType {
  position: string;
  company: string;
  dateRange: string;
  district: string;
  country: string;
  description: string;
}
const ProExperiences: React.FC<{
  setProExperiences: React.Dispatch<React.SetStateAction<ProExperienceType[]>>,
  proexperiences: ProExperienceType[],
  themeColor: string,
}> = ({ setProExperiences, proexperiences, themeColor }) => {
  const reorder = (
    list: ProExperienceType[],
    startIndex: number,
    endIndex: number
  ): ProExperienceType[] => {
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
      proexperiences,
      result.source.index,
      result.destination.index
    );
    setProExperiences(reorderedExperiences);
  };

  const addExperience = () => {
    setProExperiences([
      ...proexperiences,
      { position: "",company:"", dateRange: "", district: "",country:"", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete item?');
    if (confirmed) 
      setProExperiences(proexperiences.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2
        className="text-xl sm:text-xl font-bold my-3"
        style={{ color: themeColor }}
      >
        Professional Experience
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experiences">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {proexperiences.map((experience, index) => (
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
                      {proexperiences.length > 1 && (
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
                            style={{cursor:"pointer"}}
                            className="zorder-top absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        className="zorder-top absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                        onClick={addExperience}
                        aria-label="Add Experience"
                      >
                        +
                      </button>
                      <div style={{ paddingLeft: "2rem" }}>
                        <div style={{ position: "relative" }}>
                          <div className="timeline_bola color_estrellas"></div>
                          <AutoResizeField
                            defaultValue={experience.position}
                            className="p-2 textEdit font-semibold placeholder-green-600 text-green-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="Senior PHP web Developer"
                          />|
                          <AutoResizeField
                            defaultValue={experience.company}
                            className="p-2 textEdit font-semibold placeholder-black-600 text-green-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="Company Name A"
                          />
                        </div>
                        <div style={{ position: "relative" }}>
                         <AutoResizeField
                            defaultValue={experience.dateRange}
                            className="p-2 textEdit text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="January 2020 ~ December 2024"
                          />|
                          <AutoResizeField
                            defaultValue={experience.district}
                            className="p-2 textEdit text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="New York"
                          />|
                          <AutoResizeField
                            defaultValue={experience.country}
                            className="p-2 textEdit text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="USA"
                          />
                        </div>
                        <WorkExperienceEditor/>
                        {/* <AutoResizeField
                          type="textarea"
                          defaultValue={experience.description}
                          className="p-2 textEdit text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                          placeholder="Job Description"
                        /> */}
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

export default ProExperiences;
