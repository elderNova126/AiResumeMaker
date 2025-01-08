import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { PdfSvgIcon, MailSvgPath, PhoneSvgPath, LocationSvgPath, WebsiteSvgPath, LinkedSvgPath } from "../consts/SvgConst";

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
    borderLeft: 2,
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

const TimelineDots = ({ count }) => (
  <View style={styles.timelineDots}>
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <View key={index} style={styles.dot} />
      ))}
  </View>
);
const ContactItem = ({ path, text }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
    <PdfSvgIcon color="red" width={10} height={10} path={path}/>
    <Text style={{ fontSize: 10 }}>{ text}</Text>
  </View>
);
const TestLayout = () => (
  // <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          />
          <Text style={styles.name}>John Doe</Text>
        </View>

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <View>
              <Text style={styles.sectionTitle}>Contact</Text>
              <ContactItem path={MailSvgPath} text="john.doe@email.com" />
              <ContactItem path={PhoneSvgPath} text="(555) 123-4567" />
              <ContactItem path={LocationSvgPath} text="New York, NY" />
              <ContactItem path={WebsiteSvgPath} text="github.com/johndoe" />
              <ContactItem path={LinkedSvgPath} text="linkedin.com/in/johndoe" />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.bulletPoint}>
                Senior Software Engineer with 5+ years of experience in
                full-stack development, specializing in React and Node.js
                ecosystems. Proven track record of delivering scalable solutions
                and leading development teams.
              </Text>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              <View style={styles.timelineContainer}>
                <TimelineDots count={3} />
                <View style={styles.experienceBlock}>
                  <Text style={styles.companyName}>Tech Solutions Inc.</Text>
                  <Text style={styles.jobTitle}>Senior Software Engineer</Text>
                  <Text style={styles.date}>January 2020 - Present</Text>
                  <Text style={styles.bulletPoint}>
                    • Led development of enterprise-scale React applications
                  </Text>
                  <Text style={styles.bulletPoint}>
                    • Implemented CI/CD pipelines reducing deployment time by
                    40%
                  </Text>
                  <Text style={styles.bulletPoint}>
                    • Mentored junior developers and conducted code reviews
                  </Text>
                  <Text style={styles.bulletPoint}>
                    • Architected microservices infrastructure using Node.js
                  </Text>
                </View>

                <View style={styles.experienceBlock}>
                  <Text style={styles.companyName}>
                    Digital Innovations LLC
                  </Text>
                  <Text style={styles.jobTitle}>Software Developer</Text>
                  <Text style={styles.date}>June 2018 - December 2019</Text>
                  <Text style={styles.bulletPoint}>
                    • Developed responsive web applications using React
                  </Text>
                  <Text style={styles.bulletPoint}>
                    • Optimized application performance improving load times by
                    60%
                  </Text>
                  <Text style={styles.bulletPoint}>
                    • Implemented RESTful APIs using Node.js and Express
                  </Text>
                </View>
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


