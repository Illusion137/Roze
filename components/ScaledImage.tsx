import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, StyleProp } from "react-native";

// https://stackoverflow.com/questions/42170127/auto-scale-image-height-with-react-native
export default function ScaledImage(props: { uri: string; width?: number; height?: number; style: StyleProp<ImageStyle> }) {
	const [width, set_width] = useState<number>(props.width ?? 0);
	const [height, set_height] = useState<number>(props.height ?? 0);
	const [image_loading, set_image_loading] = useState<boolean>(true);

	useEffect(() => {
		Image.getSize(
			props.uri,
			(width1, height1) => {
				if (props.width && !props.height) {
					set_width(props.width);
					set_height(height1 * (props.width / width1));
				} else if (!props.width && props.height) {
					set_width(width1 * (props.height / height1));
					set_height(props.height);
				} else {
					set_width(width1);
					set_height(height1);
				}
				set_image_loading(false);
			},
			(error) => {
				set_image_loading(false);
				console.error(error);
			}
		);
	}, []);

	return height ? <Image source={{ uri: props.uri }} style={{ ...(props.style as object), height: height, width: width }} /> : image_loading ? <ActivityIndicator size="large" /> : null;
}
