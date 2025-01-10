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
    flexDirection: "row-reverse", // Reverse the direction of the row
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 10,
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  role: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 5,
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#1d4ed8",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
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
  skillsContainer: {
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
});

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

const PreviewResumeClassic = ({
  themeColor,
  name,
  role,
  email,
  phone,
  location,
  websiteLink,
  linkedinLink,
  summary,
  experiences,
  educations,
  skills,
  languages,
  avatar,
}) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeftContainer}>
              {avatar ? (
                <Image style={styles.profileImage} src={avatar} />
              ) : null}
              <View style={styles.nameRoleContainer}>
                <Text style={[styles.name, { color: themeColor }]}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
              </View>
            </View>
          </View>
          <View>
            {email || phone || location || websiteLink || linkedinLink ? (
              <View style={styles.contactRow}>
                {email ? (
                  <ContactItem
                    path={MailSvgPath}
                    color={themeColor}
                    text={email}
                  />
                ) : null}
                {phone ? (
                  <ContactItem
                    path={PhoneSvgPath}
                    color={themeColor}
                    text={phone}
                  />
                ) : null}
                {location ? (
                  <ContactItem
                    path={LocationSvgPath}
                    color={themeColor}
                    text={location}
                  />
                ) : null}
                {websiteLink ? (
                  <ContactItem
                    path={WebsiteSvgPath}
                    color={themeColor}
                    text={websiteLink}
                  />
                ) : null}
                {linkedinLink ? (
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
          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={styles.experienceBlock}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.companyDetails}>
                    {exp.company} | {exp.dateRange}
                  </Text>
                  {exp.description.map((point, i) => (
                    <Text key={i} style={styles.bulletPoint}>
                      • {point}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education Section */}
          {educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {educations.map((edu, index) => (
                <View key={index}>
                  <Text style={styles.text}>
                    {edu.degree} - {edu.school}
                  </Text>
                  <Text style={styles.text}>{edu.dateRange}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill.skillname}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang, index) => (
                <Text key={index} style={styles.text}>
                  {lang.name}
                </Text>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PreviewResumeClassic;
