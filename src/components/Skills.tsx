import React, { useState } from "react";
import Contenteditable from "./Contenteditable";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import RemoveButton from "./RemoveButton";
import ReorderButton from "./ReorderButton";
import AddButton from "./AddButton";

interface SkillType {
  skillname: string;
}

const Skills: React.FC<{
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  skills: SkillType[];
  themeColor: string;
}> = ({ setSkills, skills, themeColor }) => {
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );
    if (confirmed) {
      // Fix: Remove the selected skill by the correct index
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index: number, key: keyof SkillType, value: string) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [key]: value } : skill
    );
    setSkills(updatedSkills);
  };

  const openModal = (type: string, instance: any) => {
    // Handle opening the modal (implement this function as needed)
    console.log(`Opening modal for ${type}`);
  };

  return (
    <div id="skills" className="list with-border">
      <h2
        contentEditable="true"
        translate-data="Skills"
        placeholder="Skills"
        data-gramm="false"
      ></h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "contents" }}
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
                      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                      onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
                    >
                      <Contenteditable
                        value={skill.skillname}
                        onChange={(updatedContent) => {
                          updateSkill(index, "skillname", updatedContent);
                        }}
                        as="p"
                        placeholder="Enter skill"
                        className=""
                        translate-data="Enter skill"
                        data-gramm="false"
                      />
                      <div className="btn-edit">
                        {skills.length > 1 && hoveredIndex === index && (
                          <>
                            <RemoveButton
                              index={index}
                              removeFunc={removeSkill}
                            />
                            <ReorderButton provided={provided} />
                          </>
                        )}
                        {hoveredIndex === index && <AddButton addFunc={addSkill} />}
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
      <span className="btn-edit">
        <span
          className="writing-assistant"
          onClick={() => openModal("Skills", this)}
          translate-data="✧ Writing Assistant"
        >
          ✧ Writing Assistant
        </span>
      </span>
    </div>
  );
};

export default Skills;