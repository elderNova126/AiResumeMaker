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

interface HobbyType {
  name: string;
}
const Hobbies: React.FC<{
  setHobbies: React.Dispatch<React.SetStateAction<HobbyType[]>>;
  hobbies: HobbyType[];
  themeColor: string;
}> = ({ setHobbies, hobbies, themeColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered item

  const reorder = (
    list: HobbyType[],
    startIndex: number,
    endIndex: number
  ): HobbyType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedHobbies = reorder(
      hobbies,
      result.source.index,
      result.destination.index
    );
    setHobbies(reorderedHobbies);
  };

  const addHobby = () => {
    setHobbies([...hobbies, { name: "" }]);
  };

  const removeHobby = (index: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hobby?"
    );
    if (confirmed) {
      // Fix: Remove the selected item by the correct index
      setHobbies(hobbies.filter((_, i) => i !== index));
    }
  };

  const updateHobby = (index: number, key: keyof HobbyType, value: string) => {
    const updatedHobbies = hobbies.map((hobby, i) =>
      i === index ? { ...hobby, [key]: value } : hobby
    );
    setHobbies(updatedHobbies);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="hobbies">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id="hobbies"
            className="list with-border"
          >
            <h2
              contentEditable="true"
              translate-data="Hobbies"
              placeholder="Hobbies"
              data-gramm="false"
            ></h2>
            {hobbies.map((hobby, index) => (
              <Draggable
                key={`hobby-${index}`}
                draggableId={`hobby-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all ${
                      snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                    } ${hoveredIndex === index ? "bg-gray-100 shadow-md" : ""}`} // Apply hover effect styles
                    onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                    onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
                  >
                    <Contenteditable
                      value={hobby.name}
                      onChange={(updatedContent) => {
                        updateHobby(index, "name", updatedContent);
                      }}
                      as="p"
                      placeholder="Enter hobby"
                      className=""
                      translate-data="Enter hobby"
                      data-gramm="false"
                    />
                    <div className="btn-edit">
                      {hobbies.length > 1 &&
                        hoveredIndex === index && ( // Show buttons only for hovered item
                          <>
                            <RemoveButton
                              index={index}
                              removeFunc={removeHobby} // Pass index directly
                            />
                            <ReorderButton provided={provided} />
                          </>
                        )}
                      {hoveredIndex === index && (
                        <AddButton addFunc={addHobby} />
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
  );
};

export default Hobbies;
