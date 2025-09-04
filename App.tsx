import { View, StyleSheet } from "react-native";
import sample from "@sample/roze/example.roz.json";
import { type RozContentStyle } from "@components/RozContentRenderer";
import type Roz from "@roze/types/roz";
import { reinterpret_cast } from "@common/cast";
import { RozRenderer } from "@screens/RozRenderer";
const roz_sample: Roz = reinterpret_cast<Roz>(sample);

export default function App() {
	const roz_style: RozContentStyle = {
		text_color: "white",
		margin_bottom: 10,
		margin_horizontal: 40
	};
	return (
		<View style={{ ...styles.container, flex: 1 }}>
			<RozRenderer roz={roz_sample} roz_style={roz_style} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000"
	}
});
