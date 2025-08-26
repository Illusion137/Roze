import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import sample from "@sample/roze/example.roz.json";
import { RozContentRenderer, type RozContentStyle } from "@components/RozContentRenderer";
import type Roz from "@roze/types/roz";
import { reinterpret_cast } from "@common/cast";
const roz_sample: Roz = reinterpret_cast<Roz>(sample);

export default function App() {
	const roz_style: RozContentStyle = {
		text_color: "black",
		margin_bottom: 10,
		margin_horizontal: 40
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				{roz_sample.chapters
					.map(({ contents }) => contents)
					.flat()
					.slice(0, 200)
					.map((content, i) => (
						<RozContentRenderer key={i} style={roz_style} roz_content={content} />
					))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff"
	}
});
