import { RozContentRenderer, type RozContentStyle } from "@components/RozContentRenderer";
import { get_window_size_px, paginate_roz_contents } from "@roze/mobile/paginator";
import type { RozContent } from "@roze/types/roz";
import type Roz from "@roze/types/roz";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Swiper from "react-native-swiper";

export interface RozRendererProps {
	roz: Roz;
	roz_style: RozContentStyle;
}
export function RozRenderer(props: RozRendererProps) {
	const [roz_pages, set_roz_pages] = useState<RozContent[][]>([]);

	useEffect(() => {
		(async () => {
			const windows_size = get_window_size_px({ horizontal_padding: props.roz_style.margin_horizontal * 2, vertical_padding: 0 });
			const pages = await paginate_roz_contents(props.roz.chapters, windows_size, props.roz_style.margin_bottom);
			set_roz_pages(pages);
		})().catch(console.error);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Swiper loop={false} showsPagination={false} showsButtons={false}>
				{roz_pages.map((page, i) => (
					<View key={i}>
						{page.map((content) => (
							<RozContentRenderer key={content.uuid} style={props.roz_style} roz_content={content} />
						))}
					</View>
				))}
			</Swiper>
		</SafeAreaView>
	);
}
