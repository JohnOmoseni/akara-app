import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
	page: { padding: 20 },
	section: { marginBottom: 10, padding: 10, borderBottom: "1 solid black" },
	title: { fontSize: 16, fontWeight: "bold" },
	description: { fontSize: 12, marginVertical: 5 },
	image: { width: 200, height: 150, marginTop: 5 },
});

const transformData = (originalData: any) => {
	return {
		name: originalData.name,
		area: originalData.area,
		images: originalData.images,
		...originalData.asideInfo.reduce((acc: any, item: any) => {
			acc[item.tag] = item.value;
			return acc;
		}, {}),
	};
};

// PDF Component
const OfferingDocument = ({ offering }: { offering: any }) => {
	const data = transformData(offering);
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* {data.map((item: any, index: idx) => ( */}
				{/* <View key={index} style={styles.section}> */}
				<View style={styles.section}>
					<Text style={styles.title}>{data.name}</Text>
					<Text style={styles.description}>{data.description}</Text>
					<Text>Amount Earned: ₦{data.price_per_unit}</Text>
					<Text>Location: {data.location}</Text>
					{/* {data?.images?.length > 0 && (
					<Image src={data?.images?.[0]} style={styles.image} />
				)} */}
				</View>
				{/* ))} */}
			</Page>
		</Document>
	);
};

export default OfferingDocument;
