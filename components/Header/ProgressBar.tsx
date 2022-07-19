
import { motion} from "framer-motion";
import { ProgressBarProps } from "../../common/types";

const ProgressBar = ({translateAmount}:ProgressBarProps): JSX.Element => {
    return(
        <div className="w-full h-2 bg-custom-tertiary overflow-auto">
          <motion.div  className="bg-custom-accent-primary w-full h-full transition-transform"  style={{'transform': `translate(-${translateAmount}%)`}} ></motion.div>
        </div>
    )
};

export default ProgressBar;
