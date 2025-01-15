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
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

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
    debugger;
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

  const updateLanguage = (
    index: number,
    key: keyof LanguageType,
    value: string
  ) => {
    const updatedLanguages = languages.map((language, i) =>
      i === index ? { ...language, [key]: value } : language
    );
    setLanguages(updatedLanguages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="languages">
        {(provided) => (
          <div
            id="languages"
            className="list with-border"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2
              contentEditable="true"
              translate-data="Languages"
              placeholder="Languages"
              data-gramm="false"
            ></h2>
            {languages.map((language, index) => (
              <Draggable
                key={`language-${index}`} // Ensure unique key
                draggableId={`language-${index}`} // Match unique ID
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} // Ensure drag functionality
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
                    <span className="btn-edit">
                      {languages.length > 1 &&
                        hoveredIndex === index && ( // Show buttons only for hovered item
                          <>
                            <RemoveButton
                              index={index}
                              removeFunc={removeLanguage} // Pass index directly
                            />
                            <ReorderButton provided={provided} />
                          </>
                        )}
                      {hoveredIndex === index && (
                        <AddButton addFunc={addLanguage} />
                      )}
                    </span>
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

export default Languages;
