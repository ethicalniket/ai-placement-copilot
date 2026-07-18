import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const COLORS = {
  primary: "#4f46e5",
  dark: "#111827",
  gray: "#6b7280",
  light: "#f3f4f6",
  border: "#e5e7eb",
};

const styles = StyleSheet.create({

  page: {
    padding: 28,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.dark,
    backgroundColor: "#ffffff",
  },

  header: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 14,
    marginBottom: 18,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  role: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  contact: {
    marginRight: 15,
    color: COLORS.gray,
    fontSize: 9,
  },

  container: {
    flexDirection: "row",
  },

  left: {
    width: "34%",
    paddingRight: 14,
  },

  right: {
    width: "66%",
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },

  section: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  subHeading: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 6,
  },

  paragraph: {
    lineHeight: 1.6,
  },

  item: {
    marginBottom: 8,
  },

  bullet: {
    marginLeft: 8,
    marginTop: 2,
    lineHeight: 1.5,
  },

  chip: {
    backgroundColor: COLORS.light,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 4,
    fontSize: 9,
  },

  link: {
    color: "#2563eb",
    fontSize: 9,
    textDecoration: "none",
    marginTop: 2,
  },

});

interface Props {
  form: any;
  resume: any;
}

export default function ResumePdf({
  form,
  resume,
}: Props) {

  return (

    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        <View style={styles.header}>

          <Text style={styles.name}>
            {form.fullName}
          </Text>

          <Text style={styles.role}>
            Software Engineer
          </Text>

          <View style={styles.contactRow}>

            <Text style={styles.contact}>
              {form.email}
            </Text>

            <Text style={styles.contact}>
              {form.phone}
            </Text>

            <Text style={styles.contact}>
              {form.city}, {form.state}
            </Text>

          </View>

          {form.github && (
            <Link
              src={form.github}
              style={styles.link}
            >
              GitHub
            </Link>
          )}

          {form.linkedIn && (
            <Link
              src={form.linkedIn}
              style={styles.link}
            >
              LinkedIn
            </Link>
          )}

        </View>

        <View style={styles.container}>

         <View style={styles.left}>

           {/* ================= SKILLS ================= */}

           <View style={styles.section}>

             <Text style={styles.heading}>

               Skills

             </Text>

             <Text style={styles.subHeading}>

               Languages

             </Text>

             {

               form.programmingLanguages.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

             <Text style={styles.subHeading}>

               Frameworks

             </Text>

             {

               form.frameworks.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

             <Text style={styles.subHeading}>

               Databases

             </Text>

             {

               form.databases.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

             <Text style={styles.subHeading}>

               Cloud

             </Text>

             {

               form.cloud.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

             <Text style={styles.subHeading}>

               DevOps

             </Text>

             {

               form.devOps.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

             <Text style={styles.subHeading}>

               AI Tools

             </Text>

             {

               form.aiTools.map(

                 (skill: string, index: number) => (

                   <Text
                     key={index}
                     style={styles.chip}
                   >

                     {skill}

                   </Text>

                 )

               )

             }

           </View>

           {/* ================= EDUCATION ================= */}

           <View style={styles.section}>

             <Text style={styles.heading}>

               Education

             </Text>

             {

               form.education.map(

                 (edu: any, index: number) => (

                   <View
                     key={index}
                     style={styles.item}
                   >

                     <Text style={styles.subHeading}>

                       {edu.degree}

                     </Text>

                     <Text>

                       {edu.branch}

                     </Text>

                     <Text>

                       {edu.college}

                     </Text>

                     <Text>

                       {edu.startYear} - {edu.endYear}

                     </Text>

                     <Text>

                       CGPA : {edu.cgpa}

                     </Text>

                   </View>

                 )

               )

             }

           </View>

           {/* ================= CERTIFICATIONS ================= */}

           <View style={styles.section}>

             <Text style={styles.heading}>

               Certifications

             </Text>

             {

               form.certifications.map(

                 (cert: any, index: number) => (

                   <View
                     key={index}
                     style={styles.item}
                   >

                     <Text style={styles.subHeading}>

                       {cert.name}

                     </Text>

                     <Text>

                       {cert.issuer}

                     </Text>

                     <Text>

                       {cert.year}

                     </Text>

                   </View>

                 )

               )

             }

           </View>

           {/* ================= ACHIEVEMENTS ================= */}

           {

             form.achievements.length > 0 && (

               <View style={styles.section}>

                 <Text style={styles.heading}>

                   Achievements

                 </Text>

                 {

                   form.achievements.map(

                     (

                       achievement: string,

                       index: number

                     ) => (

                       <Text
                         key={index}
                         style={styles.bullet}
                       >

                         • {achievement}

                       </Text>

                     )

                   )

                 }

               </View>

             )

           }

         </View>

        <View style={styles.right}>

          {/* ================= SUMMARY ================= */}

          <View style={styles.section}>

            <Text style={styles.heading}>

              Professional Summary

            </Text>

            <Text style={styles.paragraph}>

              {

                resume?.professionalSummary ||

                "No professional summary generated."

              }

            </Text>

          </View>

          {/* ================= PROJECTS ================= */}

          {

            form.projects.length > 0 && (

              <View style={styles.section}>

                <Text style={styles.heading}>

                  Projects

                </Text>

                {

                  form.projects.map(

                    (project:any,index:number)=>(

                      <View

                        key={index}

                        style={styles.item}

                      >

                        <Text style={styles.subHeading}>

                          {project.title}

                        </Text>

                        {

                          project.techStack && (

                            <Text>

                              {project.techStack}

                            </Text>

                          )

                        }

                        {

                          project.description && (

                            <Text style={styles.bullet}>

                              • {project.description}

                            </Text>

                          )

                        }

                        {

                          project.github && (

                            <Link

                              src={project.github}

                              style={styles.link}

                            >

                              GitHub Repository

                            </Link>

                          )

                        }

                        {

                          project.liveUrl && (

                            <Link

                              src={project.liveUrl}

                              style={styles.link}

                            >

                              Live Demo

                            </Link>

                          )

                        }

                      </View>

                    )

                  )

                }

              </View>

            )

          }

          {/* ================= EXPERIENCE ================= */}

          {

            form.experiences.length > 0 && (

              <View style={styles.section}>

                <Text style={styles.heading}>

                  Experience

                </Text>

                {

                  form.experiences.map(

                    (exp:any,index:number)=>(

                      <View

                        key={index}

                        style={styles.item}

                      >

                        <Text style={styles.subHeading}>

                          {exp.role}

                        </Text>

                        <Text>

                          {exp.company}

                        </Text>

                        <Text>

                          {exp.duration}

                        </Text>

                        {

                          exp.description && (

                            <Text style={styles.bullet}>

                              • {exp.description}

                            </Text>

                          )

                        }

                      </View>

                    )

                  )

                }

              </View>

            )

          }

          {/* ================= LANGUAGES ================= */}

          {

            form.languages?.length > 0 && (

              <View style={styles.section}>

                <Text style={styles.heading}>

                  Languages

                </Text>

                <Text>

                  {

                    form.languages.join(", ")

                  }

                </Text>

              </View>

            )

          }

        </View>

        </View>

      </Page>

    </Document>

  );

}