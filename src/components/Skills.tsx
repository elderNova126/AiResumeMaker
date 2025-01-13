import React, {useState} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";
import Ai_Modal from "./../components/Ai_Modal";

interface SkillType {
  skillname: string;
}
const Skills: React.FC<{
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  skills: SkillType[];
  themeColor: string;
}> = ({ setSkills, skills, themeColor }) => {
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered item

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
    setSkills([...skills, { skillname: "" }]);
  };

  const removeSkill = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (
    index: number,
    key: keyof SkillType,
    value: string
  ) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [key]: value } : skill
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="py-2 relative group border border-transparent rounded-md hover:border-gray-300 transition-all">
      <h2
        className="text-xl sm:text-xl font-bold mb-2"
        style={{ color: themeColor }}
      >
        SKILLS
      </h2>
      <button
        type="button"
        className="zorder-top absolute -top-3 right-2 hidden text-default-sm group-hover:flex items-center justify-center h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
        onClick={() => setShowAiDialog(true)}
        aria-label="Add AI"
        style={{ width: "145px" }}
      >
        ✧ Writing Assistant
      </button>
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
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all flex-shrink-0 ${
                        snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                      onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
                    >
                      {hoveredIndex === index && skills.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="absolute -top-3 right-16 flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeSkill(index)}
                            aria-label="Remove Skill"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            style={{ cursor: "pointer" }}
                            className="absolute -top-3 right-9 flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </>
                      )}
                      {hoveredIndex === index && (
                        <button
                          type="button"
                          className="absolute -top-3 right-2 flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                          onClick={addSkill}
                          aria-label="Add Skill"
                        >
                          +
                        </button>
                      )}

                      <AutoResizeField
                        value={skill.skillname}
                        className="p-2 textEdit text-pad border-b border-transparent min-w-[130px] hover:border-gray-300 bg-gray-100 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200 max-w-[400px]"
                        placeholder="Skill Name"
                        onChange={(value) =>
                          updateSkill(index, "skillname", value)
                        }
                        flag={true}
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
      {showAiDialog && (
        <Ai_Modal
          onClose={() => setShowAiDialog(false)}
          headerText={"Skill"}
        />
      )}
    </div>
  );
};

export default Skills;
