import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10, padding: 10, borderBottom: "1 solid black" },
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		textTransform: "capitalize",
	},
	description: { fontSize: 12, marginBottom: 5 },
	text: { fontSize: 12, marginBottom: 3, textAlign: "left" },
});

// PDF Component
const TransactionPdf = ({ data }: { data: any[] }) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{data.map((item, index) => (
					<View key={index} style={styles.section}>
						<Text style={styles.title}>{item.type} Transaction</Text>
						<Text style={styles.description}>{item.desc}</Text>
						<Text style={styles.text}>Time: {item.time}</Text>
						<Text style={styles.text}>Date: {item.date}</Text>
						<Text style={styles.text}>Type: {item.type}</Text>
					</View>
				))}
			</Page>
		</Document>
	);
};

export default TransactionPdf;
