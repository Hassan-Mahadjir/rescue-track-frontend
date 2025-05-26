import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { PCR } from "@/types/report.type";

// Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  field: { marginBottom: 4 },
  table: { display: "flex", width: "auto", marginVertical: 10 },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontWeight: "bold",
    padding: 5,
  },
  tableCol: { width: "25%", padding: 5 },
});

// React PDF Component
export const ReportDocument = ({ data }: { data: PCR }) => {
  const patient = data.patient;
  const initiatedBy = data.initiatedBy?.profile;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Patient Treatment Report</Text>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Patient Information:
          </Text>
          <Text style={styles.field}>
            Name: {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.field}>National ID: {patient.nationalID}</Text>
          <Text style={styles.field}>Email: {patient.email}</Text>
          <Text style={styles.field}>Phone: {patient.phone}</Text>
          <Text style={styles.field}>Gender: {patient.gender}</Text>
          <Text style={styles.field}>
            Date of Birth: {format(new Date(patient.dateofBirth), "yyyy-MM-dd")}
          </Text>
          <Text style={styles.field}>Nationality: {patient.nationality}</Text>
          <Text style={styles.field}>Weight: {patient.weight} kg</Text>
          <Text style={styles.field}>Height: {patient.height} cm</Text>
          <Text style={styles.field}>Status: {patient.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Patient Condition:
          </Text>
          <Text style={styles.field}>
            Current Condition: {data.patientCondition}
          </Text>
          <Text style={styles.field}>
            patient Condition: {data.patientCondition || "N/A"}
          </Text>
          <Text style={styles.field}>
            Primary Assessment: {data.primaryAssessment || "N/A"}
          </Text>
          <Text style={styles.field}>Notes: {data.notes || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Treatments:
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
              <Text style={styles.tableColHeader}>Unit</Text>
              <Text style={styles.tableColHeader}>Category</Text>
            </View>
            {data.treatments.map((treatment) => (
              <View style={styles.tableRow} key={treatment.id}>
                <Text style={styles.tableCol}>{treatment.name}</Text>
                <Text style={styles.tableCol}>{String(treatment.unit)}</Text>
                <Text style={styles.tableCol}>{treatment.category}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Initiated By:
          </Text>
          {initiatedBy && (
            <>
              <Text style={styles.field}>
                Name: {initiatedBy.firstName} {initiatedBy.lastName}
              </Text>
              <Text style={styles.field}>Email: {data.initiatedBy.email}</Text>
              <Text style={styles.field}>Phone: {initiatedBy.phone}</Text>
              <Text style={styles.field}>Gender: {initiatedBy.gender}</Text>
              <Text style={styles.field}>
                Nationality: {initiatedBy.nationality}
              </Text>
              <Text style={styles.field}>Role: {data.initiatedBy.role}</Text>
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
