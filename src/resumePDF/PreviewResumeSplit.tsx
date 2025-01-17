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
  const lightThemeColor = lightenColor(themeColor, 100);
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
  text: string;
  color: string;
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
      fontSize: getFontSize1(fontS),
      fontFamily: getFontFamily(fontF),
      flexDirection: "row",
      alignItems: "center",
      // marginHorizontal: 10,
      marginBottom: 10,
      paddingBottom: 5,
    }}
  >
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
interface PreviewResumeSplitProps {
  themeColor?: string;
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
  languages: { name: string }[];
  avatar: string;
  hobbies: { name: string }[];
  visibleSections: string[];
  currentTypography: { font: string; size: string };
}

const PreviewResumeSplit: React.FC<PreviewResumeSplitProps> = ({
  themeColor = "#2563eb",
  name,
  role,
  email,
  phone,
  websiteLink,
  linkedinLink,
  other,
  location,
  summery,
  experiences,
  educations,
  skills,
  languages,
  hobbies,
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
  hobbies = hobbies.filter((e) => e.name);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    headerCenteredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: "50%",
    },
    name: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: 24,
      fontWeight: "bold",
      // textAlign: "right",
      paddingLeft: 20,
    },
    role: {
      fontSize: 10,
      paddingLeft: 20,
      // textAlign: "right",
      // marginTop: 5,
    },
    mainContent: {
      flexDirection: "row",
      flex: 1,
    },
    leftColumn: {
      width: "25%",
      // backgroundColor: "#f3f4f6",
      padding: 8,
      paddingBottom: 40,
    },
    rightColumn: {
      width: "75%",
      padding: 8,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontWeight: "bold",
      fontSize: 10,
      marginBottom: 8,
      textTransform: "uppercase",
      paddingBottom: 5,
      marginTop: 15,
    },
    contactItem: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
      paddingBottom: 5,
    },
    contactIcon: {
      marginRight: 5,
    },
    bulletPoint: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      marginLeft: 10,
      marginBottom: 5,
      lineHeight: 1.5,
    },
    summary: {
      fontFamily: "Times New Roman",
      fontWeight: "normal",
      fontSize: getFontSize1(currentTypography.size),
      marginBottom: 10,
      lineHeight: 1.5,
    },
    LangGridContainer: {
      flexDirection: "column",
      gap: 10,
      // marginTop: 10,
      // paddingHorizontal: 10,
    },

    LangName: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      textTransform: "capitalize",
      flex: 1, // Ensures the name takes the available space
    },

    LangLevel: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      textAlign: "right", // Align level to the right for better contrast
      flexShrink: 0, // Prevents level text from shrinking in narrow spaces
    },

    skillGridContainer: {
      display: "flex",
      flexDirection: "row", // Display items in a row
      flexWrap: "wrap", // Allow wrapping to the next line
      gap: 12, // Add space between items
      // marginTop: 10,
    },

    skillItem: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      width: "30%", // Ensures 3 items per row (100% / 3 = 33.3%)
      fontSize: getFontSize1(currentTypography.size),
      fontWeight: "bold",
      color: "#374151",
      borderRadius: 3,
      // paddingVertical: 5,
      // paddingHorizontal: 12,
      boxSizing: "border-box", // Ensures padding does not affect width
      // marginBottom: 5, // Add space between rows
      transition: "transform 0.2s ease-in-out", // Hover effect for interactivity (optional, if applicable in PDF context)
    },

    timelineContainer: {
      position: "relative",
      paddingLeft: 30,
      marginLeft: 10,
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
    experienceBlock: {
      // marginBottom: 20,
      marginLeft: 20,
    },
    companyName: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      fontWeight: "bold",
      // paddingBottom:20,
    },
    jobTitle: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      fontWeight: "bold",
      // marginBottom: 5,
      marginVertical: 10,
      width: "60%",
      textAlign: "left",
    },

    jobDateBlock: {
      display: "flex", // Enable flexbox
      flexDirection: "row", // Arrange children horizontally
      justifyContent: "space-between", // Push items to opposite ends
      alignItems: "center", // Align items vertically in the center
      width: "100%", // Full width of the container
    },
    date: {
      fontFamily: getFontFamily(currentTypography.font) || "Nunito",
      fontSize: getFontSize1(currentTypography.size),
      marginBottom: 5,
      width: "40%",
      textAlign: "right",
    },
    educationBlock: {
      // marginBottom: 5,
      marginLeft: 20,
    },
  });
  return (
    // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {avatar && visibleSections.includes("picture") ? (
            <Image style={styles.profileImage} src={avatar} />
          ) : null}
          <View style={styles.headerCenteredContainer}>
            <Text style={{ ...styles.name, color: themeColor }}>{name}</Text>
            {visibleSections.includes("role") ? (
              <Text style={styles.role}>{role}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            {summery && visibleSections.includes("about") ? (
              <View>
                <Text style={{ ...styles.sectionTitle }}>About Me</Text>
                <Text style={styles.summary}>{summery}</Text>
              </View>
            ) : null}
            {email || phone || location || websiteLink || linkedinLink ? (
              <>
                <Text style={{ ...styles.sectionTitle }}>PERSONAL DETAILS</Text>
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
                {other && visibleSections.includes("other") ? (
                  <View
                    style={{
                      fontSize: getFontSize1(currentTypography.size),
                      fontFamily: getFontFamily(currentTypography.font),
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 15,
                      paddingBottom: 5,
                      paddingRight: 10,
                    }}
                  >
                    <PdfSvgCircleIcon
                      color={themeColor}
                      width={10}
                      height={10}
                    />
                    <Text style={{ marginLeft: 5 }}>{other}</Text>
                  </View>
                ) : null}
              </>
            ) : null}
          </View>

          <View style={styles.rightColumn}>
            {experiences.length > 0 &&
            visibleSections.includes("experience") ? (
              <>
                <Text style={{ ...styles.sectionTitle }}>Experience</Text>
                {experiences.map((experience, index) => (
                  <View key={index}>
                    {index < experiences.length - 1 ? (
                      <Timeline themeColor={themeColor} />
                    ) : null}
                    <TimeDot themeColor={themeColor} />
                    <View style={styles.experienceBlock}>
                      <Text style={styles.companyName}>
                        {experience.company}
                      </Text>
                      <View style={styles.jobDateBlock}>
                        <Text style={{ ...styles.jobTitle, color: themeColor }}>
                          {experience.position}
                        </Text>
                        <Text style={styles.date}>{experience.dateRange}</Text>
                      </View>
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

            {educations.length > 0 && visibleSections.includes("education") ? (
              <>
                <Text style={{ ...styles.sectionTitle }}>Education</Text>
                {educations.map((education, index) => (
                  <View key={index}>
                    {index < educations.length - 1 ? (
                      <Timeline themeColor={themeColor} />
                    ) : null}
                    <TimeDot themeColor={themeColor} />
                    <View style={styles.educationBlock}>
                      <Text
                        style={{ ...styles.companyName, color: themeColor }}
                      >
                        {education.school}
                      </Text>
                      <View style={styles.jobDateBlock}>
                        <Text style={styles.jobTitle}>{education.degree}</Text>
                        <Text style={styles.date}>{education.dateRange}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : null}
            {skills.length > 0 && visibleSections.includes("skills") ? (
              <>
                <Text style={[styles.sectionTitle]}>Skills</Text>
                <View style={styles.skillGridContainer}>
                  {skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      • {skill.skillname}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
            {languages.length > 0 && visibleSections.includes("languages") ? (
              <>
                <Text
                  style={[
                    styles.sectionTitle]}
                >
                  Language
                </Text>
                <View style={styles.skillGridContainer}>
                  {languages.map((language, index) => (
                    <Text key={index} style={styles.skillItem}>
                      • {language.name}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
            {hobbies.length > 0 && visibleSections.includes("interests") ? (
              <>
                <Text
                  style={[
                    styles.sectionTitle,
                    languages.length > 0 || skills.length > 0
                      ? { marginTop: 15 }
                      : { marginTop: 0 },
                  ]}
                >
                  Activities
                </Text>
                <View style={styles.skillGridContainer}>
                  {hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.skillItem}>
                      • {hobby.name}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  //  </PDFViewer>
  );
};

export default PreviewResumeSplit;
