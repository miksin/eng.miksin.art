import styled from "styled-components"
import { sizes, devices } from "@constants/common"

const TopPad = styled.div`
  width: 100%;
  height: ${sizes.nav}px;

  @media screen and (max-width: ${devices.mobile}px) {
    height: ${sizes.navMobile}px;
  }
`

export default TopPad
