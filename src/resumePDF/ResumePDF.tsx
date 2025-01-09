import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import {
  PdfSvgIcon,
  MailSvgPath,
  PhoneSvgPath,
  LocationSvgPath,
  WebsiteSvgPath,
  LinkedSvgPath,
} from "../consts/SvgConst";
// import RegisterFonts from "../consts/FontRegister";

// RegisterFonts();
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 2,
    padding: 10,
  },
  headerCenteredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: "50%",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "right",
    color: "#000",
    padding: 10,
  },
  role: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
    marginTop: 5,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#f3f4f6",
    padding: 10,
    paddingBottom: 40,
  },
  rightColumn: {
    width: "70%",
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1d4ed8",
    textTransform: "uppercase",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  contactItem: {
    fontSize: 10,
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
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  summary: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  skill_lang_Item: {
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 2,
    textAlign: "center",
    fontWeight: "bold",
    color: "#374151",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
  },
  timelineContainer: {
    position: "relative",
    paddingLeft: 30,
    marginLeft: 10,
  },
  timelineDots: {
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
    position: "absolute",
    left: 2,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#2563eb",
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
    fontSize: 11,
    fontStyle: "italic",
    // marginBottom: 5,
    marginVertical: 10,
  },
  date: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  educationBlock: {
    marginBottom: 15,
    marginLeft: 20,
  },
});

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

const ContactItem: React.FC<ContactItemProps> = ({ path, color, text }) => {
  console.log("ContactItem", path, color, text);  // Add this line for debugging
  return (
    <View style={[styles.contactItem]}>
      {/* <PdfSvgIcon color={color} width={10} height={10} path={path} /> */}
      <Text style={{ marginLeft: 5 }}>{text}</Text>
    </View>
  );
};


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
interface ResumePDFProps {
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
  languages: { name: string }[];
  avatar: string;
}

const ResumePDF: React.FC<ResumePDFProps> = ({
  themeColor = "#2563eb",
  // currentTypography,
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
}) => {
  educations = educations.filter((e) => e.school || e.dateRange || e.degree);
  experiences = experiences.filter(
    (e) => e.position || e.dateRange || e.company
  );
  skills = skills.filter((e) => e.skillname);
  languages = languages.filter((e) => e.name);
  console.log("**********", email);
  return (
      <Document>
        <Page size="A4" style={[styles.page]}>
          <View style={styles.header}>
            {avatar && <Image style={styles.profileImage} src={avatar} />}
            <View style={styles.headerCenteredContainer}>
              {name && (
                <Text style={[styles.name, { color: themeColor }]}>{name}</Text>
              )}
              {role && <Text style={styles.role}>{role}</Text>}
            </View>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.leftColumn}>
              {(email || phone || location || websiteLink || linkedinLink) && (
                <>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Contact
                  </Text>
                  {email && (
                    <ContactItem
                      path={MailSvgPath}
                      color={themeColor}
                      text={email}
                    />
                  )}
                  {phone && (
                    <ContactItem
                      path={PhoneSvgPath}
                      color={themeColor}
                      text={phone}
                    />
                  )}
                  {location && (
                    <ContactItem
                      path={LocationSvgPath}
                      color={themeColor}
                      text={location}
                    />
                  )}
                  {websiteLink && (
                    <ContactItem
                      path={WebsiteSvgPath}
                      color={themeColor}
                      text={websiteLink}
                    />
                  )}
                  {linkedinLink && (
                    <ContactItem
                      path={LinkedSvgPath}
                      color={themeColor}
                      text={linkedinLink}
                    />
                  )}
                </>
              )}
              {summery && (
                <View style={{ marginTop: 20 }}>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    About Me
                  </Text>
                  <Text style={styles.summary}>{summery}</Text>
                </View>
              )}
            </View>

            <View style={styles.rightColumn}>
              {experiences.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Work Experience
                  </Text>
                  {experiences.map((experience, index) => (
                    <View key={index}>
                      {index < experiences.length - 1 && (
                        <Timeline themeColor={themeColor} />
                      )}
                      <TimeDot themeColor={themeColor} />
                      <View style={styles.experienceBlock}>
                        <Text style={styles.companyName}>
                          {experience.company}
                        </Text>
                        <Text style={styles.jobTitle}>
                          {experience.position}
                        </Text>
                        <Text style={styles.date}>{experience.dateRange}</Text>
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
              )}
              {educations.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Education
                  </Text>
                  {educations.map((education, index) => (
                    <View key={index}>
                      {index < educations.length - 1 && (
                        <Timeline themeColor={themeColor} />
                      )}
                      <TimeDot themeColor={themeColor} />
                      <View style={styles.educationBlock}>
                        <Text style={styles.companyName}>
                          {education.school}
                        </Text>
                        <Text style={styles.jobTitle}>{education.degree}</Text>
                        <Text style={styles.date}>{education.dateRange}</Text>
                      </View>
                    </View>
                  ))}{" "}
                </>
              )}

              {skills.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Skills
                  </Text>
                  <View style={styles.gridContainer}>
                    {skills.map((skill, index) => (
                      <Text key={index} style={styles.skill_lang_Item}>
                        {skill.skillname}
                      </Text>
                    ))}
                  </View>
                </>
              )}
              {languages.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: themeColor }]}>
                    Languages
                  </Text>
                  <View style={styles.gridContainer}>
                    {languages.map((language, index) => (
                      <Text key={index} style={styles.skill_lang_Item}>
                        {language.name}
                      </Text>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </Page>
      </Document>
  );
};

export default ResumePDF;
