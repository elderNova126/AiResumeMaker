import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";

interface SkillType {
  skillname: string;
}

const Skills: React.FC<{
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  skills: SkillType[];
  themeColor: string;
}> = ({ setSkills, skills, themeColor }) => {
  const reorder = (
    list: SkillType[],
    startIndex: number,
    endIndex: number
  ): SkillType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedSkills = reorder(
      skills,
      result.source.index,
      result.destination.index
    );
    setSkills(reorderedSkills);
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      { skillname: "" },
    ]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="my-3 py-2">
      <h2
        className="text-xl sm:text-xl font-bold mb-2"
        style={{ color: themeColor }}
      >
        SKILLS
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, index) => (
                <Draggable
                  key={`skill-${index}`}
                  draggableId={`skill-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all flex-shrink-0${
                        snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                      }`}
                    >
                      {skills.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeSkill(index)}
                            aria-label="Remove Skill"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            className="absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            {...provided.dragHandleProps}
                          >
                            ::
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        className="absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
                        onClick={addSkill}
                        aria-label="Add Skill"
                      >
                        +
                      </button>

                      <AutoResizeField
                        defaultValue={skill.skillname}
                        className="p-2 textEdit border-b border-transparent hover:border-gray-300 bg-gray-100 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200 max-w-[400px]"
                        placeholder="Skill Name"
                      />
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

export default Skills;
