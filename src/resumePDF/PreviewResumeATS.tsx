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
  PdfSvgCircleIcon,
} from "../consts/SvgConst";
import RegisterFonts from "../consts/FontRegister";
RegisterFonts();
interface TimeProps {
  themeColor: string;
}

const Timeline: React.FC<TimeProps> = ({ themeColor }) => {
  const lightThemeColor = lightenColor(themeColor, 150);
  return (
    <View
      style={{
        marginTop: 3,
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          marginTop: 8,
          position: "absolute",
          left: 2,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: lightThemeColor,
        }}
      />
    </View>
  );
};

const TimeDot: React.FC<TimeProps> = ({ themeColor }) => (
  <View
    style={{
      marginTop: 3,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        marginBottom: 15,
        backgroundColor: themeColor,
      }}
    />
  </View>
);

interface ContactItemProps {
  path: string;
  color: string;
  text: string;
  fontF: string;
  fontS: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  path,
  color,
  text,
  fontF,
  fontS,
}) => (
  <View
    style={{
      fontSize: getFontSize1(fontS) || 8,
      fontFamily: getFontFamily(fontF) || "Nunito",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      paddingBottom: 5,
      paddingRight: 10,
    }}
  >
    <PdfSvgIcon color={color} width={10} height={10} path={path} />
    <Text style={{ marginLeft: 5 }}>{text}</Text>
  </View>
);

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

interface Experience {
  company: string;
  dateRange: string;
  position: string;
  location: string;
  description: string[];
}
interface Education {
  school: string;
  dateRange: string;
  degree: string;
}

interface PreviewResumeATSProps {
  themeColor?: string;
  // currentTypography: { font: string; size: string };
  name: string;
  role: string;
  email: string;
  phone: string;
  websiteLink: string;
  linkedinLink: string;
  location: string;
  summery: string;
  other: string;
  experiences: Experience[];
  educations: Education[];
  skills: { skillname: string }[];
  languages: { name: string }[];
  hobbies: { name: string }[];
  avatar: string;
  visibleSections: string[];
  currentTypography: { font: string; size: string };
}
const PreviewResumeATS: React.FC<PreviewResumeATSProps> = ({
  themeColor,
  name,
  role,
  email,
  phone,
  location,
  websiteLink,
  linkedinLink,
  other,
  summery,
  experiences,
  educations,
  skills,
  languages,
  hobbies,
  visibleSections,
  currentTypography,
}) => {
  educations = educations.filter((e) => e.school || e.dateRange || e.degree);
  experiences = experiences.filter(
    (e) => e.position || e.dateRange || e.company
  );
  skills = skills.filter((e) => e.skillname);
  languages = languages.filter((e) => e.name);
  hobbies = hobbies.filter((e) => e.name);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      paddingVertical: 35,
      paddingHorizontal: 35,
    },
    mainContent: {
      flexDirection: "column",
      flex: 1,
    },
    header: {
      flexDirection: "row-reverse", // Reverse the direction of the row
      alignItems: "center",
      padding: 5,
    },
    headerCenteredContainer: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 5, // Fixed at the bottom of the page
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: (parseInt(getFontSize1(currentTypography.size))-2).toString(),
    },
    nameRoleContainer: {
      flex: 1, // Ensures the container takes up the remaining space
      flexDirection: "column",
      justifyContent: "center",
    },
    name: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: (parseInt(getFontSize1(currentTypography.size))+14).toString(),
      fontWeight: "bold",
      color: themeColor,
    },
    role: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: (parseInt(getFontSize1(currentTypography.size))+1).toString(),
      marginTop: 5,
    },

    contact: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      color: "#666",
      marginTop: 5,
    },

    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontWeight: "bold",
      fontSize: getFontSize1(currentTypography.size),
      marginBottom: 5,
      textTransform: "uppercase",
      paddingBottom: 5,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      // alignItems: "center",
      // marginVertical: 10,
    },
    contactItem: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || "8",
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
      fontSize: getFontSize1(currentTypography.size) || 8,
      color: "#000",
      marginBottom: 5,
    },
    experienceBlock: {
      // marginBottom: 20,
      marginLeft: 20,
    },
    jobDateBlock: {
      display: "flex", // Enable flexbox
      flexDirection: "row", // Arrange children horizontally
      // justifyContent: "space-between", // Push items to opposite ends
      alignItems: "center", // Align items vertically in the center
      width: "100%", // Full width of the container
      marginBottom:5,
    },
    jobTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: (parseInt(getFontSize1(currentTypography.size))-1).toString() || 8,
      fontWeight: "bold",
    },
    companyDetails: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
    },
    bulletPoint: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      marginLeft: 10,
      marginBottom: 5,
      lineHeight: 1.5,
    },
    LangName: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      textTransform: "capitalize",
      flex: 1, // Ensures the name takes the available space
    },

    LangLevel: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      textAlign: "right", // Align level to the right for better contrast
      flexShrink: 0, // Prevents level text from shrinking in narrow spaces
    },
    Lang: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      padding: 5,
      marginRight: 5,
      marginBottom: 5,
      textAlign: "center",
    },
    skillGridContainer: {
      display: "flex",
      flexDirection: "row", // Display items in a row
      flexWrap: "wrap", // Allow wrapping to the next line
      gap: 2, // Add space between items
      // marginTop: 10,
    },
    skill: {
      width: "23%", // Ensures 3 items per row (100% / 3 = 33.3%)
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      borderRadius: 3,
      paddingHorizontal: 12,
      boxSizing: "border-box", // Ensures padding does not affect width
      // marginBottom: 5, // Add space between rows
      transition: "transform 0.2s ease-in-out", // Hover effect for interactivity (optional, if applicable in PDF context)
    },

    skillItem: {
      width: "30%", // Ensures 3 items per row (100% / 3 = 33.3%)
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size) || 8,
      color: "#374151",
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
      fontSize: getFontSize1(currentTypography.size) || 8,
      marginBottom: 5,
    },
    timelineDots: {
      marginTop: 3,
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
      marginTop: 8,
      position: "absolute",
      left: 2,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: "#2563eb",
    },
    educationBlock: {
      marginLeft: 20,
    },
  });

  return (
    // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerCenteredContainer}>
          <Text style={[styles.name, { color: themeColor }]}>{name}</Text>
        </View>
        <View style={styles.mainContent}>
          {email || phone || location || websiteLink || linkedinLink ? (
            <View style={styles.section}>
              {/* <Text style={{ ...styles.sectionTitle }}>PERSONAL DETAILS</Text> */}
              <View style={styles.contactRow}>
                {location && visibleSections.includes("location") ? (
                  <ContactItem
                    path={LocationSvgPath}
                    color={themeColor}
                    text={location}
                    fontF={currentTypography.font}
                    fontS={currentTypography.size}
                  />
                ) : null}
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
            </View>
          ) : null}

          {/* Summary Section */}
          {summery && visibleSections.includes("about") && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle]}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.text}>{summery}</Text>
            </View>
          )}

          {/* Experience Section */}
          {Array.isArray(experiences) &&
            experiences.length > 0 &&
            visibleSections.includes("experience") ? (
            <View style={[styles.section]}>
              <Text style={[styles.sectionTitle]}>PROFESSIONAL EXPERIENCE</Text>
              {experiences.map((experience, index) => (
                <View key={index}>
                  {index < experiences.length - 1 ? (
                    <Timeline themeColor={themeColor} />
                  ) : null}
                  <TimeDot themeColor={themeColor} />
                  <View style={styles.experienceBlock}>
                    <Text style={styles.text}>
                      <Text style={{ ...styles.jobTitle, color: themeColor }}>
                        {experience.position}{" "}
                      </Text>
                      <Text
                        style={{ ...styles.companyDetails, fontWeight: "bold" }}
                      >
                        {" "} |{" "}  {experience.company}
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.date}>{experience.dateRange}</Text>
                      <Text style={styles.text}> {" "}-{" "} {experience.location} </Text>
                    </Text>

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
            </View>
          ) : null}

          {/* Education Section */}
          {Array.isArray(educations) &&
            educations.length > 0 &&
            visibleSections.includes("education") ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle]}>EDUCATON</Text>
              {educations.map((edu, index) => (
                <View key={index}>
                  {index < educations.length - 1 ? (
                    <Timeline themeColor={themeColor} />
                  ) : null}
                  <TimeDot themeColor={themeColor} />
                  <View style={styles.educationBlock}>
                    <View style={styles.jobDateBlock}>
                      <Text style={{ ...styles.jobTitle, color: themeColor, fontWeight: "bold", }}>
                        {edu.degree}
                      </Text>
                      <Text style={{ ...styles.companyDetails, fontWeight: "bold" }}> {" "}-{" "} {edu.school}
                      </Text>
                    </View>
                    <Text style={styles.text}>{edu.dateRange}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
          {/* Skills Section */}
          {Array.isArray(skills) &&
            skills.length > 0 &&
            visibleSections.includes("skills") ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle]}>Skills</Text>
              <View style={styles.skillGridContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    • {skill.skillname}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Languages Section */}
          {Array.isArray(languages) &&
            languages.length > 0 &&
            visibleSections.includes("languages") ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle]}>Language</Text>
              <View style={styles.skillGridContainer}>
                {languages.map((language, index) => (
                  <Text key={index} style={styles.skill}>
                    • {language.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}
          {Array.isArray(hobbies) &&
            hobbies.length > 0 &&
            visibleSections.includes("interests") ? (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                ]}
              >
                Activities
              </Text>
              <View style={styles.skillGridContainer}>
                {hobbies.map((hobby, index) => (
                  <Text key={index} style={styles.skill}>
                    • {hobby.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}
          {other && visibleSections.includes("other") ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle]}>Other</Text>
              <Text style={[styles.skill, { width: "100%" }]}>{other}</Text>
            </View>
          ) : null}
        </View>
        <View>
          <Text style={{ ...styles.footer, fontFamily: 'Nunito' }}>Created by: aiResumeMaker.Online</Text>
        </View>
      </Page>
    </Document>
    //</PDFViewer>
  );
};

export default PreviewResumeATS;
