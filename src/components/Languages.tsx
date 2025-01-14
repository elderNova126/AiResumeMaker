import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AutoResizeField from "./AutoResizeField";
import { Trash } from "lucide-react";

interface LanguageType {
  name: string;
  level: string;
}

const languageLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent",
  "Native",
];

const LanguagesSection: React.FC<{
  setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
  languages: LanguageType[];
  themeColor: string;
  isSplit: boolean;
}> = ({ setLanguages, languages, themeColor, isSplit = false }) => {
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
    setLanguages([...languages, { name: "", level: "Beginner" }]);
  };

  const removeLanguage = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) {
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
    <div className="py-2">
      <h2
        className="text-xl sm:text-xl font-bold mb-2"
        style={{ color: themeColor }}
      >
        Languages
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="languages" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${isSplit ? "flex-wrap" : "grid grid-cols-3 grid-auto-flow-column"}`}
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
                      className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all flex-shrink-0 ${snapshot.isDragging ? "bg-gray-100 shadow-md" : ""
                        }`}
                    >
                      {languages.length > 1 && (
                        <>
                          <button
                            type="button"
                            className="absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                            onClick={() => removeLanguage(index)}
                            aria-label="Remove Language"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <div
                            style={{ cursor: "pointer" }}
                            className="absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </>
                      )}
                      <button
                        type="button"
                        className="absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
                        onClick={addLanguage}
                        aria-label="Add Language"
                      >
                        +
                      </button>

                      <div className="grid grid-cols-2 items-center gap-2 p-2 bg-gray-100 rounded-md">
                        <AutoResizeField
                          value={language.name}
                          className="p-2 textEdit text-pad border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none rounded-md transition ease-in-out duration-200 max-w-[200px]"
                          placeholder="Language Name"
                          onChange={(value) =>
                            updateLanguage(index, "name", value)
                          }
                        />
                        <select
                          value={language.level}
                          onChange={(e) =>
                            updateLanguage(index, "level", e.target.value)
                          }
                          className="p-2 text-pad border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {languageLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
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

export default LanguagesSection;

// import React from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
// import { Trash } from "lucide-react";

// interface LanguageType {
//   name: string;
//   level: string;
// }

// const LanguagesSection: React.FC<{
//   setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
//   languages: LanguageType[];
//   themeColor: string;
// }> = ({ setLanguages, languages, themeColor }) => {
//   const proficiencyLevels = [
//     "Beginner",
//     "Elementary",
//     "Intermediate",
//     "Upper Intermediate",
//     "Advanced",
//     "Native",
//   ];
//   const lngkind = [
//     "Chinese (Mandarin)",
//     "Chinese (Cantonese)",
//     "Danish",
//     "Dutch",
//     "English",
//     "French",
//     "German",
//     "Hindi",
//     "Italian",
//     "Japanese",
//     "Korean",
//     "Portuguese",
//     "Russian",
//     "Spanish",
//   ];

//   // Function to reorder the languages list after dragging
//   const reorder = (
//     list: LanguageType[],
//     startIndex: number,
//     endIndex: number
//   ): LanguageType[] => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;
//     const reorderedLanguages = reorder(
//       languages,
//       result.source.index,
//       result.destination.index
//     );
//     setLanguages(reorderedLanguages);
//   };

//   const addLanguage = () => {
//     setLanguages([...languages, { name: "", level: "" }]);
//   };

//   const removeLanguage = (index: number) => {
//     const confirmed = window.confirm('Are you sure you want to delete item?');
//     if (confirmed)
//       setLanguages(languages.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="my-3 py-2">
//       <h2
//         className="text-xl sm:text-xl font-bold mb-2"
//         style={{ color: themeColor }}
//       >
//         LANGUAGE
//       </h2>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="languages" direction="horizontal">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="flex flex-wrap gap-2"
//             >
//               {languages.map((language, index) => (
//                 <Draggable
//                   key={`language-${index}`}
//                   draggableId={`language-${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       className={`relative group border border-transparent rounded-md p-3 hover:border-gray-300 transition-all bg-white ${
//                         snapshot.isDragging ? "shadow-md" : ""
//                       }`}
//                     >
//                       {languages.length > 1 && (
//                         <>
//                           <button
//                             type="button"
//                             className="absolute -top-3 right-16 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
//                             onClick={() => removeLanguage(index)}
//                             aria-label="Remove Language"
//                           >
//                             <Trash className="h-4 w-4" />
//                           </button>
//                           <div
//                             style={{cursor:"pointer"}}
//                             className="absolute -top-3 right-9 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
//                             {...provided.dragHandleProps}
//                           >
//                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
//                           </div>
//                         </>
//                       )}

//                       <button
//                         type="button"
//                         className="absolute -top-3 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
//                         onClick={addLanguage}
//                         aria-label="Add Education"
//                       >
//                         +
//                       </button>

//                         <select style={{ width: 'auto'}}
//                           value={language.name}
//                           onChange={(e) =>
//                             setLanguages(
//                               languages.map((lang, i) =>
//                                 i === index
//                                   ? { ...lang, name: e.target.value }
//                                   : lang
//                               )
//                             )
//                           }
//                           className="removeDropIcon placeholder-gray-400 block w-full rounded-md border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none"
//                           defaultValue=""
//                         >
//                           <option value="">Select Language</option>
//                           {lngkind.map((name) => (
//                             <option key={name} value={name}>
//                               {name}
//                             </option>
//                           ))}
//                         </select>
//                         {/* <select
//                           value={language.level}
//                           onChange={(e) =>
//                             setLanguages(
//                               languages.map((lang, i) =>
//                                 i === index
//                                   ? { ...lang, level: e.target.value }
//                                   : lang
//                               )
//                             )
//                           }
//                           className="removeDropIcon placeholder-gray-400 block w-full rounded-md border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none"
//                           defaultValue=""
//                         >
//                           <option value="">Select Level</option>
//                           {proficiencyLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </select> */}

//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default LanguagesSection;
