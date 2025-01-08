import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";

interface ProEducationType {
  school: string;
  dateRange: string;
  degree: string;
}

const ProEducations: React.FC<{
  setProEducations: React.Dispatch<React.SetStateAction<ProEducationType[]>>;
  educations: ProEducationType[];
  themeColor: string;
}> = ({ setProEducations, proeducations, themeColor }) => {
  const reorder = (
    list: ProEducationType[],
    startIndex: number,
    endIndex: number
  ): ProEducationType[] => {
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
      proeducations,
      result.source.index,
      result.destination.index
    );
    setProEducations(reorderedEducations);
  };

  const addEducation = () => {
    setProEducations([
      ...proeducations,
      { school: "", dateRange: "", degree: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete item?');
    if (confirmed) 
      setProEducations(proeducations.filter((_, i) => i !== index));
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
              {proeducations.map((education, index) => (
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
                      {proeducations.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="zorder-top absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeEducation(index)}
                            aria-label="Remove Education"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            style={{cursor:"pointer"}}
                            className="zorder-top absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}> 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
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
                      <div style={{paddingLeft: "2rem"}}>
                        <div style={{position:"relative"}}>
                          <div className="timeline_bola color_estrellas"></div>
                          <AutoResizeField
                          defaultValue={education.degree}
                          className="p-2 textEdit text-gray-700 placeholder-green-600 text-green-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none w-full rounded-md transition ease-in-out duration-200"
                          placeholder="Bachelor of Science in Computer Science"
                          />|
                          <AutoResizeField
                            defaultValue={education.school}
                            className="p-2 textEdit font-semibold placeholder-black-600 text-black-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                            placeholder="VanderVilt University"
                          />
                      </div>
                      <div className="flex justify-between gap-4">
                        
                        <AutoResizeField
                          defaultValue={education.dateRange}
                          style={{ width: "30%" }}
                          className="p-2 textEdit text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200"
                          placeholder="May 2011"
                        />
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

export default ProEducations;
