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

interface LanguageType {
  name: string;
}

const Languages: React.FC<{
  setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
  languages: LanguageType[];
  themeColor: string;
}> = ({ setLanguages, languages, themeColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track hovered item

  const reorder = (
    list: LanguageType[],
    startIndex: number,
    endIndex: number
  ): LanguageType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedLanguages = reorder(
      languages,
      result.source.index,
      result.destination.index
    );
    setLanguages(reorderedLanguages);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: "" }]);
  };

  const removeLanguage = (index: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this language?"
    );
    if (confirmed) {
      // Remove the selected language by the correct index
      setLanguages(languages.filter((_, i) => i !== index));
    }
  };

  const updateLanguage = (index: number, key: keyof LanguageType, value: string) => {
    const updatedLanguages = languages.map((language, i) =>
      i === index ? { ...language, [key]: value } : language
    );
    setLanguages(updatedLanguages);
  };

  return (
    <div id="languages" className="list with-border">
      <h2
        contentEditable="true"
        translate-data="Languages"
        placeholder="Languages"
        data-gramm="false"
      ></h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="languages">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "contents" }}
            >
              {languages.map((language, index) => (
                <Draggable
                  key={`language-${index}`}
                  draggableId={`language-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all ${
                        snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                      } ${
                        hoveredIndex === index ? "bg-gray-100 shadow-md" : ""
                      }`} // Apply hover effect styles
                      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                      onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
                    >
                      <Contenteditable
                        value={language.name}
                        onChange={(updatedContent) => {
                          updateLanguage(index, "name", updatedContent);
                        }}
                        as="p"
                        placeholder="Enter language"
                        className=""
                        translate-data="Enter language"
                        data-gramm="false"
                      />
                      <div className="btn-edit">
                        {languages.length > 1 && hoveredIndex === index && ( // Show buttons only for hovered item
                          <>
                            <RemoveButton
                              index={index}
                              removeFunc={removeLanguage} // Pass index directly
                            />
                            <ReorderButton provided={provided} />
                          </>
                        )}
                        {hoveredIndex === index && <AddButton addFunc={addLanguage} />}
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

export default Languages;
