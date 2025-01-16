import React from "react";
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

interface EducationType {
  school: string;
  dateRange: string;
  degree: string;
  isSplit: boolean;
}

const Educations: React.FC<{
  setEducations: React.Dispatch<React.SetStateAction<EducationType[]>>;
  educations: EducationType[];
  themeColor: string;
  isSplit: boolean;
}> = ({ setEducations, educations, themeColor, isSplit }) => {
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
    setEducations([...educations, { school: "", dateRange: "", degree: "" }]);
  };

  const removeEducation = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) setEducations(educations.filter((_, i) => i !== index));
  };
  const updateEducation = (
    index: number,
    key: keyof EducationType,
    value: string
  ) => {
    const updatedExperiences = educations.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience
    );
    setEducations(updatedExperiences);
  };
  console.log("educations: ", educations);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="educations">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            id="education"
          >
            <h2
              contentEditable="true"
              translate-data="Education"
              placeholder="Education"
              data-gramm="false"
            ></h2>
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
                    className="sortable-wrapper"
                  >
                    <div className="with-border">
                      {isSplit ? (
                        <div style={{ display: "contents" }}>
                          <div style={{ display: "flex" }}>
                            <Contenteditable
                              value={education.degree}
                              onChange={(updatedContent) => {
                                updateEducation(index, "degree", updatedContent);
                              }}
                              as="p"
                              placeholder="Degree"
                              style={{ color: themeColor, fontWeight: "bold" }}
                            />
                            <p style={{ fontSize: "large" }}>   |   </p>
                            <Contenteditable
                              value={education.school}
                              onChange={(updatedContent) => {
                                updateEducation(index, "school", updatedContent);
                              }}
                              as="p"
                              placeholder="School"
                              style={{ fontWeight: "bold" }}
                            />
                          </div>
                          <div>
                            <Contenteditable
                              value={education.dateRange}
                              onChange={(updatedContent) => {
                                updateEducation(index, "dateRange", updatedContent);
                              }}
                              as="p"
                              style={{ width: "fit-content" }}
                              placeholder="From - Until"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <Contenteditable
                            value={education.school}
                            onChange={(updatedContent) => {
                              updateEducation(index, "school", updatedContent);
                            }}
                            as="h3"
                            placeholder="School"
                          />
                          <div>
                            <Contenteditable
                              value={education.degree}
                              onChange={(updatedContent) => {
                                updateEducation(index, "degree", updatedContent);
                              }}
                              as="h4"
                              placeholder="Degree"
                            />

                            <Contenteditable
                              value={education.dateRange}
                              onChange={(updatedContent) => {
                                updateEducation(index, "dateRange", updatedContent);
                              }}
                              as="p"
                              placeholder="From - Until"
                            />
                          </div>
                        </>
                      )}

                      <div className="btn-edit">
                        {educations.length > 1 && (
                          <>
                            <RemoveButton
                              index={index}
                              removeFunc={removeEducation}
                            />
                            <ReorderButton provided={provided} />
                          </>
                        )}
                        <AddButton addFunc={addEducation} />
                      </div>
                      {educations.length > 1 &&
                        educations.length - 1 > index && (
                          <div
                            className="timeline_linea"
                            style={{ background: themeColor }}
                          ></div>
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

export default Educations;
