import React from "react";
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    color: "#000",
    padding: 10,
  },
  role: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "right",
    marginTop: 5,
    padding: 10,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
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
    marginVertical: 10,
  },
  contactItem: {
    fontSize: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 5,
  },
  text: {
    fontSize: 10,
    color: "#000",
    marginBottom: 5,
  },
  experienceBlock: {
    marginBottom: 20,
    marginLeft: 20,
  },
  companyName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "green",
    // paddingBottom:20,
  },
  jobTitle: {
    fontSize: 10,
    fontStyle: "italic",
    // marginBottom: 5,
    marginVertical: 10,
  },

  companyDetails: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  LangName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
    flex: 1, // Ensures the name takes the available space
  },

  LangLevel: {
    fontSize: 9,
    fontWeight: "normal",
    color: "#555",
    textAlign: "right", // Align level to the right for better contrast
    flexShrink: 0, // Prevents level text from shrinking in narrow spaces
  },
  Lang: {
    fontSize: 10,
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
    fontSize: 10,
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
    width: "30%", // Ensures 3 items per row (100% / 3 = 33.3%)
    fontSize: 10,
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
    fontSize: 9,
    color: "#666",
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

interface ContactItemProps {
  path: string;
  text: string;
  color: string;
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
    <View style={styles.timelineDots}>
      <View style={[styles.line, { backgroundColor: lightThemeColor }]} />
    </View>
  );
};

const TimeDot: React.FC<TimeProps> = ({ themeColor }) => (
  <View style={styles.timelineDots}>
    <View style={[styles.dot, { backgroundColor: themeColor }]} />
  </View>
);

interface ContactItemProps {
  path: string;
  text: string;
  color: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ path, color, text }) => (
  <View style={[styles.contactItem]}>
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

interface ResumeClassicPDFProps {
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
  experiences: Experience[];
  educations: Education[];
  skills: { skillname: string }[];
  languages: { name: string; level: string }[];
  avatar: string;
  visibleSections: string[];
}

const ResumeClassicPDF: React.FC<ResumeClassicPDFProps> = ({
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
}) => {
  educations = educations.filter((e) => e.school || e.dateRange || e.degree);
  experiences = experiences.filter(
    (e) => e.position || e.dateRange || e.company
  );
  skills = skills.filter((e) => e.skillname);
  languages = languages.filter((e) => e.name);

  return (
      <Document>
        <Page size="A4" style={[styles.page]}>
          <View style={styles.header}>                        
            <View style={styles.headerCenteredContainer}>
              <Text style={[styles.name, { color: themeColor }]}>{name}</Text>
              {visibleSections.includes("role") ? (
                <Text style={styles.role}>{role}</Text>
              ) : null}  
            </View>
            {avatar && visibleSections.includes("picture") ? (
                <Image style={styles.profileImage} src={avatar} />
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
                  />
                ) : null}
                {phone && visibleSections.includes("phone") ? (
                  <ContactItem
                    path={PhoneSvgPath}
                    color={themeColor}
                    text={phone}
                  />
                ) : null}
                {location && visibleSections.includes("location") ? (
                  <ContactItem
                    path={LocationSvgPath}
                    color={themeColor}
                    text={location}
                  />
                ) : null}
                {websiteLink && visibleSections.includes("website") ? (
                  <ContactItem
                    path={WebsiteSvgPath}
                    color={themeColor}
                    text={websiteLink}
                  />
                ) : null}
                {linkedinLink && visibleSections.includes("linkedin") ? (
                  <ContactItem
                    path={LinkedSvgPath}
                    color={themeColor}
                    text={linkedinLink}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
          {/* Summary Section */}
          
          {summery && visibleSections.includes("about") && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>Professional Summary</Text>
              <Text style={styles.text}>{summery}</Text>
            </View>
          )}

          {/* Experience Section */}
          {experiences.length > 0 &&
            visibleSections.includes("experience") ? (
              <>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Work Experience
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
  );
};

export default ResumeClassicPDF;
