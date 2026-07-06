import React from 'react';
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import {
  resumeCertifications,
  resumeContact,
  resumeEducation,
  resumeExperience,
  resumeProjects,
  resumeSkills,
  resumeSummary,
} from '@/lib/resume-content';

const ink = '#1a1a1a';
const muted = '#444444';
const subtle = '#666666';
const line = '#cccccc';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: ink,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: line,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  title: {
    fontSize: 10.5,
    color: muted,
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactSep: {
    fontSize: 8.5,
    color: subtle,
    marginHorizontal: 4,
  },
  contactText: {
    fontSize: 8.5,
    color: subtle,
  },
  contactLink: {
    fontSize: 8.5,
    color: subtle,
    textDecoration: 'none',
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: ink,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: line,
  },
  summary: {
    fontSize: 9.5,
    color: muted,
    lineHeight: 1.5,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillLabel: {
    width: 72,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: ink,
  },
  skillList: {
    flex: 1,
    fontSize: 9,
    color: muted,
    lineHeight: 1.35,
  },
  entry: {
    marginBottom: 7,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  entryRole: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
    paddingRight: 8,
  },
  entryOrg: {
    fontSize: 9.5,
    color: muted,
    fontFamily: 'Helvetica',
  },
  entryPeriod: {
    fontSize: 8.5,
    color: subtle,
  },
  bulletList: {
    marginTop: 1,
    paddingLeft: 2,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 9,
    fontSize: 9,
    color: muted,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: muted,
    lineHeight: 1.4,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  projectName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
  },
  projectTech: {
    fontSize: 8.5,
    color: subtle,
  },
  eduProgram: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
  },
  eduInstitution: {
    fontSize: 9,
    color: muted,
    marginTop: 1,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  certTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  certMeta: {
    fontSize: 8.5,
    color: subtle,
  },
});

function Bullets({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bullet} wrap={false}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ContactLine() {
  const { email, location, github, linkedin, portfolio } = resumeContact;
  const items: { text: string; href?: string }[] = [
    { text: email, href: `mailto:${email}` },
    { text: location },
    { text: github, href: `https://${github}` },
    { text: linkedin, href: `https://${linkedin}` },
    { text: portfolio, href: `https://${portfolio}` },
  ];

  return (
    <View style={styles.contactRow}>
      {items.map((item, i) => (
        <View key={item.text} style={{ flexDirection: 'row' }}>
          {i > 0 ? <Text style={styles.contactSep}>|</Text> : null}
          {item.href ? (
            <Link src={item.href} style={styles.contactLink}>
              {item.text}
            </Link>
          ) : (
            <Text style={styles.contactText}>{item.text}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

export function ResumePdfDocument() {
  const { name, title } = resumeContact;

  return (
    <Document title={`${name} — Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <ContactLine />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{resumeSummary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {resumeExperience.map((item) => (
            <View key={`${item.role}-${item.organization}-${item.period}`} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryRole}>
                  {item.role}
                  <Text style={styles.entryOrg}> · {item.organization}</Text>
                </Text>
                <Text style={styles.entryPeriod}>{item.period}</Text>
              </View>
              <Bullets items={item.bullets} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Projects</Text>
          {resumeProjects.map((project) => (
            <View key={project.name} style={styles.entry}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectTech}>{project.tech}</Text>
              </View>
              <Bullets items={project.bullets} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {resumeSkills.map((group) => (
            <View key={group.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillList}>{group.skills.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeEducation.map((edu) => (
            <View key={`${edu.program}-${edu.period}`} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.eduProgram}>{edu.program}</Text>
                <Text style={styles.entryPeriod}>{edu.period}</Text>
              </View>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
              {edu.bullets ? <Bullets items={edu.bullets} /> : null}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {resumeCertifications.map((cert) => (
            <View key={cert.title} style={styles.certRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.certTitle}>{cert.title}</Text>
                <Text style={styles.certMeta}>{cert.provider}</Text>
              </View>
              {cert.year ? <Text style={styles.certMeta}>{cert.year}</Text> : null}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
