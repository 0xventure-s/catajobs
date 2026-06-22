import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { CvData, hasText, normalizeLink } from "@/lib/cv";

type CvPdfDocumentProps = {
  data: CvData;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingRight: 48,
    paddingBottom: 42,
    paddingLeft: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.35,
    color: "#171717",
  },
  header: {
    marginBottom: 16,
    textAlign: "center",
  },
  name: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  headline: {
    fontSize: 10,
    marginBottom: 5,
  },
  contact: {
    fontSize: 8.5,
    color: "#333333",
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#171717",
    borderBottomStyle: "solid",
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginBottom: 5,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  row: {
    marginBottom: 7,
  },
  rowHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontFamily: "Helvetica-Bold",
  },
  meta: {
    fontSize: 8.7,
    color: "#404040",
  },
  period: {
    fontSize: 8.7,
    color: "#404040",
    textAlign: "right",
    minWidth: 100,
  },
  text: {
    fontSize: 9.3,
  },
  bulletRow: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    marginTop: 2,
  },
  bullet: {
    width: 8,
    fontSize: 9.3,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.3,
  },
});

export default function CvPdfDocument({ data }: CvPdfDocumentProps) {
  const experiences = data.experiences.filter(hasExperienceContent);
  const education = data.education.filter(hasEducationContent);
  const certifications = data.certifications.filter(hasCertificationContent);

  return (
    <Document title={`CV - ${data.fullName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          {hasText(data.headline) && (
            <Text style={styles.headline}>{data.headline}</Text>
          )}
          <Text style={styles.contact}>{getContactLine(data)}</Text>
        </View>

        {hasText(data.summary) && (
          <PdfSection title="Perfil profesional">
            <Text style={styles.text}>{data.summary}</Text>
          </PdfSection>
        )}

        {experiences.length > 0 && (
          <PdfSection title="Experiencia">
            {experiences.map((experience) => (
              <View key={experience.id} style={styles.row} wrap={false}>
                <View style={styles.rowHeader}>
                  <View>
                    {hasText(experience.role) && (
                      <Text style={styles.title}>{experience.role}</Text>
                    )}
                    <Text style={styles.meta}>
                      {[experience.company, experience.location]
                        .filter(hasText)
                        .join(" | ")}
                    </Text>
                  </View>
                  {hasText(getPeriod(experience)) && (
                    <Text style={styles.period}>{getPeriod(experience)}</Text>
                  )}
                </View>
                {experience.highlights.filter((item) => hasText(item.text)).map(
                  (highlight) => (
                    <View key={highlight.id} style={styles.bulletRow}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{highlight.text}</Text>
                    </View>
                  ),
                )}
              </View>
            ))}
          </PdfSection>
        )}

        {education.length > 0 && (
          <PdfSection title="Formación">
            {education.map((item) => (
              <View key={item.id} style={styles.row} wrap={false}>
                <View style={styles.rowHeader}>
                  <View>
                    {hasText(item.degree) && (
                      <Text style={styles.title}>{item.degree}</Text>
                    )}
                    <Text style={styles.meta}>
                      {[item.institution, item.location]
                        .filter(hasText)
                        .join(" | ")}
                    </Text>
                  </View>
                  {hasText(getPeriod(item)) && (
                    <Text style={styles.period}>{getPeriod(item)}</Text>
                  )}
                </View>
                {hasText(item.details) && (
                  <Text style={styles.text}>{item.details}</Text>
                )}
              </View>
            ))}
          </PdfSection>
        )}

        {hasText(data.skills) && (
          <PdfSection title="Habilidades">
            <Text style={styles.text}>{data.skills}</Text>
          </PdfSection>
        )}

        {hasText(data.languages) && (
          <PdfSection title="Idiomas">
            <Text style={styles.text}>{data.languages}</Text>
          </PdfSection>
        )}

        {certifications.length > 0 && (
          <PdfSection title="Certificaciones">
            {certifications.map((item) => (
              <Text key={item.id} style={styles.text}>
                {[item.name, item.issuer, item.year].filter(hasText).join(" | ")}
              </Text>
            ))}
          </PdfSection>
        )}
      </Page>
    </Document>
  );
}

function PdfSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function getContactLine(data: CvData) {
  return [
    data.email,
    data.phone,
    data.location,
    data.linkedin ? normalizeLink(data.linkedin) : "",
    data.website ? normalizeLink(data.website) : "",
  ]
    .filter(hasText)
    .join(" | ");
}

function getPeriod(item: {
  startDate?: string;
  endDate?: string;
  current?: boolean;
}) {
  return [item.startDate, item.current ? "Actualidad" : item.endDate]
    .filter(hasText)
    .join(" - ");
}

function hasExperienceContent(item: CvData["experiences"][number]) {
  return (
    [item.role, item.company, item.location, item.startDate, item.endDate].some(
      hasText,
    ) || item.highlights.some((highlight) => hasText(highlight.text))
  );
}

function hasEducationContent(item: CvData["education"][number]) {
  return [
    item.degree,
    item.institution,
    item.location,
    item.startDate,
    item.endDate,
    item.details,
  ].some(hasText);
}

function hasCertificationContent(item: CvData["certifications"][number]) {
  return [item.name, item.issuer, item.year].some(hasText);
}
