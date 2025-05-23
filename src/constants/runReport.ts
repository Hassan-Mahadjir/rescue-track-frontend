export const RunReportConfig = {
  incidentOptions: [
    { id: 1, value: "medical", name: "Medical" },
    { id: 2, value: "fire", name: "Fire" },
    { id: 3, value: "crime", name: "Crime" },
    { id: 4, value: "traffic accident", name: "Traffic Accident" },
    { id: 5, value: "natural disaster", name: "Natural Disaster" },
    { id: 6, value: "other", name: "Other" },
  ],

  relationshipOptions: [
    { id: 1, value: "parent", name: "Parent" },
    { id: 2, value: "sibling", name: "Sibling" },
    { id: 3, value: "spouse", name: "Spouse" },
    { id: 4, value: "child", name: "Child" },
    { id: 5, value: "friend", name: "Friend" },
    { id: 6, value: "neighbor", name: "Neighbor" },
    { id: 7, value: "coworker", name: "Coworker" },
    { id: 8, value: "other", name: "Other" },
  ],

  patientCondition: [
    { id: 1, value: "critical", name: "Critical" },
    { id: 1, value: "stable", name: "Stable" },
    { id: 1, value: "serious", name: "Serious" },
    { id: 1, value: "good", name: "Good" },
  ],

  severityCodeOptions: [
    { name: "Code 1", value: "CODE-1" },
    { name: "Code 2", value: "CODE-2" },
    { name: "Code 3", value: "CODE-3" },
  ],
};
