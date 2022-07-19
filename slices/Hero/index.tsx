import React, { FC } from "react";
import { SliceProps } from "../../common/types";
import { resolveVariation } from '../../common/utils';
import * as SectionComponents from './variations'

const Hero: FC<SliceProps> = ({ slice }) => {
  const SectionComponent = resolveVariation(slice?.variation, SectionComponents)

  if (!SectionComponent) {
    return <div key={slice.variation}>Missing slice: {slice.variation}</div>
  }

  return <SectionComponent slice={slice}  />
}

export default Hero