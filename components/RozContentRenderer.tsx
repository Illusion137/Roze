import type { RozContent } from "@roze/types/roz";
import { generate_text_structure } from "@roze/utils";
import { Dimensions, Text } from "react-native";
import ScaledImage from "./ScaledImage";
import { text_style_map } from "@roze/mobile/text_style";

export interface RozContentStyle {
	text_color: string;
	margin_horizontal: number;
	margin_bottom: number;
}
export interface RozContentRendererProps {
	roz_content: RozContent;
	style: RozContentStyle;
}

const screen_dimensions = Dimensions.get("screen");

export function RozContentRenderer(props: RozContentRendererProps) {
	switch (props.roz_content.type) {
		case "TITLE":
		case "CHAPTER_TITLE":
		case "SECTION_TITLE":
		case "CHAPTER_SUBTITLE":
		case "HEADING":
		case "PARAGRAPH":
		case "TABLE_OF_CONTENTS_CHAPTER":
		case "LINE_BREAK":
		case "THEME_BREAK":
			const text_style = text_style_map[props.roz_content.type](props.style.text_color);
			const text_structure = generate_text_structure(props.roz_content.content);

			return (
				<Text style={{ marginHorizontal: props.style.margin_horizontal, marginBottom: props.style.margin_bottom }}>
					{text_structure.map((struct, i) => (
						<Text style={{ ...text_style, fontStyle: struct.type === "em" ? "italic" : "normal", fontWeight: struct.type === "b" ? "bold" : text_style.fontWeight }} key={struct.type + String(i)}>
							{i === 0 ? "\t" : ""}
							{struct.content}
						</Text>
					))}
				</Text>
			);
		case "IMAGE":
			return <ScaledImage uri={props.roz_content.content} width={screen_dimensions.width - props.style.margin_horizontal} style={{ resizeMode: "contain", alignSelf: "center", marginBottom: props.style.margin_bottom }} />;
	}
}
