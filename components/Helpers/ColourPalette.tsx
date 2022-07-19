import { ColourProps } from "../../common/types";
import { createGroupCSSVar } from "../../common/utils";

const ColourPalette = ({palette}:ColourProps): JSX.Element => {
	let paletteAll = '';
	palette.colour.map(({name,dark,light})=>{
		const niceName = name.toLowerCase().replace(' ', '-')
		paletteAll = paletteAll.concat(createGroupCSSVar('light', niceName, light, dark))
		paletteAll = paletteAll.concat(createGroupCSSVar('dark', niceName, light, dark))
	})
	return (
		<style jsx global>{`
		:root{
			${paletteAll}
		}
	  `}</style>
	);
}
 
export default ColourPalette;