import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

interface ProgressCircleProps {
	radius: number;
	strokeWidth: number;
	progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ radius, strokeWidth, progress }) => {
	const [circumference, setCircumference] = useState(0);

	useEffect(() => {
		const circumferenceValue = 2 * Math.PI * radius;
		setCircumference(circumferenceValue);
	}, [radius]);

	const strokeDashoffset = circumference * (1 - progress);
	const progressValue = Math.round(progress * 100); // Assuming progress is between 0 and 1 and total is 2000
	let color;

	if (progressValue <= 45) {
		color = "red";
	} else if (progressValue > 45 && progressValue <= 75) {
		color = "purple";
	} else if (progressValue > 75) {
		color = "green";
	}

	return (
		<View style={{ aspectRatio: 1, width: radius * 2, backgroundColor: "white", borderRadius: 60 }}>
			<Svg width={radius * 2} height={radius * 2}>
				<Circle
					stroke={color}
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					cx={radius}
					cy={radius}
					r={radius - strokeWidth / 2}
				/>
				<SvgText
					x="50%"
					y="54%"
					textAnchor="middle"
					alignmentBaseline="middle"
					fontSize={radius / 1.2}
					fill={color}
					fontWeight="bold"
				>
					{progressValue}
				</SvgText>
			</Svg>
		</View>
	);
};

export default ProgressCircle;
