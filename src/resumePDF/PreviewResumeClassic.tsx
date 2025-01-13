import React from "react";
import { getFontFamily, getFontSize1 } from "./../utils/typography";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import {
  PdfSvgIcon,
  MailSvgPath,
  PhoneSvgPath,
  LocationSvgPath,
  WebsiteSvgPath,
  LinkedSvgPath,
} from "../consts/SvgConst";

interface ContactItemProps {
  path: string;
  text: string;
  color: string;
  fontF:string;
  fontS:string;
}

const lightenColor = (color: string, add: number) => {
  let r = 0,
    g = 0,
    b = 0;

  if (color.startsWith("#")) {
    r = parseInt(color.substring(1, 3), 16);
    g = parseInt(color.substring(3, 5), 16);
    b = parseInt(color.substring(5, 7), 16);
  } else if (color.startsWith("rgb")) {
    const rgba = color.match(
      /rgba?\((\d+), (\d+), (\d+)(?:, (\d+(\.\d+)?))?\)/
    );
    if (rgba) {
      r = parseInt(rgba[1], 10);
      g = parseInt(rgba[2], 10);
      b = parseInt(rgba[3], 10);
    }
  }

  r = Math.min(255, r + add);
  g = Math.min(255, g + add);
  b = Math.min(255, b + add);

  return `rgb(${r}, ${g}, ${b})`;
};
interface TimeProps {
  themeColor: string;
}

const Timeline: React.FC<TimeProps> = ({ themeColor }) => {
  const lightThemeColor = lightenColor(themeColor, 150);
  return (
    <View style={{marginTop:3, position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",}}>
      <View style={{marginTop:8, position: "absolute", left: 2, top: 0, bottom: 0, width: 2, backgroundColor: lightThemeColor }} />
    </View>
  );
};

const TimeDot: React.FC<TimeProps> = ({ themeColor }) => (
  <View style={{marginTop:3, position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "space-between",}}>
    <View style={{width: 6, height: 6, borderRadius: "50%", marginBottom: 15, backgroundColor: themeColor }} />
  </View>
);

interface ContactItemProps {
  path: string;
  text: string;
  color: string;
  fontF:string;
  fontS:string
}

const ContactItem: React.FC<ContactItemProps> = ({ path, color, text, fontF, fontS }) => (
  <View style={{fontSize: getFontSize1(fontS), fontFamily: getFontFamily(fontF), flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#E0E0E0", paddingBottom: 5,}}>
      <PdfSvgIcon color={color} width={10} height={10} path={path} />
      <Text style={{ marginLeft: 5 }}>{text}</Text>
    </View>
);
interface Experience {
  company: string;
  dateRange: string;
  position: string;
  description: string[];
}
interface Education {
  school: string;
  dateRange: string;
  degree: string;
}

interface PreviewResumeClassicProps {
  themeColor?: string;
  currentTypography: { font: string; size: string };
  name: string;
  role: string;
  email: string;
  phone: string;
  websiteLink: string;
  linkedinLink: string;
  location: string;
  summery: string;
  experiences: Experience[];
  educations: Education[];
  skills: { skillname: string }[];
  languages: { name: string; level: string }[];
  avatar: string;
  visibleSections: string[];
}

const PreviewResumeClassic: React.FC<PreviewResumeClassicProps> = ({
  themeColor = "#2563eb",
  name,
  role,
  email,
  phone,
  websiteLink,
  linkedinLink,
  location,
  summery,
  experiences,
  educations,
  skills,
  languages,
  avatar,
  visibleSections,
  currentTypography,
}) => {
  educations = educations.filter((e) => e.school || e.dateRange || e.degree);
  experiences = experiences.filter(
    (e) => e.position || e.dateRange || e.company
  );
  skills = skills.filter((e) => e.skillname);
  languages = languages.filter((e) => e.name);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginBottom: 2,
      padding: 10,
    },
    headerCenteredContainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      marginLeft: 15, // Add margin to the left to create space between avatar and text
    },
    nameRoleContainer: {
      flex: 1, // Ensures the container takes up the remaining space
      flexDirection: "column",
      justifyContent: "center",
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: "50%",
    },
    name: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "right",
      color: "#000",
    },
    role: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: 16,
      textAlign: "right",
      marginTop: 5,
    },
    contact: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      color: "#666",
      marginTop: 5,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#1d4ed8",
      textTransform: "uppercase",
      // borderBottomWidth: 1,
      // borderBottomColor: "#ccc",
      paddingBottom: 5,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "left",
      alignItems: "center",
    },
    contactItem: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
      paddingBottom: 5,
    },
    text: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      color: "#000",
      marginBottom: 5,
    },
    experienceBlock: {
      marginBottom: 20,
      marginLeft: 20,
    },
    companyName: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      fontWeight: "bold",
      // paddingBottom:20,
    },
    jobTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      // marginBottom: 5,
      marginVertical: 10,
    },
  
    companyDetails: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      color: "#666",
      marginBottom: 5,
    },
    bulletPoint: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      marginLeft: 10,
      marginBottom: 5,
      lineHeight: 1.5,
    },
    LangName: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      fontWeight: "bold",
      textTransform: "capitalize",
      flex: 1, // Ensures the name takes the available space
    },
  
    LangLevel: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      fontWeight: "normal",
      textAlign: "right", // Align level to the right for better contrast
      flexShrink: 0, // Prevents level text from shrinking in narrow spaces
    },
    Lang: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      padding: 5,
      marginRight: 5,
      marginBottom: 5,
      textAlign: "center",
    },
    skillGridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skill: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      padding: 5,
      backgroundColor: "#e5e7eb",
      borderRadius: 4,
      marginRight: 5,
      marginBottom: 5,
      textAlign: "center",
    },
    skillGridContainer1: {
      display: "flex",
      flexDirection: "row", // Display items in a row
      flexWrap: "wrap", // Allow wrapping to the next line
      gap: 12, // Add space between items
      marginTop: 10,
    },
  
    skillItem: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      width: "30%", // Ensures 3 items per row (100% / 3 = 33.3%)
      fontSize: getFontSize1(currentTypography.size) ,
      fontWeight: "bold",
      color: "#374151",
      backgroundColor: "#eff5f5",
      borderRadius: 3,
      paddingVertical: 5,
      paddingHorizontal: 12,
      textAlign: "center", // Centers text inside the skill
      boxSizing: "border-box", // Ensures padding does not affect width
      // marginBottom: 5, // Add space between rows
      transition: "transform 0.2s ease-in-out", // Hover effect for interactivity (optional, if applicable in PDF context)
    },
    date: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) ,
      marginBottom: 5,
    },
    timelineDots: {
      marginTop:3,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dot: {
      width: 6,
      height: 6,
      backgroundColor: "#2563eb",
      borderRadius: "50%",
      marginBottom: 15,
    },
    line: {
      marginTop:8,
      position: "absolute",
      left: 2,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: "#2563eb",
    },
    educationBlock: {
      marginBottom: 15,
      marginLeft: 20,
    },
  });

  return (
    // <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={[styles.page]}>
        <View style={styles.headerCenteredContainer}>
              <Text style={[styles.name, { color: themeColor }]}>{name}</Text>
              {visibleSections.includes("role") ? (
                <Text style={styles.role}>{role}</Text>
              ) : null}  
            </View> 

          <View>
            {email || phone || location || websiteLink || linkedinLink ? (
              <View style={styles.contactRow}>
                {email && visibleSections.includes("email") ? (
                  <ContactItem
                    path={MailSvgPath}
                    color={themeColor}
                    text={email}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
                {phone && visibleSections.includes("phone") ? (
                  <ContactItem
                    path={PhoneSvgPath}
                    color={themeColor}
                    text={phone}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
                {location && visibleSections.includes("location") ? (
                  <ContactItem
                    path={LocationSvgPath}
                    color={themeColor}
                    text={location}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
                {websiteLink && visibleSections.includes("website") ? (
                  <ContactItem
                    path={WebsiteSvgPath}
                    color={themeColor}
                    text={websiteLink}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
                {linkedinLink && visibleSections.includes("linkedin") ? (
                  <ContactItem
                    path={LinkedSvgPath}
                    color={themeColor}
                    text={linkedinLink}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
          {/* Summary Section */}
          
          {summery && visibleSections.includes("about") && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Profile</Text>
              <Text style={styles.text}>{summery}</Text>
            </View>
          )}

          {/* Experience Section */}
          {experiences.length > 0 &&
            visibleSections.includes("experience") ? (
              <>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Experience
                  </Text>
                  {experiences.map((experience, index) => (
                    <View key={index}>
                      {index < experiences.length - 1 ? (
                        <Timeline themeColor={themeColor} />
                      ) : null}
                      <TimeDot themeColor={themeColor} />
                      <View style={styles.experienceBlock}>
                        <Text style={styles.companyName}>{experience.company}</Text>
                        <Text style={styles.date}></Text>
                        <View key={index} style={styles.LangItemContainer}>
                          <Text style={styles.LangName}>{experience.position}</Text>
                          <Text style={styles.LangLevel}>{experience.dateRange}</Text>
                        </View>
                        <Text style={styles.date}></Text>
                        {experience.description.map((point, i) =>
                          point !== "<br>" ? (
                            <Text key={i} style={styles.bulletPoint}>
                              • {point}
                            </Text>
                          ) : null
                        )}
                      </View>
                    </View>
                  ))}
              </>
            ) : null}

          {/* Education Section */}
          {educations.length > 0 && visibleSections.includes("education") ?(
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
              {educations.map((edu, index) => (

                <View key={index}>
                  {index < educations.length - 1 ? (
                    <Timeline themeColor={themeColor} />
                  ) : null}
                  <TimeDot themeColor={themeColor} />
                  <View style={styles.educationBlock}>
                    <Text style={styles.companyName}> {edu.school} </Text>
                    <View key={index} style={styles.LangItemContainer}>
                      <Text style={styles.jobTitle}>{edu.degree} </Text>
                      <Text style={styles.date}>{edu.dateRange}</Text>
                    </View>
                  
                  </View>
                </View>
              ))}
            </View>
          ): null}

          {/* Skills Section */}
          {skills.length > 0 && visibleSections.includes("skills") ? (
              <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>
                Skills
              </Text>
              <View style={styles.skillGridContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill.skillname}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Languages Section */}
          {languages.length > 0 && visibleSections.includes("languages") ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>
                Languages
              </Text>
              <View style={styles.skillGridContainer}>
                {languages.map((language, index) => (
                  <View key={index} style={styles.Lang}>
                    <Text style={styles.LangName}>- {language.name}  {language.level}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </Page>
      </Document>
    // </PDFViewer>
  );
};

export default PreviewResumeClassic;
