import { Progress } from "tabler-react";
import PropTypes from "prop-types";

const ProgressBar = ({ size, percentage }) => {

  return (
    <Progress size={size}>
      <Progress.Bar color="green" width={percentage} />
    </Progress>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.string,
  percentage: PropTypes.number,
};

export default ProgressBar;
