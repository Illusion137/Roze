import { RozContentRenderer, type RozContentStyle } from "@components/RozContentRenderer";
import { get_window_size, paginate_roz_contents } from "@roze/mobile/paginator";
import type { RozContent } from "@roze/types/roz";
import type Roz from "@roze/types/roz";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import Swiper from "react-native-swiper";

export interface RozRendererProps {
	roz: Roz;
	roz_style: RozContentStyle;
}
export function RozRenderer(props: RozRendererProps) {
	const [roz_pages, set_roz_pages] = useState<RozContent[][]>([]);
	const [] = useState();

	useEffect(() => {
		(async () => {
			const windows_size = get_window_size({ horizontal_padding: props.roz_style.margin_horizontal * 2, vertical_padding: 0 });
			const pages = await paginate_roz_contents(props.roz.chapters, windows_size, props.roz_style.margin_bottom);
			set_roz_pages(pages);
		})().catch(console.error);
	}, []);

	function on_swiper_index_changed(page_no: number) {
		const current_chapter_content = roz_pages
			.slice(0, page_no + 1)
			.reverse()
			.flat()
			.find((content) => content.type === "CHAPTER_TITLE" || content.type === "CHAPTER_SUBTITLE");
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Swiper onIndexChanged={on_swiper_index_changed} loadMinimal={false} loadMinimalSize={10} loop={false} showsPagination={false} showsButtons={false}>
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
