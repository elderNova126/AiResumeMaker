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
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottom: "1px solid #ccc",
    marginBottom: 10,
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
    flex: 1,
    marginLeft: 10,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#f7f7f7",
    padding: 20,
    height: "100%",
  },
  rightColumn: {
    width: "70%",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2563eb",
    textTransform: "uppercase",
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 3,
  },
  timelineContainer: {
    position: "relative",
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#2563eb",
    borderLeftStyle: "solid",
  },
  timelineDots: {
    position: "absolute",
    left: -4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: "#2563eb",
    borderRadius: "50%",
    marginBottom: 4,
  },
  experienceBlock: {
    marginBottom: 20,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 5,
  },
  date: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  educationBlock: {
    marginBottom: 15,
    marginLeft: 10,
  },
});

interface TimelineDotsProps {
  count: number;
}

const TimelineDots: React.FC<TimelineDotsProps> = ({ count }) => (
  <View style={styles.timelineDots}>
    {Array.from({ length: count }, (_, index) => (
      <View key={index} style={styles.dot} />
    ))}
  </View>
);

interface ContactItemProps {
  path: string;
  text: string;
  color: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ path, color, text }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
    <PdfSvgIcon color={color} width={10} height={10} path={path} />
    <Text style={{ fontSize: 10, marginLeft: 5 }}>{text}</Text>
  </View>
);
interface Experience {
  company: string;
  dateRange: string;
  position: string;
  description: string[];
}
interface TestLayoutProps {
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
}

const TestLayout: React.FC<TestLayoutProps> = ({
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
}) => (
  // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.name}>{role}</Text>
        </View>

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <View>
              <Text style={styles.sectionTitle}>Contact</Text>
              <ContactItem path={MailSvgPath} color={themeColor} text={email} />
              <ContactItem
                path={PhoneSvgPath}
                color={themeColor}
                text={phone}
              />
              <ContactItem
                path={LocationSvgPath}
                color={themeColor}
                text={location}
              />
              <ContactItem
                path={WebsiteSvgPath}
                color={themeColor}
                text={websiteLink}
              />
              <ContactItem
                path={LinkedSvgPath}
                color={themeColor}
                text={linkedinLink}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.bulletPoint}>{summery}</Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              <View style={styles.timelineContainer}>
                <TimelineDots count={experiences.length} />
                {experiences.map((experience, index) => (
                  <View key={index} style={styles.experienceBlock}>
                    <Text style={styles.companyName}>
                      {experience.company}
                    </Text>
                    <Text style={styles.jobTitle}>{experience.position}</Text>
                    <Text style={styles.date}>{experience.dateRange}</Text>
                    {experience.description.map((point, i) => (
                      <Text key={i} style={styles.bulletPoint}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.timelineContainer}>
                <TimelineDots count={2} />
                <View style={styles.educationBlock}>
                  <Text style={styles.companyName}>
                    University of Technology
                  </Text>
                  <Text style={styles.jobTitle}>B.S. Computer Science</Text>
                  <Text style={styles.date}>2014 - 2018</Text>
                  <Text style={styles.bulletPoint}>• GPA: 3.8/4.0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  // </PDFViewer>
);

export default TestLayout;
